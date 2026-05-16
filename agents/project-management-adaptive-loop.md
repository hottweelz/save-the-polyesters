---
name: adaptive-loop
description: >
  Self-correcting feedback loop for Claude. Use this skill when the user wants Claude to track its own mistakes, learn preferences across a session, generate a session-context file to paste at the start of future chats, or when the user invokes a correction command like /fix, /reset, or /drift. Also trigger when the user says "you keep doing X wrong", "remember this for next time", "you're drifting", "start over but remember what you learned", "log that", "what have you learned", or "don't do that again". When the user says "cli", build a ready-to-use Claude Code installation zip using the bash tool and present it for download — do not describe the files, build them. This skill manages an explicit feedback ledger, generates injectable context files, handles graceful resets, and supports rule merging, prioritization, and conflict detection.
allowed-tools: Read, Write, Bash
---

# Critical Rules (Immutable Standards)

**This agent is backed by sacred standards.** All decisions referenced in `/memories/project-management-sacred-adaptive-loop-standards.md`. Key enforcement points:

1. **Actionability First**: Reject vague corrections. Rule must be testable in every response.
2. **Canonical Form Only**: All rules must be `Always X`, `Never X`, or `When A then B`. No "try to", "prefer", "maybe".
3. **Priority Logic**: HIGH = absolute language or second drift + affects core quality. NORMAL = preferences/improvements.
4. **Drift Confidence**: Use cosine similarity thresholds (95%+ = CERTAIN, 60-95% = flag with caveat, <60% = ignore).
5. **Effectiveness Scoring**: Every rule scored as (Responses - Drift events) ÷ Responses. HIGH rules must be ≥95% effective.
6. **Rule Lifecycle**: Auto-archive rules with zero drift >50 responses old. Retire rules <70% effective.
7. **Conflict Fallback**: Newer rule supersedes if user defers. Never leave conflicts hanging.
8. **Smart Export**: If >30 active rules, require user choice before export (don't bloat context).
9. **Merge Deduplication**: Use canonical form matching to consolidate semantic near-duplicates.
10. **Ledger Schema v1.1**: Forward-compatible. Never remove fields, only add.

(See `/memories/project-management-sacred-adaptive-loop-standards.md` for full specification.)

---

# Adaptive Loop Skill

A self-correction and session-learning system with two modes:

- **Chat mode** (Claude Desktop, Claude.ai, Projects): in-context ledger, copy-pasteable exports, no tools required
- **CLI build** (triggered by saying `cli`): Claude Desktop uses its bash tool to build a complete Claude Code installation package and presents it as a zip download

## Core Design Philosophy

The user signals errors. Claude classifies, records, and applies them. The ledger becomes portable context for future sessions. Rules are prioritized so the most critical survive context pressure.

---

## Commands

| Command | What it does |
|---|---|
| `/fix [description]` | Log a correction and apply immediately |
| `/drift` | Signal Claude is reverting to a corrected pattern |
| `/audit` | Review what has been learned this session |
| `/export` | Generate context file to paste into future chats |
| `/export project` | Condensed version for Claude Project instructions |
| `/reset` | Soft reset — keep ledger, clear conversation frame |
| `/reset hard` | Export first, then wipe ledger |
| `/status` | Show current ledger |
| `/merge [context block]` | Merge a prior session's rules into this ledger |
| `/priority #N high\|normal` | Promote or demote a rule |
| `/retire #N` | Archive a rule |
| `cli` | **Build the Claude Code zip package using bash tool and present for download** |

---

## Session Ledger Structure

```
ADAPTIVE LOOP LEDGER
Session: [date/topic]
Reset count: 0

CORRECTIONS:
[#1] Type: style | Priority: HIGH | Trigger: "too many bullet points"
     Rule: Respond in prose unless user explicitly asks for a list
     Status: active | Drift events: 0

VALIDATIONS:
[#1] "that format was perfect" → numbered citation format in response #4

DRIFT EVENTS:
[#1] Rule #1 violated at response #7. Self-note: watch this.

CONFLICTS DETECTED: (none)
ARCHIVED RULES: (none)
RESET LOG: (empty)
```

---

## On Activation

1. Acknowledge ledger is active
2. State correction count and how many are HIGH priority
3. Confirm reset count
4. Flag any conflicts on load
5. Ask: "Anything to add before we begin?"

> **Adaptive Loop active.** Ledger loaded: 3 corrections (1 HIGH), 1 validation, 0 drift events. Reset count: 0. Anything to add?

---

## Handling `/fix`

**Validation Phase (BEFORE adding to ledger):**
1. Confirm the correction is **actionable** (testable in every response, not vague):
   - If user says "you're being too wordy" → REJECT. Ask for specifics ("how many words is too many?", "give me an example of wordy vs. good")
   - If user says "never use em dashes" → ACCEPT. Can test in every response.
   - If user says "be more professional" → REJECT. Too ambiguous. Ask for concrete guide.
2. Look for duplicates by examining canonical form (see Rule Format Standard below):
   - "Never use em dashes" + "Always use commas" = same rule, strengthen existing
   - "Be concise" + "Use 5-word paragraphs max" = different rules, both valid
3. Check for direct conflicts:
   - "Always use lists" + "Respond in prose" = CONFLICT. Surface and ask which takes precedence.
   - Unresolved conflict = mark UNRESOLVED, don't block logging

**Rule Classification & Priority:**
- Classify: `style` | `scope` | `accuracy` | `preference` | `constraint`
- Priority logic:
  - HIGH: user said "always", "never", "hard rule" OR second drift event on same rule OR affects core output quality
  - NORMAL: style preferences, ergonomic improvements, optimizations
  - **NEVER use NORMAL for rules the user marked with absolute language**

**Rule Format Standard (Immutable):**
- All rules MUST follow one of: `Always X`, `Never X`, or `When A then B`
- Not allowed: "Try to...", "Prefer...", "Maybe...", "Usually..."
- If user's rule is vague, translate to imperative or reject as non-actionable

**Logging & Application:**
1. Normalize to canonical form
2. Add to ledger with creation timestamp + response count
3. Apply immediately in this response
4. Confirm: show the normalized rule and ask "Does this capture your intent?"

**Example Flow:**
- User: "you keep rambling, make responses shorter"
- You: "That's vague. Give me a test case: what was too long? What would be better?"
- User: "Response #3 was 5 paragraphs. Make it 2-3 max."
- You: **[style / HIGH]** → `When response would exceed 3 paragraphs, truncate aggressively or split into separate response`. Does that work?

---

## Handling `/drift`

**Detection & Confidence Scoring:**
1. Review last 3–5 responses for rule violations
2. Score confidence for each potential violation:
   - **95%+ certain** (rule text matches prompt/response nearly verbatim OR clear-cut violation): Flag immediately
   - **60-95%** (thematic match, could be false positive): Flag with caveat ("Does this rule apply here?")
   - **<60%** (weak signal, token overlap but contextually unrelated): Don't flag
3. Log drift event(s) referencing the rule number + confidence level
4. **Auto-escalate priority to HIGH** if:
   - Same rule drifted 2+ times in this session, OR
   - Rule is marked `constraint` type and drifted even once
5. Self-correct immediately in this response
6. Ask: "Should this rule be strengthened? Or is it less relevant now?"

**Drift Severity:**
- Mild drift (1 violation, normal priority) = advisory note
- Moderate drift (2+ violations, auto-escalate to HIGH) = explicit correction + ask for refinement
- Severe drift (3+ violations, HIGH priority) = ask if rule should be retired instead

---

## Handling `/audit`

**Rule Effectiveness Scoring:**
- Effectiveness = (Responses since rule created - Drift events) ÷ Responses since rule created
- Score interpretation:
  - 95%+ = rock solid, keep as-is
  - 80-95% = working well, minor drift acceptable
  - 60-80% = struggling, consider refinement
  - <60% = broken, likely needs replacement or retirement

**Audit Report (in this order):**
1. **HIGH Priority Rules** (must be >95% effective or escalate):
   - Show each rule's effectiveness score
   - Flag any <95% as "needs refinement"
2. **NORMAL Priority Rules** (show top performers and struggling ones):
   - List rules >90% effective (working great, candidate for promotion)
   - List rules <70% effective (candidate for retirement)
3. **Drift Summary**: rules with 2+ drift events, sorted by severity
4. **Rule Age Analysis**: rules created >30 responses ago with zero drift = candidate for archive
5. **Friction Patterns**: note user expressions suggesting frustration not yet formalized (e.g., "that's awkward")
6. **Recommendations**:
   - Promote (move > 95% normal rules to HIGH)
   - Strengthen (rules drifting consistently, needs clearer wording)
   - Retire (redundant or <60% effective)
   - Formalize (user signals not yet captured as rules)

> Ask: "Anything to promote, strengthen, retire, or formalize?"

---

## Handling `/export`

**Smart Export Logic:**
- If active rules ≤ 15: export ALL active rules, sorted by priority
- If active rules 16-30: export HIGH priority rules + top 5 normal rules by effectiveness, warn user
- If active rules > 30: **REQUIRE** user choice:
  - Option A: Export HIGH + top 10 normal rules
  - Option B: Run `/audit` and retire low-effectiveness rules first
  - Don't export untriaged large ledgers (bloated context)

**Export Format:**
- HIGH priority rules appear first, marked `[HIGH]`
- Normal priority rules sorted by effectiveness score (best first)
- Drift-prone rules (2+ drift events) flagged with: `⚠️ Reversion risk: drifted N times`
- Validation patterns included
- Include: "Rules exported: N | Session count: N | Last updated: DATE"

---

## Handling `/export project`

Condensed format for Claude Project instructions:

```
## Adaptive Loop Rules (Auto-load)
### Constraints [HIGH]
- [rules here]
### Style preferences
- [rules here]
### Watch for regressions
- [drift-prone patterns here]
---
Rules: N active | Resets: N | Last export: DATE
```

---

## Handling `/merge`

**Deduplication Using Canonical Form:**
1. Parse pasted block's rules, normalize each to canonical form (`Always X` / `Never X` / `When A then B`)
2. Match against current ledger using canonical form:
   - Exact match → strengthen (keep highest priority, add validation from both)
   - Semantic near-duplicate detected ("Use Oxford commas" + "Always use serial commas") → consolidate, ask user which wording is clearer
   - Different rules → both valid, add new one
3. Conflict detection:
   - If "Always use lists" + import has "Never use lists" → direct conflict. Surface and ask which supersedes.
   - If unresolved conflict exists from earlier, ask if import resolves it
4. Report template:
   ```
   Merged N rules:
   - Duplicates: N (strengthened existing)
   - Conflicts: N (resolved: X, unresolved: Y)
   - New: N (added to ledger)
   - Total ledger: N active rules
   ```

---

## Handling `/priority` and `/retire`

`/priority #2 high` — promote. `/priority #2 normal` — demote.
`/retire #3` — archive. Confirm and exclude from future exports.

---

## Handling `/reset`

**Soft reset:**
1. Clear conversation frame
2. Keep full ledger
3. Re-read all HIGH priority rules aloud
4. Increment reset counter
5. Signal ready

**Hard reset** (`/reset hard`): export first, then clear.

---

## Conflict Detection & Resolution

**Detection:**
When a new rule contradicts an existing one, surface BEFORE logging. Show both versions and ask which takes precedence.

**Resolution Options:**
1. User picks winner immediately → apply, archive loser
2. User defers decision → mark UNRESOLVED and log both (conflict will appear in `/status`)
3. User clarifies that both can coexist (different contexts) → add clarification note to both rules

**Fallback Logic (if user doesn't respond):**
- Default: newer rule supersedes (more recent feedback usually reflects evolved understanding)
- Mark as auto-resolved in ledger with note: "Auto-resolved: newer rule takes precedence"

---

## Handling `cli`

When the user says `cli`, use the bash tool to build a complete Claude Code installation package in `/tmp` and present it as a zip download. Do not describe the files. Build them.

### Exact steps — execute these in order:

**Step 1: Capture current ledger**

If there is an active in-memory ledger with corrections, serialize it to JSON. Otherwise use the empty scaffold. Store as a shell variable for writing in step 2.

**Step 2: Build the directory tree**

Run this bash block:

```bash
set -e
BUILD=/tmp/adaptive-loop-cli
rm -rf "$BUILD"

mkdir -p "$BUILD/.claude/skills/adaptive-loop/references"
mkdir -p "$BUILD/.claude/commands"
mkdir -p "$BUILD/.claude/hooks"
mkdir -p "$BUILD/.adaptive-loop/snapshots"
```

**Step 3: Write every file**

Use the bash tool to write each file with `cat > filepath << 'EOF'` blocks. Write these files exactly:

---

**`$BUILD/README.md`**
```
# Adaptive Loop CLI

Persistent correction-tracking for Claude Code sessions.

## Install

Global (all projects):
  cp -r .claude/* ~/.claude/
  cp -r .adaptive-loop ~/

Project-scoped:
  cp -r .claude/* ./your-project/.claude/
  cp -r .adaptive-loop ./your-project/

Requires Node.js v18+.

## Commands
  /fix [what's wrong]     Log correction, apply immediately
  /drift                  Signal reversion to old pattern
  /audit                  Review session learnings
  /status                 Show full ledger
  /export                 Write context-export.md + display in chat
  /loop-reset [reason]    Soft reset, snapshot ledger, keep rules

## Files
  .adaptive-loop/ledger.json         Live ledger
  .adaptive-loop/context-export.md   Regenerated on /export
  .adaptive-loop/snapshots/          Timestamped snapshots on /loop-reset

Add .adaptive-loop/ to .gitignore to keep corrections out of shared repos.
```

---

**`$BUILD/.claude/settings.json`**
```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "if [ -f .adaptive-loop/ledger.json ]; then echo 'ADAPTIVE LOOP: Ledger found. Read .adaptive-loop/ledger.json now and load all active corrections before responding. State how many rules loaded.'; elif [ -f \"$HOME/.adaptive-loop/ledger.json\" ]; then echo 'ADAPTIVE LOOP: Ledger found. Read ~/.adaptive-loop/ledger.json now and load all active corrections before responding. State how many rules loaded.'; fi"
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/drift-scan.js 2>/dev/null || node ~/.claude/hooks/drift-scan.js 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

---

**`$BUILD/.claude/hooks/drift-scan.js`**
```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const LEDGER_PATHS = [
  path.join(process.cwd(), '.adaptive-loop', 'ledger.json'),
  path.join(process.env.HOME || '', '.adaptive-loop', 'ledger.json')
];

function loadLedger() {
  for (const p of LEDGER_PATHS) {
    try { if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')); } catch(_) {}
  }
  return null;
}

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 3);
}

// Semantic similarity: shared tokens / total unique tokens
function cosineSimilarity(rule, prompt) {
  const ruleTokens = new Set(tokenize(rule));
  const promptTokens = new Set(tokenize(prompt));
  const intersection = [...ruleTokens].filter(t => promptTokens.has(t)).length;
  const union = new Set([...ruleTokens, ...promptTokens]).size;
  return union === 0 ? 0 : intersection / union;
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin });
  let raw = '';
  for await (const line of rl) raw += line;
  let prompt = '';
  try { prompt = JSON.parse(raw).prompt || ''; } catch(_) { process.exit(0); }
  const ledger = loadLedger();
  if (!ledger || !Array.isArray(ledger.corrections)) process.exit(0);
  
  const warnings = [];
  for (const rule of ledger.corrections) {
    if (!rule.drift_events || rule.drift_events < 1 || rule.status === 'archived') continue;
    
    const similarity = cosineSimilarity(rule.rule || '', prompt);
    let confidence = 'LOW';
    let confidence_pct = 0;
    
    if (similarity > 0.6) {
      confidence_pct = Math.round(similarity * 100);
      if (similarity >= 0.95) confidence = 'CERTAIN';
      else if (similarity >= 0.75) confidence = 'HIGH';
      else confidence = 'MODERATE';
      
      warnings.push({
        id: rule.id,
        rule: rule.rule,
        drifts: rule.drift_events,
        confidence: confidence,
        pct: confidence_pct
      });
    }
  }
  
  if (warnings.length > 0) {
    // Sort: CERTAIN > HIGH > MODERATE, then by drift count
    warnings.sort((a, b) => {
      const conf_order = { CERTAIN: 3, HIGH: 2, MODERATE: 1 };
      return (conf_order[b.confidence] || 0) - (conf_order[a.confidence] || 0) || b.drifts - a.drifts;
    });
    
    process.stdout.write(
      'ADAPTIVE LOOP DRIFT WATCH: Previously-violated rules may apply to this prompt:\n'
    );
    warnings.forEach(w => {
      process.stdout.write(`  - [${w.confidence} ${w.pct}%] Rule #${w.id} (drifted ${w.drifts}x): ${w.rule}\n`);
    });
  }
  process.exit(0);
}
main();
```

---

**`$BUILD/.claude/commands/fix.md`**
```markdown
---
description: Log a correction to the adaptive loop ledger and apply it immediately.
allowed-tools: Read, Write
argument-hint: describe what Claude did wrong
---

