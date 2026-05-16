# Manufacturing Sacred Standards 🏭

**Last Updated**: April 12, 2026  
**Scope**: Special machines, custom automated lines, non-standard automation (under 500 units/year)  
**Enforcement**: All manufacturing agents reference these sections for rigor, not hallucination

---

## Section 1: Design Freeze & BOM Lock

### The Rule
Design must be locked before sourcing begins. Changes after lock cost 20–50% expedite premium and slip schedules.

### What Must Be True
- **CAD complete** — All major assemblies dimensioned (not "under review")
- **BOM signed off** — Engineering, Mechanical, Electrical, Controls all approve
- **Major suppliers identified** — At least 2–3 options per critical item
- **Tooling list complete** — Custom fixtures, assembly aids defined
- **Change process documented** — Who approves changes, how to handle expedite vs. schedule slip

### Verification
- BOM sign-off document created with owner names and dates
- Sourcing date recorded (gates next phase)
- Change control enforced after lock date
- Any changes logged with cost/schedule impact

### Red Flags
- Design changes discovered mid-procurement
- "Minor tweaks" approved verbally without formal ECR
- Alternate suppliers not identified for long-lead items
- BOM "approved" but no signature trail

---

## Section 2: Safety Partition, I/O Validation, Fault Handling

### The Rule
Safety logic is separate and non-negotiable. Inputs are validated before trusted. Faults have known behavior.

### What Must Be True

**Safety Partition:**
- E-stop, interlocks, protective functions in dedicated safety section (PLd/PLe rated per ISO 13849-1)
- Motion logic in separate rungs (independent scan)
- No shared variables between safety and motion sections
- Safety disabled only by explicit external reset (not buried in state machine)

**I/O Validation:**
- Every input checked for signal integrity before use in decision
- Timeouts defined (e.g., sensor must respond within 500 ms)
- Stuck bits detected (same value for N consecutive scans = fault)
- Debounce logic applied (3+ scans minimum for digital inputs)

**Fault Modes Documented:**
- Sensor fails → safe state defined (e.g., hold position, release clamp)
- Network drops → machine stops or degrades safely
- Valve sticks → detectable and recoverable
- Emergency stop → machine must stop within defined time (typically 100 ms)
- Power lost/recovered → machine remembers last safe state

### Verification
- Ladder diagram clearly separates safety from motion sections
- I/O validation logic visible in logic (filters, timeouts before decision)
- Fault behavior document created (1 page: stimulus → response)
- Commissioning log records each fault tested and result
- Independent review of safety logic (not just designer sign-off)

### Red Flags
- Safety logic intermixed with motion logic
- Inputs used directly without validation/debounce
- "System is safe because we said so" (no documented fault paths)
- No mention of signal integrity or stuck-bit detection
- Emergency stop requires holding button (should be latching)

---

## Section 3: Test Protocol Discipline (Pass/Fail Criteria, Variable Control)

### The Rule
Tests are evidence. Pass/fail is binary. Vague results mean not ready.

### What Must Be True

**Measurable Protocol:**
- Every test has **input** (what you do), **pass criteria** (what counts as working), **method** (how you measure)
- Example: "Accuracy @ 10 Hz: Position target within ±0.1 mm using dial indicator (resolution 0.01 mm), measured at 3 thermal stabilization points"
- Fuzzy tests rejected: "Check if it works" → ❌, "Measure positioning error" → ✓

**Variable Control:**
- Temperature, humidity, electrical supply, material batch, operator, environment documented per test
- Environmental conditions noted in logbook (e.g., "Lab: 20.5°C ±1°C, 45% RH, 24V supply ±2%")
- If customer factory conditions differ (e.g., 30°C ambient, higher electrical noise), SAT must include those conditions
- Batch traceability: part serial numbers or batch codes recorded

**Variable Independence:**
- Mechanical, electrical, software, edge-case tests designed to run concurrently (dependencies documented)
- Example: "Accuracy test (mechanical) parallel to controller stability test (electrical) — no shared resources"

### Verification
- Test plan document lists pass criteria numerically
- Logbook or test report includes environmental conditions per session
- Sample sizes justified (e.g., "n=30 samples per test; 95% confidence ≥90% pass rate")
- Test data sheets include pass/fail per sample (not just aggregate)

### Red Flags
- Test plan with no pass criteria (just descriptions)
- "All tests passed" with no failure log
- No mention of environmental control (temperature, humidity, supply voltage)
- One test passes; unit ships; fails in customer factory
- Sample size = 1 or 2 (not statistically valid)

---

## Section 4: Statistical Methods & Concurrent Testing

### The Rule
Design tests in parallel to compress schedule. Use statistics to make closure decisions.

### What Must Be True

