# Data Science Sacred Standards 🧪

**Last Updated**: April 12, 2026  
**Scope**: ML model development, statistical experiments, and production ML systems  
**Enforcement**: All data science agents reference these sections for rigor, not hallucination

---

## Section 1: Production ML Discipline

### The Rule
Models ship to production only when they work there reliably. Notebook code is not production code. Version everything.

### What Must Be True

**Model Versioning:**
- Every model has git commit hash, training date, data version
- Model weights stored separately from code (model registry: MLflow, Weights & Biases, or similar)
- Model card documents: version, performance, limitations, failure modes
- Easy rollback: previous model version can be restored within 1 hour

**Graceful Degradation:**
- If ML service fails, system falls back to rule-based logic or historical average
- Prediction latency guaranteed <200ms (or configurable threshold)
- Confidence scores on every prediction (model outputs uncertainty)
- Never let a model outage break the product

**Monitoring & Alerting:**
- Prediction distribution tracked daily (mean, std, quantiles)
- Feature distribution compared to training data (drift detection)
- Model latency and error rate monitored continuously
- Alerts fired if: AUC drops >5%, latency >threshold, fallback rate >5%, distribution shift detected

**Retraining & Maintenance:**
- Retraining schedule defined: weekly, monthly, or triggered by drift
- Retraining uses only production data with proper temporal split (no future lookahead)
- A/B testing required before replacing model (offline→ online doesn't guarantee lift)
- Deprecated models deleted; no "just in case" technical debt

### Verification
- Model registry shows version, commit, training date, performance metrics
- Monitoring dashboard exists with drift/latency/fallback alerting
- Runbook documents "model degradation" incident response
- A/B test results documented before production switch

### Red Flags
- "Model ready to deploy" with no versioning plan
- Notebook code → production with no refactoring for error handling
- "If inference service is down, use last prediction" (stale data problem)
- No confidence scores on predictions
- Retraining happens ad-hoc instead of scheduled
- Model A→ B switch without A/B test

---

## Section 2: Statistical Rigor (Power Analysis, Multiple Comparison Correction)

### The Rule
Statistical tests have assumptions. Verify them. Multiple comparisons introduce false positives. Correct for them.

### What Must Be True

**Before Running A/B Tests:**
- Power analysis completed: minimum detectable effect (MDE) defined, sample size calculated
- Typical: 80% power, α=0.05 (5% type I error), MDE = smallest business-relevant difference
- Formula: n = (Z_α + Z_β)² * (p₁(1-p₁) + p₂(1-p₂)) / (p₂ - p₁)²
- Result: "Need 10K customers per variant to detect 2pp uplift with 80% power"

**During Experimentation:**
- P-value alone insufficient; report confidence intervals
- Always report: "Conversion improved 2–4pp with 95% confidence" not "p=0.03"
- Sequential testing allowed (with Bonferroni correction or stopping rules)
- Multiple comparison correction required if running >1 A/B test in same batch

**Multiple Comparison Correction Methods:**
- Bonferroni: Divide α by number of tests (conservative, overly strict)
- FDR (False Discovery Rate): Rank p-values, control proportion of false positives (less conservative)
- Benjamini-Hochberg: If running 10 A/B tests, control 5% FDR instead of 0.5% individual α

**Blocking Out Confounds:**
- Stratified randomization: Segment users before random assignment (reduces variance)
- Matched pairs: Pair similar users; assign one to A, one to B
- Covariate adjustment: Control for pre-experiment differences statistically

### Verification
- Power analysis documented before experiment starts
- Sample size logged (actual N ≥ powered N)
- P-values + confidence intervals both reported
- Multiple comparison correction applied if >1 test
- Confound handling strategy documented

### Red Flags
- A/B test with no power analysis ("Run it for a week")
- "P-value is 0.03" reported without confidence interval
- 10 A/B tests running in parallel with no multiple comparison correction
- Experiment stopped early based on "looking good" (multiple looks = inflated type I error)
- "Sample size was too small, so we reran it" (same data now = multiple testing)

---

## Section 3: Model Explainability & Interpretability

### The Rule
If stakeholders can't understand a prediction, they won't trust it. Interpretable models by default; explain black-box models.

### What Must Be True

**Interpretable Models (Preferred):**
- Logistic regression, decision trees, linear models
- Business stakeholders can understand feature coefficients
- Example: "Customer predicted high churn if days_since_login > 60 AND support_tickets > 3"
- Trade-off: May have lower AUC (0.82) than XGBoost (0.87), but 0.82 is still actionable

**Black-Box Models (Only If Justified):**
- XGBoost, neural networks, ensemble models
- If used, provide SHAP (SHapley Additive exPlanations) values
- SHAP shows: "For this customer, feature X flipped prediction to 'high churn'"
- Per-prediction explanation required; feature importance isn't enough

**Documentation Requirements:**
- Model logic documented: What does it predict? How is it used in product?
- Failure mode analysis: When does model fail? What are consequences?
- Feature definitions: How is "days_since_login" calculated? From which system?
- Stakeholder communication: Non-technical summary for PMs, sales, CS

### Verification
- Model card includes interpretability section
- If black-box: SHAP values computed and validated on 100+ samples
- Feature definitions tied to source tables/systems
- Stakeholder review completed; understanding confirmed

### Red Flags
- Neural network with "features don't matter, just feed data"
- "Model is proprietary; can't explain predictions" (unsuitable for business decisions)
- Feature importance only; no per-prediction explanations
- Stakeholders say "I don't understand how it makes decisions"

---

## Section 4: Model Evaluation & Offline-Online Gap

### The Rule
Validation metrics don't guarantee production performance. Validate offline; test online. Bridge the gap.

### What Must Be True

**Offline Validation (Development):**
- Temporal split: Train on X months, validate on subsequent month (never shuffle)
- Multiple metrics: AUC (discrimination), precision-recall, calibration, Gini coefficient
- Segment analysis: Performance on important subgroups (by customer tier, region, product)
- Example: "AUC=0.87 overall, but AUC=0.71 on free-tier customers"

**Online Validation (Canary/A/B Test):**
- Canary deployment: 1-5% traffic for 24-48 hours, monitor for errors
- A/B test: Statistically significant business metric (not just model metrics)
- Measure: Actual churn reduction, revenue lift, or other business outcome
- Duration: Long enough to catch edge cases, short enough to detect problems

**Bridging Offline-Online Gap:**
- Common causes: Data leakage, feature unavailability, class imbalance, distribution shift
- Compare offline metrics on holdout → online metrics from canary (should be within 5%)
- If gap >5%: Investigate data leakage, feature staleness, infrastructure issues
- Document gap and mitigation

### Verification
- Validation split is temporal (never shuffled)
- Offline metrics + business metrics both tracked
- Canary deployment results documented
- A/B test shows stat-sig business lift before full rollout
- Offline-online gap <5%; if >5%, root cause identified

### Red Flags
- "Validation AUC is 0.95" but no mention of train/test split strategy
- A/B test shows lift on model metric (AUC) but no business metric improvement
- Canary deployment skipped ("model looks good in validation")
- Production performance drops: offline AUC=0.87, online=0.72 (8% gap unexplained)
- No post-deployment monitoring

---

## Section 5: Experiment Design & Testing Strategy

### The Rule
Good experiments isolate causality. Bad experiments add noise. Design before running.

### What Must Be True

**Experiment Charter (Before Launch):**
- Hypothesis: "Feature X will improve conversion by Z% because..."
- Primary metric: What single metric defines success? (conversion rate, revenue, retention)
- Secondary metrics: What could break? (latency, page bloat, support tickets)
- Sample size: Powered for meaningful lift (MDE)
- Duration: Long enough to capture weekly seasonality? (typically 1–2 weeks)
- Success criterion: Stat-sig at α=0.05, confidence interval on business metric

**Avoiding Common Pitfalls:**
- Simpson's Paradox: Aggregated data shows opposite trend than segments (always segment)
- Survivorship Bias: Only analyzing customers who completed trial (include churned)
- Look-Elsewhere Effect: Running many tests increases false positives (m correcting for m)
- Confounded by day-of-week: Weekend behavior differs; need full week+
- Network effects: Treating users as independent when they influence each other

**Test Duration & Stopping Rules:**
- Fixed horizon: Run for N days, then analyze (conservative)
- Sequential testing: Interim analyses allowed with Pocock or O'Brien-Fleming bounds
- Never peek-and-decide: Each early look inflates type I error

### Verification
- Experiment charter reviewed and approved before launch
- Sample size calculated and logged
- Primary + secondary metrics defined
- Statistical test plan documented (t-test, chi-square, etc.)
- Confounds identified and controlled for
- Exit criteria documented (stat-sig + confidence interval)

### Red Flags
- "Run it and see what happens" (no charter)
- Test stopped early because results "look good"
- Only reported metric where A wins; ignored metrics where B wins
- Experiment running 3 days (insufficient for weekly seasonality)
- No distinction between metric improvement and statistical significance

---

## When to Escalate

**Immediate (Within 1 Hour):**
- Model in production drops >10% AUC overnight (likely data/infrastructure issue)
- Prediction latency >2x baseline (SLA breach imminent)
- Distribution shift alarm triggered (feature mismatch likely)

**Daily Stand-Up:**
- A/B test failed; need to understand why
- Retraining needed due to drift or performance degradation
- Feature engineering issues discovered in offline validation

**Weekly Review:**
- Model performance trending down (monitor before crisis)
- New experiment launching; charter needs review
- Monitoring SLA or budget exceeded

---

## Hallucination Guard List

❌ "Model AUC is 0.95" without test set size or temporal validity  
❌ "A/B test passed with p=0.03" (no confidence interval, no sample size)  
❌ "Neural network will improve by 10%" (no evidence; speculation)  
❌ Dashboard shows "predictions working well" with no monitoring infrastructure  
❌ "Training data and test data shuffled together" (temporal validation violated)  
❌ Experiment with n=50 per group (too small; needs power analysis)  
❌ Model deployed without fallback logic  
❌ "Features are proprietary secret" (should document for maintainability)  

---

**Reference**: These standards distill practices from Hastie/Tibshirani (ML best practices), Kohavi/Deng (experimentation), Shapley (explainability), and 15+ years of ML incident reports.