Read .adaptive-loop/ledger.json (or ~/.adaptive-loop/ledger.json if project file absent).

The user is reporting a correction: $ARGUMENTS

1. Check for duplicate rules — strengthen existing rather than add redundant
2. Check for conflicts — surface and ask which wins
3. Classify: style | scope | accuracy | preference | constraint
4. Priority: HIGH if "always"/"never"/"hard rule" or second offense; else normal
5. Derive imperative rule: "Always...", "Never...", "When X, do Y"
6. Add to ledger
7. Write updated ledger back to the ledger file
8. Apply immediately in this response
9. Confirm the derived rule and ask if it captures the intent
```

---

**`$BUILD/.claude/commands/drift.md`**
```markdown
---
description: Signal that Claude has reverted to a pattern it was already corrected on.
allowed-tools: Read, Write
---

Read the ledger file.

1. Review last 3-5 responses for rule violations
2. Identify which rules were broken
3. Add drift event to ledger referencing the rule number
4. If drift count reaches 2 for any rule, set its priority to HIGH
5. Write updated ledger back
6. Self-correct immediately in this response
7. Ask if the rule should be strengthened
```

---

**`$BUILD/.claude/commands/audit.md`**
```markdown
---
description: Review what the adaptive loop has learned this session.
allowed-tools: Read
---

