#!/usr/bin/env python3
"""Compare reviewed manifest text with coordinate-aware PDF extraction."""

from __future__ import annotations

import argparse
import difflib
import json
import re
import sys
import unicodedata
from pathlib import Path


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", text)).strip()


def manifest_parts(entries: object) -> list[str]:
    if not isinstance(entries, list):
        raise ValueError("manifest paragraphs must be an array")
    parts: list[str] = []
    for index, entry in enumerate(entries):
        if not isinstance(entry, dict):
            raise ValueError(f"manifest paragraphs[{index}] must be an object")
        if "dualDialogue" in entry:
            raise ValueError("exact text reconciliation does not support dualDialogue; review its columns visually")
        text = entry.get("text")
        if not isinstance(text, str) or not text.strip():
            raise ValueError(f"manifest paragraphs[{index}].text must be non-empty")
        number = entry.get("number")
        if number is not None:
            if not isinstance(number, str) or not number.strip():
                raise ValueError(f"manifest paragraphs[{index}].number must be non-empty")
            parts.append(number.strip())
        parts.append(text.strip())
    return parts


def source_parts(layout: object) -> list[str]:
    if not isinstance(layout, dict) or not isinstance(layout.get("pages"), list):
        raise ValueError("layout must contain a pages array")
    parts: list[str] = []
    for page in layout["pages"]:
        if not isinstance(page, dict) or not isinstance(page.get("lines"), list):
            raise ValueError("each layout page must contain a lines array")
        width = float(page.get("width", 0))
        height = float(page.get("height", 0))
        for line in page["lines"]:
            if not isinstance(line, dict):
                continue
            text = str(line.get("text", "")).strip()
            x_min = float(line.get("xMin", 0))
            y_min = float(line.get("yMin", 0))
            is_page_number = text.isdigit() and x_min >= width * 0.9 and y_min <= height * 0.08
            if text and not is_page_number:
                parts.append(text)
    return parts


def first_difference(expected: str, actual: str) -> dict[str, object]:
    matcher = difflib.SequenceMatcher(a=expected, b=actual, autojunk=False)
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag != "equal":
            return {
                "kind": tag,
                "expectedOffset": i1,
                "sourceOffset": j1,
                "expectedContext": expected[max(0, i1 - 80):min(len(expected), i2 + 80)],
                "sourceContext": actual[max(0, j1 - 80):min(len(actual), j2 + 80)],
            }
    return {}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("layout", type=Path)
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    try:
        layout = json.loads(args.layout.expanduser().resolve().read_text(encoding="utf-8"))
        manifest = json.loads(args.manifest.expanduser().resolve().read_text(encoding="utf-8"))
        expected_parts = manifest_parts(manifest.get("paragraphs"))
        extracted_parts = source_parts(layout)
        expected = normalize(" ".join(expected_parts))
        extracted = normalize(" ".join(extracted_parts))
        start = extracted.find(normalize(" ".join(expected_parts[:2])))
        if start < 0:
            raise ValueError("first converted paragraph was not found in the extracted PDF text")
        source_screenplay = extracted[start:]
        matches = expected == source_screenplay
        report = {
            "matches": matches,
            "manifestCharacters": len(expected),
            "sourceCharacters": len(source_screenplay),
            "firstDifference": {} if matches else first_difference(expected, source_screenplay),
        }
    except (OSError, json.JSONDecodeError, ValueError, TypeError) as error:
        print(f"reconciliation failed: {error}", file=sys.stderr)
        return 1

    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(f"matches: {str(matches).lower()}")
        print(f"manifest characters: {report['manifestCharacters']}; source characters: {report['sourceCharacters']}")
        if not matches:
            print(json.dumps(report["firstDifference"], ensure_ascii=False, indent=2))
    return 0 if matches else 1


if __name__ == "__main__":
    raise SystemExit(main())
