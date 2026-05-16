# Developer Relations Sacred Standards 🎤

**Last Updated**: April 12, 2026  
**Scope**: Developer experience, documentation, advocacy, and community for developer tools and platforms  
**Enforcement**: All developer relations agents reference these sections for rigor and authenticity

---

## Section 1: Developer Experience — Friction and Onboarding

### The Rule
Time-to-first-success is the most predictive metric. If a developer hits friction early, they leave. Friction must be quantified, not assumed.

### What Must Be True

**Friction Audits (Quantified, Not Anecdotal):**
- Every friction point measured: How many developers? How much time lost? Blocking vs. annoying?
- Session recording analysis: Watch 5–8 new developers (no helping allowed) try to get a working example
- Mark every pause, backtrack, expression of confusion, or "new tab" moment
- Example metrics: "6 of 8 developers hit error X, average recovery time 8 minutes, 37% drop-off at auth step"

**Baseline Before Optimization:**
- Time-to-first-API-call measured before any changes (median, not average)
- Error rate in first session (how many errors per new developer?)
- Drop-off by step (which step loses the most people?)
- Without a baseline, you can't know if changes helped

**First-Run Experience (First 2 Minutes):**
- Real, working value shown before asking for credentials
- If first code requires auth/signup/API key, that's a UX failure
- Exception: High-security products (but even then, test mode without credentials should work)
- Ideal: Paste one code block, see real result

**Error Messages (Actionable, Not Descriptive):**
- Format: [What happened] + [Why] + [What to do] + [Link to context]
- Example ✓: "Invalid API key format. Keys start with 'sk_' and are 43 characters. Yours is 42. Check for trailing spaces. Your key: https://app.example.com/settings/api-keys"
- Example ❌: "401 Unauthorized"
- Example ❌: "Invalid input"
- Every error must be actionable without opening additional tabs or documentation

**SDK First-Run Surface Area:**
- Method signatures obvious from autocomplete
- Required parameters highlighted (JSDoc `@required` or TypeScript strict types)
- Type errors caught before runtime (not discovering missing fields at 3am on production incident)

