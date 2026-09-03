#!/usr/bin/env python3
"""Build a conservative Final Draft XML document from a reviewed manifest."""

from __future__ import annotations

import argparse
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


ALLOWED_TYPES = {
    "Scene Heading",
    "Action",
    "Character",
    "Parenthetical",
    "Dialogue",
    "Transition",
    "Shot",
    "General",
    "Lyrics",
    "New Act",
    "End of Act",
    "Sequence",
}
DUAL_TYPES = {"Character", "Parenthetical", "Dialogue"}


def require_text(value: object, location: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{location} must be a non-empty string")
    return value.strip()


def add_paragraph(parent: ET.Element, value: dict[str, object], location: str) -> None:
    paragraph_type = require_text(value.get("type"), f"{location}.type")
    if paragraph_type not in ALLOWED_TYPES:
        raise ValueError(f"{location}.type is not supported: {paragraph_type}")
    text = require_text(value.get("text"), f"{location}.text")
    attributes = {"Type": paragraph_type}
    number = value.get("number")
    if number is not None:
        if paragraph_type != "Scene Heading":
            raise ValueError(f"{location}.number is only valid for Scene Heading")
        attributes["Number"] = require_text(number, f"{location}.number")
    paragraph = ET.SubElement(parent, "Paragraph", attributes)
    ET.SubElement(paragraph, "Text").text = text


def add_dual_dialogue(parent: ET.Element, sides: object, location: str) -> None:
    if not isinstance(sides, list) or len(sides) != 2:
        raise ValueError(f"{location}.dualDialogue must contain exactly two sides")
    wrapper = ET.SubElement(parent, "DualDialogue")
    for side_index, side in enumerate(sides):
        side_location = f"{location}.dualDialogue[{side_index}]"
        if not isinstance(side, list) or not side:
            raise ValueError(f"{side_location} must be a non-empty array")
        for item_index, item in enumerate(side):
            item_location = f"{side_location}[{item_index}]"
            if not isinstance(item, dict):
                raise ValueError(f"{item_location} must be an object")
            paragraph_type = item.get("type")
            if paragraph_type not in DUAL_TYPES:
                raise ValueError(f"{item_location}.type is not valid in dual dialogue")
            add_paragraph(wrapper, item, item_location)


def add_title_line(content: ET.Element, text: str, *, bold: bool = False) -> None:
    paragraph = ET.SubElement(content, "Paragraph", {"Alignment": "Center"})
    attributes = {"Font": "Courier", "Size": "12"}
    if bold:
        attributes["Style"] = "Bold"
    ET.SubElement(paragraph, "Text", attributes).text = text


def build_title_page(root: ET.Element, document: dict[str, object]) -> None:
    title_page = ET.SubElement(root, "TitlePage")
    content = ET.SubElement(title_page, "Content")
    add_title_line(content, require_text(document.get("title"), "document.title"), bold=True)

    credit = document.get("credit")
    if credit is not None:
        add_title_line(content, require_text(credit, "document.credit"))

    authors = document.get("authors")
    if not isinstance(authors, list) or not authors:
        raise ValueError("document.authors must be a non-empty array")
    for index, author in enumerate(authors):
        add_title_line(content, require_text(author, f"document.authors[{index}]"))

    additional_credits = document.get("additionalCredits", [])
    if not isinstance(additional_credits, list):
        raise ValueError("document.additionalCredits must be an array")
    for index, credit_line in enumerate(additional_credits):
        add_title_line(content, require_text(credit_line, f"document.additionalCredits[{index}]"))

    for field in ("draft", "source"):
        value = document.get(field)
        if value is not None:
            add_title_line(content, require_text(value, f"document.{field}"))

    rights = document.get("rights", [])
    if not isinstance(rights, list):
        raise ValueError("document.rights must be an array")
    for index, statement in enumerate(rights):
        add_title_line(content, require_text(statement, f"document.rights[{index}]"))


def build(manifest: dict[str, object]) -> ET.ElementTree:
    document = manifest.get("document")
    if not isinstance(document, dict):
        raise ValueError("document must be an object")
    paragraphs = manifest.get("paragraphs")
    if not isinstance(paragraphs, list) or not paragraphs:
        raise ValueError("paragraphs must be a non-empty array")

    root = ET.Element("FinalDraft", {"DocumentType": "Script", "Template": "No", "Version": "3"})
    content = ET.SubElement(root, "Content")
    for index, item in enumerate(paragraphs):
        location = f"paragraphs[{index}]"
        if not isinstance(item, dict):
            raise ValueError(f"{location} must be an object")
        if "dualDialogue" in item:
            if set(item) - {"dualDialogue", "source"}:
                raise ValueError(f"{location} dual-dialogue entry has unsupported fields")
            add_dual_dialogue(content, item["dualDialogue"], location)
        else:
            add_paragraph(content, item, location)

    build_title_page(root, document)
    ET.indent(root, space="  ")
    return ET.ElementTree(root)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    manifest_path = args.manifest.expanduser().resolve()
    output = args.output.expanduser().resolve()
    if not manifest_path.is_file():
        parser.error(f"manifest does not exist: {manifest_path}")
    if output.exists() and not args.overwrite:
        parser.error(f"output already exists: {output}; pass --overwrite only when authorized")
    if output.suffix.lower() != ".fdx":
        parser.error(f"output must have a .fdx extension: {output}")

    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        if not isinstance(manifest, dict):
            raise ValueError("manifest root must be an object")
        tree = build(manifest)
        output.parent.mkdir(parents=True, exist_ok=True)
        tree.write(output, encoding="UTF-8", xml_declaration=True)
    except (OSError, json.JSONDecodeError, ValueError) as error:
        print(f"build failed: {error}", file=sys.stderr)
        return 1

    print(json.dumps({"output": str(output), "paragraphEntries": len(manifest["paragraphs"])}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
