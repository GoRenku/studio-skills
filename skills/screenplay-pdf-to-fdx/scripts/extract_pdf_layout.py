#!/usr/bin/env python3
"""Extract page-aware screenplay PDF text and optionally render page images."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


def require_command(name: str) -> str:
    command = shutil.which(name)
    if command is None:
        raise RuntimeError(f"required command not found: {name}")
    return command


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, check=True, text=True, capture_output=True)


def word_text(word: ET.Element) -> str:
    return "".join(word.itertext())


def line_text(words: list[str]) -> str:
    text = " ".join(words)
    for mark in (".", ",", ":", ";", "?", "!", ")", "]", "}"):
        text = text.replace(f" {mark}", mark)
    for mark in ("(", "[", "{"):
        text = text.replace(f"{mark} ", mark)
    return text.strip()


def extract_pages(pdf: Path) -> list[dict[str, object]]:
    result = run([require_command("pdftotext"), "-bbox-layout", str(pdf), "-"])
    root = ET.fromstring(result.stdout)
    pages: list[dict[str, object]] = []

    for page_number, page in enumerate(root.findall(".//{*}page"), start=1):
        unsorted_lines: list[dict[str, object]] = []
        for flow_number, flow in enumerate(page.findall("./{*}flow"), start=1):
            for block_number, block in enumerate(flow.findall("./{*}block"), start=1):
                for block_line_number, line in enumerate(block.findall("./{*}line"), start=1):
                    words = [word_text(word) for word in line.findall("./{*}word")]
                    words = [word for word in words if word]
                    if not words:
                        continue
                    unsorted_lines.append(
                        {
                            "flow": flow_number,
                            "block": block_number,
                            "blockLine": block_line_number,
                            "text": line_text(words),
                            "xMin": round(float(line.attrib["xMin"]), 2),
                            "yMin": round(float(line.attrib["yMin"]), 2),
                            "xMax": round(float(line.attrib["xMax"]), 2),
                            "yMax": round(float(line.attrib["yMax"]), 2),
                        }
                    )
        unsorted_lines.sort(key=lambda value: (float(value["yMin"]), float(value["xMin"])))
        lines = [
            {"line": line_number, **line}
            for line_number, line in enumerate(unsorted_lines, start=1)
        ]
        pages.append(
            {
                "page": page_number,
                "width": round(float(page.attrib["width"]), 2),
                "height": round(float(page.attrib["height"]), 2),
                "lines": lines,
            }
        )

    return pages


def render_pages(pdf: Path, render_dir: Path, dpi: int) -> list[str]:
    render_dir.mkdir(parents=True, exist_ok=True)
    prefix = render_dir / pdf.stem
    subprocess.run(
        [require_command("pdftoppm"), "-png", "-r", str(dpi), str(pdf), str(prefix)],
        check=True,
    )
    return [str(path.resolve()) for path in sorted(render_dir.glob(f"{pdf.stem}-*.png"))]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--render-dir", type=Path)
    parser.add_argument("--dpi", type=int, default=144)
    args = parser.parse_args()

    pdf = args.pdf.expanduser().resolve()
    if not pdf.is_file():
        parser.error(f"PDF does not exist: {pdf}")
    if pdf.suffix.lower() != ".pdf":
        parser.error(f"input must have a .pdf extension: {pdf}")
    if args.dpi < 72 or args.dpi > 600:
        parser.error("--dpi must be between 72 and 600")

    try:
        pages = extract_pages(pdf)
        rendered = render_pages(pdf, args.render_dir.resolve(), args.dpi) if args.render_dir else []
    except (RuntimeError, subprocess.CalledProcessError, ET.ParseError) as error:
        print(f"extraction failed: {error}", file=sys.stderr)
        return 1

    output = args.output.expanduser().resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "sourcePdf": str(pdf),
        "pageCount": len(pages),
        "renderedPages": rendered,
        "pages": pages,
    }
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(output), "pageCount": len(pages), "renderedPages": len(rendered)}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