**Measurement & Iteration:**
- A/B test onboarding flow changes (don't assume they help without proof)
- Measure delta before/after: time-to-first-API-call, error rate, drop-off at friction points
- Document the change + the measured impact for future reference

### Verification
- Friction audit completed with 5–8 real developers; recorded with timestamps
- Baseline metrics established (time-to-first-API-call, error rate, drop-off)
- Top 3 friction points prioritized; fixes proposed with effort estimates
- Changes A/B tested with metric delta measured before/after
- Error message audit: all critical errors rewritten with actionable format

### Red Flags
- "Onboarding looks good" without measuring time-to-first-API-call
- Friction report without concrete fix recommendation
- Error message doesn't suggest the fix
- Code sample requires context not stated (assume reader knows nothing)
- No baseline metrics; changes claimed to help without proof
- SDK method where required params aren't obvious from IDE autocomplete

---

## Section 2: Documentation — Quality and Completeness

### The Rule
Documentation is product. Imprecise docs create more support tickets than missing features. Every doc page has one job.

### What Must Be True

**Prerequisites Never Assumed:**
- State every requirement upfront with installation link
- Example: "Node.js 16+" with link to install, not just "Node.js"
- Example: "API key ready?" with link to get one
- Never abbreviate steps because "everyone knows this"

**Getting-Started Guides (Complete Journey):**
- Estimated time upfront (e.g., "~15 minutes")
- By end of page, reader has working output they can modify
- No prerequisites hidden mid-page
- Every step is one focused action (not "install + configure + deploy")
- "What's next" links one specific next step, not ten possible paths

**Code Samples (Copy-Paste Complete):**
- Every sample is complete and runnable without modification
- No `// ... rest of the code` (ellipsis is forbidden)
- Include imports, error handling, full working flow
- Run all samples in CI; alert on staleness
- Broken docs are worse than no docs

**API Reference (Precise and Readable):**
- Endpoint, HTTP method, URL clearly stated
- Every parameter documented: type, required/optional, description, constraints
- Every error documented: error code, error name, description, what to do
- Response body documented with example
- At least one working example (curl, JavaScript, Python) included

**Changelogs (Not Just PR Titles):**
- What changed: feature, fix, or breaking change
- Why it changed: problem solved
- If breaking: what breaks, exactly how to migrate (code example)
- If feature: what it does, when to use it, link to docs
- Example ✓: "Fixed race condition in token refresh that caused intermittent 401 errors on sessions >24 hours old"
- Example ❌: "Fix bug in auth"

**Error Message Copy (Actionable):**
- Format: [What happened] + [Why] + [What to do] + [Link]
- Assume reader is frustrated and has 5 minutes to understand and fix
- Never condescending; never assume prior knowledge
- Link directly to fix (if self-service) or escalation path

**Doc Organization (One Page = One Job):**
- Getting-started teaches task
- API reference documents interface
- Concept guides explain "why" and mental models
- Page doing two jobs fails at both
- Structure enforces focus

**Testing Docs (Automated):**
- Extract all code samples; run in CI every build
- Broken sample = doc failure
- Check all links monthly
- Verify API examples still work after releases

### Verification
- Getting-started guide: new developer can complete it in ≤30 minutes using only public docs
- All code samples run without modification
- All API responses documented with examples
- Changelog entries formatted with migration steps for breaking changes
- Error messages rewritten to be actionable
- Doc pages pass "one page, one job" review

### Red Flags
- Code sample with `// ... rest of the code` (incomplete)
- Tutorial without time estimate or prerequisites upfront
- API endpoint documented for happy path only (no errors)
- Changelog entry that's just a PR title
- Broken links or 404s on "next steps"
- Assumption of prerequisite knowledge not stated
- Getting-started takes 45+ minutes (loses readers)

---

## Section 3: Developer Advocacy — Content Quality and Authenticity

### The Rule
Developers detect hype instantly. Substance, honesty, and concrete examples build credibility. One skeptical senior engineer at 11pm is your audience.

### What Must Be True

**Conference Talks (Problem-First, Problem-Solving):**
- Abstract leads with problem ("When you deploy WebSockets at scale..."), not product pitch
- Concrete takeaways listed (not vague learning outcomes)
- Example ✓: "Three failure modes of real-time systems and how to detect them early"
- Example ❌: "Learn about best practices in modern web development"
- Code demo shows working solution, breakage happens intentionally (not hidden)

**Blog Tutorials (Code First, Prose Second):**
- Working code examples drafted before any prose
- Exact problem described (not "introduction to X")
- Example ✓: "Why your WebSocket server collapses at 500 users and how to fix it"
- Example ❌: "Introduction to WebSockets"
- Lead with problem; structure prose around code
- Every claim is backed by concrete example or data

**Code Samples (Runnable, Not Aspirational):**
- Complete, ready to copy-paste
- No ellipsis (`...`), no implicit context, no missing imports
- Error handling included (not just happy path)
- Works in a fresh environment (not assumed setup)
- Every sample tested against fresh machine before publish

**Demo Applications (Show One Thing Well):**
- Focused scope: shows exactly one powerful capability
- Runs in <60 seconds after git clone
- README explains what's shown and what's simplified for clarity
- Honest about tradeoffs (builds trust more than perfection)

**Launch Content (Not Marketing, Just Explained Well):**
- Explain what changed, why it changed
- If breaking: migration example included
- Framing: for builder type X, this means...
- One specific problem solved, not trying to explain full platform

**No Marketing Copy in Technical Content:**
- If a sentence could appear in a brochure, delete it
- Replace vague claims ("best-in-class," "amazing") with concrete examples
- Developer skepticism is your quality bar

**Story Arc (Earn Reader's Next Minute):**
- Every paragraph should give reason to read the next
- Acknowledge before redirecting ("That's real, here's how...")
- Mark edges ("This won't work on [platform X], but...")
- Respect reader time; say estimated read time upfront

### Verification
- Conference abstracts show concrete problem + concrete takeaways
- Blog posts backed by working code that runs in CI
- Code samples pass "fresh machine test" (no hidden setup assumptions)
- Demo apps show one capability well; runnable in <60s
- No marketing copy remains after editorial pass
- Release notes include migration steps for breaking changes

### Red Flags
- Conference abstract is product pitch (no concrete problem)
- Blog post with `// ... rest of code`
- Demo requires 5 workarounds to work (not disclosed)
- Tutorial has marketing language ("amazing," "best")
- Launch announcement doesn't explain what changed or why
- Code samples only show happy path (failures hidden)
- Estimated read/watch time not disclosed upfront

---

## Section 4: Community Health and Governance

### The Rule
Community health is a lagging indicator. Community toxicity is a leading one. Design for member value first; company value follows. Report both health and growth metrics.

### What Must Be True

**Community Architecture (Before Launch):**
- Channel structure designed around what members do, not org chart
- Clear rules (what's on-topic, off-topic, spam definition)
- Moderation policy documented (not "we'll figure it out")
- Onboarding flow: new member journey from "joined" to "first post"
- Success criteria defined (what does healthy look like?)

**Member First, Company Second:**
- Initiatives benefit members primarily; company value is secondary
- If initiative benefits company metrics but not members, it will backfire
- Astroturf enthusiasm is detected instantly and destroys trust permanently
- Community exists for member usefulness, not lead generation

**Consistent Moderation (Norms Matter):**
- One unenforced rule is worse than no rule
- Every moderation decision sets precedent
- Moderation applies consistently regardless of member status
- Public moderation is rare; warnings and corrections DM-only
- Moderation log maintained (not secret, but not performed publicly)

**Health Metrics (Not Vanity Metrics):**
- Active member ratio ≥8% of total active in last 30 days (not just member count)
- #help answer rate ≥85% of questions get ≥1 reply within 24h
- Response time for support questions tracked (median, not average)
- Number doing top 10 answering (if >60%, you have a bottleneck)
- New member activation: ≥40% post something in first 14 days
- Contributor retention ≥70% at 6 months

**Recognize Burnout Before It Happens:**
- If 3 people answer 90% of questions, they're about to leave
- Contributor recognition program prevents burnout
- Rotation of "helper" duties if one person becoming bottleneck
- Monitor when power users post less frequently (early warning)

**Contributor Programs (Structured, Not Ad-Hoc):**
- Tiers defined with clear criteria (not subjective)
- Benefits escalate: recognition → access → opportunity
- Recognition timing: weekly for answers, monthly for major contributions
- Power users acknowledged publicly and privately
- Burnout prevention: recognize limits; don't exploit goodwill

**Crisis Response (Playbook Before Crisis):**
- Product controversy: pre-written response + escalation path + owner
- Community conflict: conflict de-escalation playbook
- Toxicity: account blocking, channel rules enforcement, moderation precedent
- Bad faith actors: recognize patterns early; remove before spread
- Communication: never mobilize community to counter external criticism

**Signal Extraction (Community as Product Intel):**
- Route community feedback into structured product signals (not ignore)
- GitHub issues tagged `community-request` route to PM
- Support escalations analyzed for pattern common issues
- When community feedback ships: announce it publicly in community
- Close the loop: developers feel heard when their feedback becomes features

### Verification
- Community architecture documented before launch
- Moderation policy written and shared with community
- Health metrics dashboard shows member activation, answer rate, contributor retention
- Contributor tiers defined with criteria and benefits
- Crisis response playbooks written (controversy, conflict, toxicity)
- Monthly community health review: metrics + narrative on what changed
- Community signals feed into product roadmap

### Red Flags
- Community "strategy" focused only on member count (growth ≠ health)
- Astroturfed enthusiasm or "please promote in #offtopic"
- Moderation inconsistent (rules enforced for some, ignored for others)
- Top 5 members answering >80% of questions (burnout imminent)
- No contributor recognition program (heavy lifting is unpaid)
- Product decision sprung on community via chat (should be formal post)
- Monthly review shows growth but retention declining
- Support tickets increasing even as community grows (quality declining)

---

## When to Escalate

**Immediate (Within 1 Hour):**
- Toxicity in community (hate speech, brigading) — moderation + removal
- Community member burnout signal (power user posting less) → check in
- Critical doc broken (code samples don't work) → fix + redeploy

**Daily Stand-Up:**
- DX friction pattern emerges (multiple devs stuck on same step)
- Community health metric drop (answer rate <85%)
- Product decision controversy in community → escalate to PM + comm

**Weekly Review:**
- Contributor recognition cadence (spotlight, monthly newsletter)
- Community signals routing to product (are patterns escalating?)
- Documentation staleness (check all code samples ran in CI)

---

## Hallucination Guard List

❌ "Onboarding is smooth" without time-to-first-API-call measurement  
❌ Error message that doesn't suggest the fix  
❌ Code sample with `...` (incomplete)  
❌ "Community is growing" (show member count AND retention)  
❌ No A/B testing of onboarding changes (assumed they help)  
❌ Astroturfed enthusiasm or "please promote our product"  
❌ Documentation tutorial without estimated time or prerequisites  
❌ Moderation applied inconsistently based on member status  
❌ 3 people answering 95% of community questions (bottleneck ignored)  
❌ Conference talk abstract that's a product pitch  

---

**Reference**: These standards distill practices from developer tool companies (Stripe, Twilio, Vercel), community health research (Commsor, CommonRoom), and 10+ years of DevRel retrospectives across technical platforms.
