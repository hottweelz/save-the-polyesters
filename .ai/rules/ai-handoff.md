# AI Handoff Rule

This repository uses `CHANGELOG_AI.md` as the shared memory and handoff ledger for all AI coding agents.

Every agent must read it before starting work and update it before ending work.

---

## Before Starting Work

1. Read `CHANGELOG_AI.md`.
2. Identify the latest handoff entry.
3. Determine the latest completed work.
4. Determine the next recommended step.
5. Inspect the repo if the handoff does not match the code.
6. Continue from the latest reliable state.

---

## Before Ending Work

Add a new entry to `CHANGELOG_AI.md` containing:

- timestamp
- agent/tool name
- task
- selected agent team
- changes made
- files touched
- commands/tests run
- results
- decisions made
- known issues
- next recommended steps
- notes for next agent

---

## Required Entry Template

```md
### YYYY-MM-DD HH:MM local — Agent/Tool Name

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
# command here
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

---

## Non-Negotiable Rule

Do not rely on chat history as the source of truth.

The repo files and `CHANGELOG_AI.md` are the source of truth.