**Concurrent Testing:**
- Test phases structured as independent streams (I/O Check → Safety Tests → Motion Tests → Cycle Tests)
- Each phase can complete and sign off independently
- Only real dependencies documented (e.g., "Safety test must pass before Motion cycle")
- Gantt chart shows parallel scheduling, not serial waterfall

**Statistical Closure:**
- Sample size calculated (target confidence, acceptable pass rate)
- Typical: n=20–30 samples for 95% confidence that ≥90% of production meets spec
- Pass-fail data recorded per sample (not just aggregate counts)
- Failure distributions analyzed (e.g., "3 of 30 failed on encoder drift; all corrected by [action]")
- Risk acceptance documented: "Confidence 96%; residual failures < 1%; accepted by Engineering + Customer"

**Pilot Production:**
- First production runs monitored for early failures (control charts, SPC)
- Scrap/rework tracked; if >5% fallout, investigation triggered
- Early warning system prevents field failures

### Verification
- Test Gantt chart shows parallel streams
- Test summary includes sample count, pass rate, confidence calculation
- Failure analysis documented (not just "all good")
- Statistical closure summary signed by Quality + Engineering

### Red Flags
- Test schedule is serial (Mechanical, then Electrical, then Software)
- "All passed" with sample size ≤5
- No confidence rationale or risk acceptance
- No trace of statistical method in closure summary
- Pilot run scrap >5% with no investigation

---

## Section 5: Phase Gates, Risk Registry, Milestone Dependencies, Customer Communication

### The Rule
Milestones are gates, not dates. Every gate has entry criteria and owner. Risks are tracked weekly.

### What Must Be True

**Phase Gates (Typical Sequence):**

| Gate | Entry Criteria | Owner | Output | Risk To Escalate |
|------|---|---|---|---|
| **Concept Freeze** | Requirements locked; customer variants confirmed; technical feasibility clear | Sales + Engineering | Charter, BOM (draft) | Customer changing requirements |
| **Design Release** | CAD 100% complete; BOM final; all lead-times validated; suppliers quoted | Engineering | Final BOM, RFQ ready | Long-lead expedite cost |
| **Procurement** | All POs issued; critical items ordered; receipts scheduled | Procurement | PO list, delivery Gantt | Supplier delays; quality gaps |
| **Build Start** | All long-lead parts received; shop space ready; work instructions finalized | Manufacturing | Build plan, schedule | Late arrivals block start |
| **Debug Complete** | All functional issues resolved; scrap/rework <5%; FAT plan finalized | Manufacturing + Quality | FAT readiness sign-off | Critical defects; design changes required |
| **FAT** | All tests pass; documentation complete; samples approved; customer witness | Quality + Customer | FAT closure report | Customer rejects; rework required |
| **Ship** | FAT passed; shipping logistics confirmed; spares kits ready | Logistics | Shipment, SAT schedule | Delays in shipping |
| **SAT** | Customer validates in their environment; operational procedures trained; support on-site | Launch + Customer | SAT closure, go-live authorization | Field performance issues; support escalations |
| **Production Ramp** | Customer running independently; scrap <2%; process stable; support remote | Operations | Ramp status, handoff to support | Early field failures; process instability |

**Risk Registry (Weekly Update):**

- Top risks documented with impact, probability, mitigation, owner
- Example:
  ```
  Risk: Servo motor lead time 8 weeks; only 2 suppliers globally
  Impact: Program slip 4–8 weeks
  Probability: High (vendor has backlog)
  Mitigation: Pre-order specimen week 0; evaluate ABB alternative
  Owner: Procurement
  Status: PO placed week 1; delivery on track week 7
  ```
- Reviewed every Monday in stand-up
- Escalation if no mitigation progress (owner or manager must acknowledge)

**Customer Communication (Weekly Minimum):**

- Status meeting every Friday (or per contract)
- Agenda: progress, top 3 blockers, schedule confidence, customer concerns
- Deliverable: 1-page status update (Green/Yellow/Red, action items, risks)
- Any schedule slip or requirement change communicated within 48 hours
- Customer acknowledgment recorded (email, meeting minutes)

### Verification
- Gate criteria documented before project starts
- Gate sign-off document completed for each closure (owner, date, risks)
- Risk register updated weekly; escalation log maintained
- Status meeting minutes recorded; customer acknowledgment filed
- Schedule adjusted if gates slip (not hidden hope)

### Red Flags
- Schedule shows only dates (no entry criteria or dependencies)
- "On track" status with no blocker list
- Risk register empty (every project has risks)
- Customer discovers schedule slip from project chat, not formal status update
- Internal vs. customer schedule differ

---

## Section 6: Failure Investigation & Root Cause

### The Rule
When something fails, you find why. Temporary patches are not solutions.

### What Must Be True

**Failure Logged Immediately:**
- Date, time, part/sample ID, test step, observed symptom
- Photograph/video if visual defect
- Environmental conditions (temperature, humidity, supply voltage at failure)
- Operator/analyst notes (what felt wrong, sounds, etc.)