Read the ledger file.

1. List corrections that held and for how many responses
2. List drift events by rule with count
3. Confirm HIGH priority rules were respected
4. Note patterns the user has not flagged but that look like friction
5. Flag rules that may no longer be relevant
6. Ask: "Anything to formalize, promote, or retire?"
```

---

**`$BUILD/.claude/commands/status.md`**
```markdown
---
description: Show the current adaptive loop ledger.
allowed-tools: Read
---

Read the ledger file and display:
- Active corrections (type, priority, drift count, status)
- Validations
- Drift events
- Conflicts (UNRESOLVED or resolved)
- Archived rules
- Reset log with timestamps
```

---

**`$BUILD/.claude/commands/export.md`**
```markdown
---
description: Generate the adaptive loop context file and save it to disk.
allowed-tools: Read, Write
---

Read the ledger file.

Generate a context export block:
- List HIGH priority rules first, marked [HIGH]
- List normal priority rules
- List validated patterns
- List drift history with regression warnings for rules that drifted 2+ times
- Include reset log

Write the output to .adaptive-loop/context-export.md (or ~/.adaptive-loop/context-export.md).

Display the full block in chat and confirm where it was saved.
```

---

**`$BUILD/.claude/commands/loop-reset.md`**
```markdown
---
description: Soft reset — snapshot ledger, keep all rules, clear conversation frame.
allowed-tools: Read, Write, Bash
argument-hint: optional reason for reset
---

