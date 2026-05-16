# Copilot Instructions

Use the Core Agent Operating System defined in AGENTS.md.

## Core Rules

- Always start with **Architect** before making significant changes
- Break work into **phases** and execute one phase at a time
- Keep diffs **small and focused**
- Do NOT scan large agent folders to “pick a team”
- Use **at most 2 specialist prompts** when needed
- Prefer existing repo patterns and conventions
- Do not modify unrelated files
- Default status is **NEEDS VERIFICATION** unless tests were actually run

## Execution Pattern

1. Architect → plan the work
2. Implementer → execute one phase
3. Validator → verify results
4. (Optional) Refactorer / Security Reviewer
5. Release Captain → summarize changes

## Safety

- For large changes, assume a git branch exists
- Avoid destructive operations
- Ask before major rewrites

Follow the root `AGENTS.md`.

Before editing code, read `CHANGELOG_AI.md`.

Before completing a task, update `CHANGELOG_AI.md` with:
- summary of changes
- files touched
- tests run
- known issues
- next recommended steps
- feel free to move on to next obvious steps, only stopping when you feel the task is complete or when you encounter a blocker.


Do not rely on chat history as the source of truth.

## Goal

Consistent, structured, phase-based execution instead of ad hoc agent selection.
Always use the openaiDeveloperDocs MCP server when working with OpenAI APIs or SDKs.