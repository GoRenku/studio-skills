// Front matter for cloud eval cases: a `---` block at the top of a Markdown
// file, in the small YAML subset the cases use. This repository has no
// dependencies, so the subset is parsed here and anything outside it fails
// with its line number:
//
//   key: scalar            plain, 'single' or "double" quoted; numbers, true, false, null
//   key: [a, b, "c d"]     a flow list of scalars
//   key: {a: 1, b: x}      a flow map of scalars
//   key: |                 a literal block; line breaks kept, trailing ones dropped
//   key:                   a nested block map or list, more indented
//   - scalar | - key: value   list items; an item's further keys align under its first key
//
// `#` starts a comment only at the start of a line.

const KEY_LINE = /^([A-Za-z_][\w.-]*):(?: (.*)|)$/;

export class FrontMatterError extends Error {
  constructor(message, line) {
    super(`SKILLS_CLOUD_EVAL001 ${line ? `line ${line}: ` : ''}${message}`);
    this.line = line;
  }
}

/** Splits `---` front matter from the Markdown body and parses it. */
export function splitFrontMatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== '---') {
    throw new FrontMatterError('the file must start with a --- line opening its front matter', 1);
  }
  const end = lines.indexOf('---', 1);
  if (end === -1) {
    throw new FrontMatterError('the front matter has no closing --- line');
  }
  return { data: parseYamlSubset(lines.slice(1, end).join('\n'), 2), body: lines.slice(end + 1).join('\n') };
}

/** Parses the subset described at the top of this file; `firstLine` numbers lines in errors. */
export function parseYamlSubset(text, firstLine = 1) {
  const lines = text.split('\n').map((raw, index) => ({ raw, number: firstLine + index, indent: raw.length - raw.trimStart().length, text: raw.trim() }));
  const reader = new LineReader(lines);
  if (!reader.peek()) {
    return {};
  }
  const value = parseNode(reader, reader.peek().indent);
  const extra = reader.peek();
  if (extra) {
    throw new FrontMatterError(`unexpected indentation before "${extra.text}"`, extra.number);
  }
  return value;
}

class LineReader {
  constructor(lines) {
    this.lines = lines;
    this.index = 0;
  }

  /** The next line that carries structure: blank and comment lines are skipped. */
  peek() {
    while (this.index < this.lines.length && isSkipped(this.lines[this.index])) {
      this.index += 1;
    }
    return this.lines[this.index];
  }

  next() {
    const line = this.peek();
    this.index += 1;
    return line;
  }

  /** Puts a line back in front, as a list item's first key is read as a map line. */
  replaceCurrent(line) {
    this.index -= 1;
    this.lines[this.index] = line;
  }

  /** Raw lines up to the next one indented `parentIndent` or less, blank lines kept. */
  takeBlock(parentIndent) {
    const block = [];
    while (this.index < this.lines.length) {
      const line = this.lines[this.index];
      if (line.text !== '' && line.indent <= parentIndent) {
        break;
      }
      block.push(line);
      this.index += 1;
    }
    return block;
  }
}

function isSkipped(line) {
  return line.text === '' || line.text.startsWith('#');
}

function isListItem(line) {
  return line.text === '-' || line.text.startsWith('- ');
}

function parseNode(reader, indent) {
  return isListItem(reader.peek()) ? parseList(reader, indent) : parseMap(reader, indent);
}

function parseMap(reader, indent) {
  const map = {};
  for (let line = reader.peek(); line && line.indent === indent && !isListItem(line); line = reader.peek()) {
    reader.next();
    const match = KEY_LINE.exec(line.text);
    if (!match) {
      throw new FrontMatterError(`expected "key: value", found "${line.text}"`, line.number);
    }
    const [, key, rest = ''] = match;
    if (Object.hasOwn(map, key)) {
      throw new FrontMatterError(`${key} is given twice`, line.number);
    }
    map[key] = parseMapValue(reader, line, rest.trim());
  }
  return map;
}

function parseMapValue(reader, line, rest) {
  if (rest === '|') {
    return parseLiteralBlock(reader, line);
  }
  if (rest !== '') {
    return parseInline(rest, line.number);
  }
  const next = reader.peek();
  const nested = next && (next.indent > line.indent || (next.indent === line.indent && isListItem(next)));
  return nested ? parseNode(reader, next.indent) : null;
}

function parseList(reader, indent) {
  const list = [];
  for (let line = reader.peek(); line && line.indent === indent && isListItem(line); line = reader.peek()) {
    reader.next();
    const item = line.text.slice(1).trim();
    if (item === '') {
      const next = reader.peek();
      if (!next || next.indent <= indent) {
        throw new FrontMatterError('a list item has no value', line.number);
      }
      list.push(parseNode(reader, next.indent));
    } else if (KEY_LINE.test(item)) {
      const keyIndent = indent + (line.text.length - item.length);
      reader.replaceCurrent({ ...line, indent: keyIndent, text: item });
      list.push(parseMap(reader, keyIndent));
    } else {
      list.push(parseInline(item, line.number));
    }
  }
  return list;
}

function parseLiteralBlock(reader, line) {
  const block = reader.takeBlock(line.indent);
  const content = block.filter((entry) => entry.text !== '');
  if (content.length === 0) {
    throw new FrontMatterError('a | block needs indented lines under it', line.number);
  }
  const blockIndent = Math.min(...content.map((entry) => entry.indent));
  return block.map((entry) => entry.raw.slice(blockIndent)).join('\n').replace(/\s+$/, '');
}

function parseInline(text, number) {
  if (text.startsWith('[')) {
    return splitFlow(text, ']', number).map((part) => parseScalar(part, number));
  }
  if (text.startsWith('{')) {
    return Object.fromEntries(splitFlow(text, '}', number).map((part) => {
      const match = /^([A-Za-z_][\w.-]*):\s*(.*)$/.exec(part);
      if (!match) {
        throw new FrontMatterError(`expected "key: value" in a flow map, found "${part}"`, number);
      }
      return [match[1], parseScalar(match[2], number)];
    }));
  }
  return parseScalar(text, number);
}

/** The comma-separated parts of a one-line `[...]` or `{...}`, with quotes respected. */
function splitFlow(text, close, number) {
  if (!text.endsWith(close)) {
    throw new FrontMatterError(`"${text}" must end with ${close} on the same line`, number);
  }
  const inner = text.slice(1, -1);
  const parts = [];
  let current = '';
  let quote = null;
  for (const character of inner) {
    if (quote) {
      quote = character === quote ? null : quote;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === ',') {
      parts.push(current.trim());
      current = '';
      continue;
    } else if ('[]{}'.includes(character)) {
      throw new FrontMatterError(`flow lists and maps hold scalars only: "${text}"`, number);
    }
    current += character;
  }
  if (quote) {
    throw new FrontMatterError(`an unclosed quote in "${text}"`, number);
  }
  parts.push(current.trim());
  return inner.trim() === '' ? [] : parts;
}

function parseScalar(text, number) {
  if (text.startsWith('"')) {
    try {
      return JSON.parse(text);
    } catch {
      throw new FrontMatterError(`an invalid double-quoted string: ${text}`, number);
    }
  }
  if (text.startsWith("'")) {
    if (!text.endsWith("'") || text.length < 2) {
      throw new FrontMatterError(`an unclosed single-quoted string: ${text}`, number);
    }
    return text.slice(1, -1).replaceAll("''", "'");
  }
  if (/^-?\d+(\.\d+)?$/.test(text)) {
    return Number(text);
  }
  const words = { true: true, false: false, null: null };
  return Object.hasOwn(words, text) ? words[text] : text;
}