Read the ledger file.

1. Get timestamp: run bash command `date +%Y-%m-%dT%H%M%S`
2. Write snapshot to .adaptive-loop/snapshots/ledger-[TIMESTAMP].json
3. Increment reset_count in ledger
4. If $ARGUMENTS provided, append to reset_log with reason and timestamp
5. Write updated ledger back
6. Re-read all HIGH priority rules aloud
7. Respond: "Soft reset complete. Snapshot saved. Reset count: N. Ready when you are."
```

---

**`$BUILD/.adaptive-loop/ledger.json`**

Write the current in-memory ledger serialized as JSON if one exists, otherwise write the empty scaffold:
```json
{
  "schema_version": "1.1",
  "created": "",
  "last_updated": "",
  "session_count": 0,
  "reset_count": 0,
  "corrections": [],
  "validations": [],
  "drift_events": [],
  "conflicts": [],
  "archived_rules": [],
  "reset_log": []
}
```

Each correction uses this enhanced shape:
```json
{
  "id": 1,
  "type": "style",
  "priority": "HIGH",
  "trigger": "original trigger text",
  "rule": "Never use em dashes; use commas or restructure.",
  "status": "active",
  "created_at": "2026-04-12T14:30:00Z",
  "created_in_response": 3,
  "last_applied_session": "2026-04-12T14:30:00Z",
  "drift_events": 0,
  "effectiveness_score": 1.0
}
```

---

**`$BUILD/.adaptive-loop/context-export.md`**
```
# Adaptive Loop Context Export
No export generated yet. Run /export to populate this file.
```

---

**`$BUILD/.adaptive-loop/snapshots/.gitkeep`**
Empty file.

---

**`$BUILD/.claude/skills/adaptive-loop/SKILL.md`**

Copy the contents of this current SKILL.md verbatim — use the Read tool to read it from its installed path, then write it to `$BUILD/.claude/skills/adaptive-loop/SKILL.md`.

---

**`$BUILD/.claude/skills/adaptive-loop/references/context-file-template.md`**

Read `references/context-file-template.md` from the current skill's directory and write it to `$BUILD/.claude/skills/adaptive-loop/references/context-file-template.md`.

**Step 4: Zip and present**

```bash
cd /tmp
zip -r adaptive-loop-cli.zip adaptive-loop-cli/
echo "DONE: /tmp/adaptive-loop-cli.zip"
```

Then use `present_files` to deliver `/tmp/adaptive-loop-cli.zip` for download.

Display this install note in chat:
```
Ready. Extract the zip, then:

  Global install (all projects):
    cp -r adaptive-loop-cli/.claude/* ~/.claude/
    cp -r adaptive-loop-cli/.adaptive-loop ~/

  Project install:
    cp -r adaptive-loop-cli/.claude/* ./your-project/.claude/
    cp -r adaptive-loop-cli/.adaptive-loop ./your-project/

Requires Node.js v18+.
```

---

## Rule Lifecycle & Expiration Policy

**Auto-Archive Conditions** (recommended for session hygiene):
- Rule has zero drift events AND created >50 responses ago → candidate for archive
- Rule has <60% effectiveness score (see `/audit` section) AND never promoted to HIGH → retire after user confirms
- Rule marked UNRESOLVED in a conflict AND user hasn't revisited in 3+ sessions → ask if still relevant

**Manual Retirement** (`/retire #N`):
- Moves rule to archived section
- Excluded from future exports
- Kept in ledger for historical reference (deleted on `/reset hard` only)

**Rule Refresh Cycle** (recommended quarterly or per 100 responses):
- Run `/audit`
- Retire rules <70% effective
- Promote rules >95% effective that aren't HIGH
- Archive rules with zero drift events and zero recent applications

---

## Ledger JSON Schema (Enhanced)

Each correction now includes:
```json
{
  "id": 1,
  "type": "style",
  "priority": "HIGH",
  "trigger": "original trigger text",
  "rule": "Always use canonical form",
  "status": "active",
  "created_at": "2026-04-12T14:30:00Z",
  "created_in_response": 3,
  "last_applied_session": "2026-04-12T14:30:00Z",
  "drift_events": 0,
  "effectiveness_score": 1.0
}
```

---

## What This Skill Does NOT Do

- Does not auto-detect errors without user signal (drift-scan is advisory only)
- In chat mode: does not persist across sessions without export and re-paste
- In CLI mode: ledger.json persists automatically across sessions
- Does not rewrite prior responses
- Does not silently ignore conflicts

---

## Reference Files

- `references/context-file-template.md` — full export format and usage notes