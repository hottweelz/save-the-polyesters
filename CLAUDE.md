# CLAUDE.md

This file configures Claude Code for this repository.
It mirrors the universal contract in `AGENTS.md` — read that file for the full cross-tool spec.

---

## Startup Protocol

Before editing any file:

1. Read `CHANGELOG_AI.md` (create it if missing — see template below).
2. Identify the latest handoff entry and the next recommended step.
3. Inspect the repo if the handoff looks stale or inconsistent with current code.
4. Read available agent profiles in `.ai/agents/`.
5. Select the smallest useful team for the task and state it before implementing.

---

## Agent System

241 agent profiles live in `.ai/agents/`.
Selection rules live in `.ai/rules/agent-team-selection.md`.
Handoff rules live in `.ai/rules/ai-handoff.md`.

**Do not load every agent by default.** Pick the smallest effective team.

State the selected team before starting:

```md
Selected agent team:
- AgentName: reason
```

Always include a reviewer agent when the task touches: auth, security, payments, DB migrations, data loss, deployment, infrastructure, secrets, PII, external APIs, or destructive operations.

If no agent clearly fits, proceed as the default senior engineer and say so.

---

## Shutdown Protocol

Before ending any work session, add an entry to `CHANGELOG_AI.md`:

```md
### YYYY-MM-DD HH:MM local — Claude Code

Task:
-

Selected agent team:
-

Changes made:
-

Files touched:
-

Commands/tests run:
```bash

```

Results:
-

Decisions made:
-

Known issues:
-

Next recommended steps:
-

Notes for next agent:
-
```

A task is not complete until this entry is written.

---

## Source of Truth

The repository files and `CHANGELOG_AI.md` are the source of truth — not chat history.
