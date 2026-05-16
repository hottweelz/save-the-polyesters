# GEMINI.md

This file configures the Gemini CLI agent for this repository.
It mirrors the universal contract in `AGENTS.md` — read that file for the full cross-tool spec.

---

## Startup Protocol

Before performing any research or implementation:

1. Read `CHANGELOG_AI.md`.
2. Identify the latest handoff entry and the next recommended step.
3. Inspect the repo if the handoff looks stale or inconsistent with current code.
4. Read available agent profiles in `.ai/agents/`.
5. Select the smallest useful team for the task and state it before implementing.

---

## Agent System Integration

Agent profiles live in `.ai/agents/`.
Selection rules live in `.ai/rules/agent-team-selection.md`.
Handoff rules live in `.ai/rules/ai-handoff.md`.

**Do not load every agent by default.** Pick the smallest effective team.

State the selected team before starting using the `update_topic` tool:

```markdown
Selected agent team:
- AgentName: reason
```

---

## Shutdown Protocol

Before ending any work session or reaching a limit, you MUST add an entry to `CHANGELOG_AI.md`:

```markdown
### YYYY-MM-DD HH:MM local — Gemini CLI

Task:
- [Task Description]

Selected agent team:
- [Agent List]

Changes made:
- [Change List]

Files touched:
- [File List]

Commands/tests run:
```bash
[Commands]
```

Results:
- [Outcome]

Decisions made:
- [Rationale]

Known issues:
- [Bugs/Blocks]

Next recommended steps:
- [Action Items]

Notes for next agent:
- [Context]
```

A task is not complete until this entry is written.

---

## Source of Truth

The repository files and `CHANGELOG_AI.md` are the source of truth — not chat history.