**Root Cause Investigation (Within 48 Hours):**
- Symptom analysis: What failed? What could cause that?
- Design review: Does the design expect this condition? Is tolerance stack the issue?
- Process review: Is manufacturing step documented correctly? Was procedure followed?
- Supplier quality: Was incoming inspection performed? Does certificate match?
- Environmental: Temperature, humidity, electrical supply within spec?

**Corrective Action (Not Adjustment):**
- Design change (e.g., increase wall thickness, improve assembly grip)
- Process change (e.g., new torque spec, temperature ramp control)
- Supplier change (dual-source, new supplier, tighter SPC agreement)
- Example of temporary patch (❌): "Adjust regulator setting" → retested OK → ships
- Example of real fix (✓): "Regulator drift caused by thermal coefficient; source with ±2°C spec" → tested at range → stable

**Retest Confirmation:**
- After corrective action, retest failed condition (at least 3 samples)
- Same conditions as original failure (temperature, humidity, batch)
- Document pass/fail
- If pass, close issue with corrective action reference

### Verification
- Failure log created for each incident
- Root cause analysis documented (1 page: symptom → path to investigation → root cause → action)
- Design/process change order issued and tracked
- Retest performed and logged
- Issue closed only after corrective action verified

### Red Flags
- "Tested OK on second try" with no root cause investigation
- Failures blamed on "operator error" without fixture/procedure review
- Same symptom appears in different samples; treated as independent incidents
- Design change made without impact analysis on other parts
- No traceability between failure and corrective action

---

## Section 7: Cross-Functional Handoffs (RACI Matrix Pattern)

### The Rule
Every deliverable has an owner. Handoffs are explicit, not assumed.

### What Must Be True

**RACI Matrix Created Before Project Starts:**
- **R** (Responsible): Who does the work?
- **A** (Accountable): Who signs off (yes/no)?
- **C** (Consulted): Who provides input?
- **I** (Informed): Who gets status updates?

**Example for "Final BOM":**

| Role | Responsibility |
|------|---|
| Mechanical Engineering | R — Design parts, tolerance stack |
| Electrical Engineering | C — Inputs on connector placement, thermal impact |
| Controls Engineering | C — Inputs on sensor integration, I/O space |
| Procurement | C — Feasibility check on suppliers |
| Quality | A — Reviews BOM for testability, traceability |
| Program Manager | A — Sign-off (gates Procurement phase) |

**Explicit Handoff Protocol:**
1. Owner completes deliverable
2. Accountable reviews (typically within 2 business days)
3. If approved: deliverable marked "Signed" with date/owner
4. If rejected: marked "Revision Needed" with feedback; new review date scheduled
5. Once approved, deliverable is locked (change control) unless minor correction

### Verification
- RACI matrix documented in project charter
- Deliverable sign-off sheet includes date, owner, revision number
- Handoff meetings scheduled (not done via email chain)
- Change log maintained for post-approval modifications

### Red Flags
- Responsibility ambiguous ("We'll figure it out")
- Deliverable "approved" but no signature trail
- Changes made after sign-off with no revision control
- Team discovers they were expected to contribute but weren't consulted
- Handoff via email chain (no meeting, no acknowledgment)

---

## When to Escalate

**Immediate Escalation (Within 1 Hour):**
- Safety concern (E-stop fails, interlock bypassed, incorrect fault behavior)
- Long-lead supplier goes out of business or announces delay >4 weeks
- Quality defect with unknown root cause (pending investigation)

**Daily Stand-up Escalation:**
- Design issue requiring customer decision
- Procurement expedite needed (cost >$5K or schedule >2 weeks)
- Test failure requiring design change
- Resource conflict (team member pulled to other project)

**Weekly Risk Review:**
- Risk probability or impact changed
- Mitigation plan stalled or ineffective
- New risk identified (supplier backlogs, new competitor, regulation change)

---

## Hallucination Guard List

These are the most common hallucinations in manufacturing programs:

❌ "Launch on track" → What blockers? Where's the risk register?  
❌ "All tests passed" → Sample size? Pass criteria? Failure log?  
❌ "Commissioning will be quick" → No debug plan; wishful thinking  
❌ "Delivery in 4 weeks" → Check supplier website; probably more  
❌ "Production ready" → FAT passed? SAT passed? Scrap <2%?  
❌ "Minor design tweak" → What's the impact? Expedite cost? Schedule?  
❌ "Supplier is reliable" → Sole source? Backlogs? Geography risk?  
❌ "Cycle time is 10 hours" → No breakdown; operator confusion guaranteed  
❌ "Safety is built in" → Partition? Validation? Fault handling documented?  

---

**Reference**: These standards distill practices from ISO 13849-1 (safety), ISO 14644 (cleanroom process control), IEC 61508 (functional safety), lean manufacturing (value stream), and 20+ years of program retrospectives.
