# Agent Team Selection Rule

For every non-trivial project task, inspect the agent definitions in:

```txt
agents/
```

Before coding, select the smallest useful team of agents for the task.

---

## Selection Process

1. Read the available agent profiles in `agents/`.
2. Identify which agents are relevant to the current project and task.
3. Select the smallest effective team.
4. Briefly state the selected team and why each agent is included.
5. Use those agent perspectives while planning, implementing, reviewing, and testing.
6. Do not use every agent by default.
7. If no agent clearly applies, proceed as the default senior engineer and say no specialized agent was needed.
8. Feel free to move on to next obvious steps, only stopping when you feel the task is complete or when you encounter a blocker.

---

## Mandatory Inclusion Rules

Include a relevant reviewer agent when the task touches:

- authentication
- authorization
- security
- payments
- database migrations
- data loss risk
- deployment
- infrastructure
- secrets
- personally identifiable information
- external APIs
- destructive operations

---

## Output Format Before Implementation

```md
Selected agent team:
- Agent: reason
- Agent: reason
```

Then proceed with the task.
