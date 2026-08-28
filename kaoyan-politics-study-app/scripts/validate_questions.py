#!/usr/bin/env python3
import json
import pathlib
import sys

REQUIRED = {
    "id", "subject_id", "chapter_id", "knowledge_node_ids", "type", "difficulty",
    "stem", "options", "correct_answers", "one_line_point", "option_explanations",
    "memory_cue", "confusion_comparison", "trap", "reinforcement_question_id",
    "source", "original"
}

def validate(path: pathlib.Path) -> list[str]:
    errors: list[str] = []
    questions = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(questions, list) or not questions:
        return ["question file must be a non-empty JSON array"]
    ids = {q.get("id") for q in questions if isinstance(q, dict)}
    if len(ids) != len(questions):
        errors.append("question IDs must be present and unique")
    for index, q in enumerate(questions):
        label = q.get("id", f"index {index}")
        missing = REQUIRED - q.keys()
        if missing:
            errors.append(f"{label}: missing {sorted(missing)}")
            continue
        options = q["options"]
        correct = q["correct_answers"]
        if q["type"] == "single" and len(correct) != 1:
            errors.append(f"{label}: single-choice must have exactly one answer")
        if q["type"] == "multiple" and len(correct) < 2:
            errors.append(f"{label}: multiple-choice must have at least two answers")
        if not set(correct) <= set(options):
            errors.append(f"{label}: correct answer missing from options")
        if set(q["option_explanations"]) != set(options):
            errors.append(f"{label}: every option needs exactly one explanation")
        if not q["knowledge_node_ids"]:
            errors.append(f"{label}: needs a knowledge node")
        if not 1 <= q["difficulty"] <= 5:
            errors.append(f"{label}: difficulty must be 1-5")
        if not q["original"]:
            errors.append(f"{label}: questions must be marked original")
        if q["reinforcement_question_id"] not in ids:
            errors.append(f"{label}: reinforcement question does not exist")
        if not q["source"].get("version") or not q["source"].get("title"):
            errors.append(f"{label}: source title/version required")
        if not q["memory_cue"].get("formal") or not q["memory_cue"].get("label"):
            errors.append(f"{label}: memory cue and formal wording required")
    return errors

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: validate_questions.py <question-json>")
    target = pathlib.Path(sys.argv[1])
    problems = validate(target)
    if problems:
        print("QUESTION VALIDATION FAILED")
        for problem in problems:
            print(f"- {problem}")
        raise SystemExit(1)
    count = len(json.loads(target.read_text(encoding="utf-8")))
    print(f"QUESTION VALIDATION PASSED: {count} original questions")
