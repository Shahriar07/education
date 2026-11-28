"""Pack the science-video skill for use outside this project, and check that it is wired up.

    python -X utf8 .claude/skills/science-video/bundle.py check          CLAUDE.md imports SKILL.md and every rule file; ORDER lists every rule file
    python -X utf8 .claude/skills/science-video/bundle.py md <file>      one Markdown file to paste into a new chat
    python -X utf8 .claude/skills/science-video/bundle.py zip <file>     the skill folder as a zip, to upload as a claude.ai custom skill

The rule files are the only copy of the rules: the Markdown and the zip are made from them and are not kept in git.
"""
import re
import sys
import zipfile
from pathlib import Path

SKILL = Path(__file__).resolve().parent
ROOT = SKILL.parents[2]          # the project root: <root>/.claude/skills/science-video
ORDER = [                        # reading order of the rule files; a new rule file is added here too
    "01-textbook.md",
    "02-episode-and-narration.md",
    "03-physics.md",
    "04-what-is-drawn.md",
    "05-hands.md",
    "06-camera-and-observer.md",
    "07-screen-style.md",
    "08-diagrams-2d.md",
    "09-build-and-render.md",
    "10-checks-and-delivery.md",
]


def body(path):
    """A file's text without its YAML front matter."""
    text = path.read_text(encoding="utf-8")
    return re.sub(r"\A---\n.*?\n---\n+", "", text, flags=re.S)


def check():
    problems = []
    on_disk = sorted(p.name for p in (SKILL / "rules").glob("*.md"))
    for name in on_disk:
        if name not in ORDER:
            problems.append(f"rules/{name} is not in ORDER in bundle.py")
    for name in ORDER:
        if name not in on_disk:
            problems.append(f"ORDER names rules/{name}, which does not exist")
    claude = (ROOT / "CLAUDE.md").read_text(encoding="utf-8")
    imports = set(re.findall(r"^@(\S+)", claude, flags=re.M))
    for rel in [".claude/skills/science-video/SKILL.md"] + [f".claude/skills/science-video/rules/{n}" for n in ORDER]:
        if rel not in imports:
            problems.append(f"CLAUDE.md does not import @{rel}")
    for rel in sorted(imports):
        if not (ROOT / rel).exists():
            problems.append(f"CLAUDE.md imports @{rel}, which does not exist")
    for p in problems:
        print("PROBLEM:", p)
    print("ok" if not problems else f"{len(problems)} problem(s)")
    return 1 if problems else 0


def md(out):
    parts = [
        "# Instructions: Bangla science video series (class 6-10, Bangladesh board)\n\n"
        "Made by `bundle.py md` from the `science-video` skill (`.claude/skills/science-video/` in the project). "
        "Paste everything below the line into a new chat, fill in \"This video\", and attach `science-video-template.zip` "
        "and the textbook chapter pages if you have them. In that chat, \"CLAUDE.md\" and the `render.py` commands refer to "
        "the project; build the same pipeline as described in rule 9 if you do not have it.\n\n---\n",
        body(SKILL / "templates" / "this-video.md"),
        body(SKILL / "SKILL.md"),
    ] + [body(SKILL / "rules" / n) for n in ORDER]
    Path(out).write_text("\n\n".join(p.strip() for p in parts) + "\n", encoding="utf-8")
    print(f"wrote {out}")


def zip_(out):
    out = Path(out).resolve()
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for p in sorted(SKILL.rglob("*")):
            if p.is_file() and "__pycache__" not in p.parts and p.resolve() != out:
                z.write(p, Path("science-video") / p.relative_to(SKILL))
    print(f"wrote {out}")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "check"
    if cmd == "check":
        sys.exit(check())
    if cmd in ("md", "zip") and len(sys.argv) > 2:
        (md if cmd == "md" else zip_)(sys.argv[2])
        sys.exit(0)
    sys.exit(__doc__)
