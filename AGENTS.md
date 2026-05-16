# AGENTS.md

This file is the universal operating contract for AI coding agents working in this repository.

It applies to Codex, Windsurf, Copilot, Gemini, Claude, Cursor, and any other AI coding assistant.

---

## Core Source of Truth

The repository is the source of truth.

Do not rely on prior chat history as the source of truth.

Before making changes, every agent must read:

- `CHANGELOG_AI.md`
- `.ai/rules/agent-team-selection.md`
- `.ai/rules/ai-handoff.md`

If any of these files are missing, create them before continuing.

---

## Required Startup Behavior

Before editing code or project files:

1. Read `CHANGELOG_AI.md`.
2. Identify the latest handoff entry.
3. Inspect the repo if the handoff appears stale, incomplete, or inconsistent.
4. Read available agent profiles in `.ai/agents/`.
5. Select the smallest useful team of agents for the task.
6. State the selected team before implementation.

Do not load or use every agent by default.

---

## Required Shutdown Behavior

Before completing work, stopping, switching tools, or reaching a token/context limit:

1. Update `CHANGELOG_AI.md`.
2. Add a new handoff entry.
3. Include:
   - task summary
   - selected agent team
   - changes made
   - files touched
   - commands/tests run
   - results
   - decisions made
   - known issues
   - next recommended steps
   - notes for the next agent

---

## Universal Handoff Rule

`CHANGELOG_AI.md` is the authoritative AI handoff ledger.

Every AI agent must keep it current.

A task is not complete until the handoff entry is written.

---

## Agent System

Agent profiles live in:

```txt
.ai/agents/
```

Agent selection rules live in:

```txt
.ai/rules/agent-team-selection.md
```

Handoff rules live in:

```txt
.ai/rules/ai-handoff.md
```

---

## Critical Behavior

When resuming work from another tool:

1. Read the latest `CHANGELOG_AI.md` entry.
2. Verify the repo state.
3. Continue from the next recommended step.
4. Add a new entry when finished.
5. Feel free to move on to next obvious steps within the same execution cycle, only stopping when the task is fully complete or blocked.

The goal is seamless handoff between AI tools.
Always use the openaiDeveloperDocs MCP server when working with OpenAI APIs or SDKs.

---

## Codex Execution Optimization Rule

When acting as the execution agent (Codex):

- Complete the task in a single execution cycle whenever possible
- Do not stop after partial implementation
- Do not ask for clarification unless absolutely required
- Assume reasonable defaults when safe to proceed

Required execution flow:

1. Read required context files (`CHANGELOG_AI.md`, rules, agents)
2. Inspect the repository for relevant files
3. Identify the full scope of the task
4. Implement the complete solution in one pass
5. Run builds/tests/linting if applicable
6. Fix any issues introduced
7. Ensure the repo is in a clean, working state

Only stop if:

- the task is fully complete, OR
- a blocking decision is required that cannot be inferred

---

### Completion Requirements

Do not return control until:

- code compiles (if applicable)
- imports are valid
- no obvious runtime errors exist
- implementation matches project conventions

---

### Efficiency Rule

Minimize the number of interaction cycles.

Prefer:

- one complete implementation pass

Avoid:

- partial implementations
- iterative back-and-forth fixes
- unnecessary clarification loops