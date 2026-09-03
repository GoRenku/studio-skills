#!/usr/bin/env python3
"""Validate structural invariants of an FDX conversion and its manifest."""

from __future__ import annotations

import argparse
import json
import sys
import xml.etree.ElementTree as ET
from collections import Counter
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


def text_of(element: ET.Element) -> str:
    return "".join(element.itertext()).strip()


def flatten_manifest(entries: list[object], errors: list[str]) -> list[dict[str, str]]:
    flattened: list[dict[str, str]] = []
    for index, entry in enumerate(entries):
        if not isinstance(entry, dict):
            errors.append(f"manifest paragraphs[{index}] is not an object")
            continue
        if "dualDialogue" in entry:
            sides = entry.get("dualDialogue")
            if not isinstance(sides, list):
                errors.append(f"manifest paragraphs[{index}].dualDialogue is not an array")
                continue
            for side in sides:
                if isinstance(side, list):
                    for item in side:
                        if isinstance(item, dict):
                            flattened.append(
                                {
                                    "type": str(item.get("type", "")),
                                    "text": str(item.get("text", "")).strip(),
                                    "number": str(item.get("number", "")),
                                }
                            )
            continue
        flattened.append(
            {
                "type": str(entry.get("type", "")),
                "text": str(entry.get("text", "")).strip(),
                "number": str(entry.get("number", "")),
            }
        )
    return flattened


def validate_sequence(paragraphs: list[dict[str, str]], warnings: list[str]) -> None:
    for index, paragraph in enumerate(paragraphs):
        paragraph_type = paragraph["type"]
        next_type = paragraphs[index + 1]["type"] if index + 1 < len(paragraphs) else None
        previous_type = paragraphs[index - 1]["type"] if index else None
        if paragraph_type == "Character" and next_type not in {"Parenthetical", "Dialogue"}:
            warnings.append(f"paragraph {index + 1}: Character is not followed by Parenthetical or Dialogue")
        if paragraph_type == "Parenthetical" and next_type != "Dialogue":
            warnings.append(f"paragraph {index + 1}: Parenthetical is not followed by Dialogue")
        if paragraph_type == "Dialogue" and previous_type not in {"Character", "Parenthetical", "Dialogue"}:
            warnings.append(f"paragraph {index + 1}: Dialogue has no adjacent Character or Parenthetical")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("fdx", type=Path)
    parser.add_argument("--manifest", type=Path)
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    fdx = args.fdx.expanduser().resolve()
    errors: list[str] = []
    warnings: list[str] = []

    try:
        tree = ET.parse(fdx)
    except (OSError, ET.ParseError) as error:
        errors.append(f"cannot parse FDX XML: {error}")
        tree = None

    paragraphs: list[dict[str, str]] = []
    dual_dialogue_count = 0
    if tree is not None:
        root = tree.getroot()
        if root.tag != "FinalDraft":
            errors.append(f"root element must be FinalDraft, found {root.tag}")
        content = root.find("Content")
        if content is None:
            errors.append("FDX has no Content element")
        else:
            dual_dialogue_count = len(content.findall("DualDialogue"))
            for element in content.iter("Paragraph"):
                paragraph_type = element.attrib.get("Type", "")
                paragraph_text = text_of(element)
                number = element.attrib.get("Number", "")
                paragraphs.append({"type": paragraph_type, "text": paragraph_text, "number": number})
                if paragraph_type not in ALLOWED_TYPES:
                    errors.append(f"paragraph {len(paragraphs)} has unsupported type: {paragraph_type!r}")
                if not paragraph_text:
                    errors.append(f"paragraph {len(paragraphs)} is empty")
                if number and paragraph_type != "Scene Heading":
                    errors.append(f"paragraph {len(paragraphs)} has a number but is not a Scene Heading")

    validate_sequence(paragraphs, warnings)
    type_counts = Counter(paragraph["type"] for paragraph in paragraphs)
    scene_numbers = [paragraph["number"] for paragraph in paragraphs if paragraph["number"]]
    duplicates = sorted(number for number, count in Counter(scene_numbers).items() if count > 1)
    if duplicates:
        errors.append(f"duplicate scene numbers: {', '.join(duplicates)}")
    if not type_counts["Scene Heading"]:
        warnings.append("FDX contains no Scene Heading paragraphs")

    if args.manifest:
        manifest_path = args.manifest.expanduser().resolve()
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest_entries = manifest.get("paragraphs", [])
            if not isinstance(manifest_entries, list):
                errors.append("manifest paragraphs is not an array")
            else:
                expected = flatten_manifest(manifest_entries, errors)
                if expected != paragraphs:
                    errors.append("FDX paragraph types, text, or scene numbers do not exactly match the manifest")
            review_notes = manifest.get("reviewNotes", [])
            if not isinstance(review_notes, list):
                errors.append("manifest reviewNotes is not an array")
            else:
                unresolved = [note for note in review_notes if isinstance(note, dict) and note.get("resolution") is None]
                if unresolved:
                    warnings.append(f"manifest has {len(unresolved)} unresolved review note(s)")
        except (OSError, json.JSONDecodeError) as error:
            errors.append(f"cannot read manifest: {error}")

    report = {
        "valid": not errors,
        "fdx": str(fdx),
        "paragraphCount": len(paragraphs),
        "sceneCount": type_counts["Scene Heading"],
        "characterCueCount": type_counts["Character"],
        "dialogueCount": type_counts["Dialogue"],
        "dualDialogueCount": dual_dialogue_count,
        "typeCounts": dict(sorted(type_counts.items())),
        "characters": sorted({paragraph["text"] for paragraph in paragraphs if paragraph["type"] == "Character"}),
        "errors": errors,
        "warnings": warnings,
    }

    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(f"valid: {str(report['valid']).lower()}")
        print(f"paragraphs: {report['paragraphCount']}; scenes: {report['sceneCount']}; dialogue: {report['dialogueCount']}")
        for error in errors:
            print(f"error: {error}")
        for warning in warnings:
            print(f"warning: {warning}")
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
