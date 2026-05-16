# Data Analytics Sacred Standards 📊

**Last Updated**: April 12, 2026  
**Scope**: SQL analysis, metrics, dashboards, and business intelligence  
**Enforcement**: All data analytics and BI agents reference these sections for rigor and clarity

---

## Section 1: Metric Definitions & Consistency

### The Rule
"Revenue" means 10 things. Define it once. Use everywhere. Eliminate shadow analytics.

### What Must Be True

**Explicit Metric Definitions:**
- Every metric has written definition: Statement of exactly what is included/excluded
- Example of ✓: "MRR = SUM(plan_amount * 12 / 365) for subscriptions WHERE status='active'; normalized to 30-day month; excludes one-time charges and overages"
- Example of ❌: "Revenue" (ambiguous on recognition timing, refunds, discounts, currency)

**Owner & Version:**
- Metric has named owner (CFO for financial, CRO for sales)
- Owner accountable for definition accuracy
- Track versions: v1, v2, etc.; when calculation changes, increment and communicate
- Deprecation path: If retiring metric, provide replacement + migration map

**Cross-Functional Alignment:**
- Finance team confirms calculation matches GL
- Sales confirms matches pipeline/forecast logic
- Marketing confirms matches campaign tracking
- No conflicting definitions

**Standardized Formula (If Complex):**
```
Metric: Net Revenue Retention (NRR)
Formula: (Starting ARR + Expansion - Contraction - Churn) / Starting ARR * 100
Steps:
  1. Cohort customers by subscription start month
  2. Calculate starting ARR = MRR @ cohort month * 12
  3. Calculate current ARR = MRR @ current month * 12
  4. NRR = (Current ARR / Starting ARR) * 100
Inclusions: All subscription types
Exclusions: <12-month customers (incomplete cohort), trials
Time Period: 12-month trailing cohorts
```

### Verification
- Metric definition document created for all key KPIs
- Definition matches across finance/sales/ops systems
- Owner documented and acknowledges accuracy
- Version tracked; changes communicate to stakeholders
- Calculation validated against source systems (within 2% variance)

### Red Flags
- Metric defined differently on 3 dashboards
- "Revenue" undefined; everyone assumes different calculation
- No owner; metric maintained by "nobody"
- Metric changed without notification to stakeholders
- Calculation doesn't match GL or CRM

---

## Section 2: Dashboard Design Principles

### The Rule
Less is more. Tell a story. Context always.

### What Must Be True

**Dashboard Hierarchy (3 Levels Max):**

**Level 1: Executive Overview** (5-7 metrics max)
- Purpose: 15-minute health snapshot
- Metrics: Top KPIs only (ARR, NRR, Burn, Growth)
- Drill-down: Each card links to deeper analysis
- Mobile-responsive: Works on phone
- Example: "ARR $24.3M (↑5.2% QoQ), NRR 112% (↓3pp), Burn $2.1M"

**Level 2: Functional Dashboards** (10-15 metrics per team)
- Purpose: Sales/marketing/ops team daily workflow
- Metrics: Role-specific (pipeline for sales; CAC for marketing; ops metrics)
- Drill-down: Links to detailed tables, anomalies
- Example: Sales dashboard shows pipeline by stage, deals at-risk, close forecast

**Level 3: Detailed Analysis** (Tables, drill-down, raw data)
- Purpose: Investigate specific questions
- Metrics: All supporting detail; sortable, filterable tables
- Example: All deals with: deal size, stage, probability, close date, rep

**Context Always:**
- Benchmark: Show vs. target, vs. prior period, vs. forecast
- Trending: Line chart showing 3+ periods
- Distribution: Show average + range (not just average)
- Example: "Conversion 3.2% (target 3.5%, prior month 3.0%, industry 2.8%)"

**Color Coding (Consistent):**
- Green: On track or positive
- Yellow: Watch; requires attention
- Red: Off track; urgent action
- Gray: No data or N/A
- Colorblind-safe palette (no red/green without additional indicators)

### Verification
- Dashboard has <10 visualizations (one page, minimal scrolling)
- Every metric shows context (benchmark, prior period, or trend)
- Mobile-responsive (test on 375px width)
- Drill-down paths clear (click card → detail view)
- Color coding applied and colorblind-safe

### Red Flags
- Dashboard >15 visualizations (cognitive overload)
- Metric shown without comparison or context
- Pie charts (replace with horizontal bars)
- Desktop-only; doesn't work on mobile
- Colors only signal (red/green blind users confused)

---

## Section 3: SQL Best Practices & Reproducibility

### The Rule
SQL is documentation. Write it for humans first. Reproducibility is non-negotiable.

### What Must Be True

**Query Structure (Pattern):**
```sql
-- Title: Weekly Sales Pipeline Health
-- Author: Sales Analytics | Last Updated: 2026-03-12
-- Purpose: Monitor pipeline by stage and rep; surface at-risk deals
-- Refresh: Daily, 9 AM UTC
-- Owner: Sales Ops
-- Assumptions:
--   - "At-risk" = Deal in stage >30 days without update
--   - "Probability" from sales rep forecast (validated against historical close %=)
-- Exclusions: Deals with status='lost' or 'eliminated'
-- Q: Query runs in <5 seconds

WITH pipeline_summary AS (
  -- Join deals to reps; calculate age
  SELECT
    rep_name,
    stage,
    COUNT(*) AS deal_count,
    SUM(deal_value) AS stage_total,
    AVG(deal_value) AS avg_deal_size,
    CAST(ROUND(AVG(CAST(close_probability AS NUMERIC) / 100), 2) AS NUMERIC) AS avg_probability,
    MAX(DAYS_BETWEEN(CURRENT_DATE, last_update_date)) AS max_days_since_update
  FROM deals
  WHERE status NOT IN ('lost', 'eliminated')
    AND created_date >= CURRENT_DATE - INTERVAL '90 days'
  GROUP BY 1, 2
),

at_risk_deals AS (
  -- Flag deals stalled >30 days
  SELECT *,
    CASE WHEN max_days_since_update > 30 THEN 1 ELSE 0 END AS is_at_risk
  FROM pipeline_summary
)

SELECT * FROM at_risk_deals
ORDER BY rep_name, stage;

-- Data Quality Checks (run before reporting):
-- 1. deal_count > 0 for all reps (catch missing data)
-- 2. stage_total > 0 (catch data entry errors)
-- 3. avg_probability BETWEEN 0 AND 1 (catch invalid probabilities)
-- 4. Compare to sales forecast within 5% (accuracy check)
```

**Version Control Requirements:**
- All SQL in git (not just saved locally)
- Commit message: "Add weekly pipeline report; flag at-risk deals"
- Code review: Someone reviews before sharing results
- Reproducibility: Anyone can run query and get same results

**Query Performance:**
- Target: <5 seconds for interactive queries, <60 seconds for batch reports
- Monitor: Track query runtime; alert if degrades
- Optimization: Use WHERE to filter early; aggregate after joins

### Verification
- SQL includes header (title, author, purpose, assumptions, exclusions)
- Query in git with commit history
- Runtime <5 seconds for interactive queries
- Data quality checks documented
- Results match prior runs (reproducibility)

### Red Flags
- SQL without comments or header
- Query saved in personal folder (not version controlled)
- Runtime 30+ seconds (optimization needed)
- Results differ each run (non-deterministic)
- No data quality validation

---

## Section 4: Visualization Best Practices

### The Rule
Chart type matters. Right chart tells the story. Wrong chart hides it.

### What Must Be True

**Chart Selection:**

**Bar Chart** (Comparison)
- Use: Compare values across categories
- Example: Sales by region, conversion rate by product
- Avoid: Pie charts (use bar instead)

**Line Chart** (Trends Over Time)
- Use: Show progression over time
- Example: Revenue trend, churn rate over 12 months
- Avoid: More than 3 lines (too cluttered)

**Scatter Plot** (Correlation)
- Use: Show relationship between 2 variables
- Example: CAC vs. LTV scatter; identify high/low efficiency customers
- Avoid: >1000 points without aggregation (too dense)

**Heatmap** (Patterns)
- Use: Show patterns across 2 dimensions
- Example: Conversion rate by device × operating system
- Avoid: Non-sequential colors (sequential or diverging palettes)

**Avoid Entirely:**
- Pie charts (angles are hard to compare; use bar instead)
- 3D charts (perspective distorts perception)
- Double y-axis charts (confuses readers; use separate charts)

**Color Strategy:**
- Status: Green/yellow/red (with shape/label backup for colorblind users)
- Sequential: Light → dark (low → high)
- Categorical: Distinct hues (max 5 categories; use legend)
- Colorblind-safe: Test with protanopia/deuteranopia simulator

**Labeling (Direct > Legend):**
- Put labels on chart lines/bars
- Move legend if possible (saves cognitive load)
- Example: Instead of legend entry, label line "Conversion Rate"

### Verification
- Chart type matches question (comparison = bar, trend = line)
- No pie charts (replaced with bars)
- Color intentional and colorblind-safe
- Labels direct on chart (minimal legend use)
- Legend clear if necessary

### Red Flags
- Pie chart (replace with bar)
- 3D chart (use 2D)
- Dual y-axis (use separate charts)
- >5 colors in categorical palette
- Labels only in legend (eyes must bounce between chart + legend)

---

## Section 5: Performance Optimization & Caching

### The Rule
Slow dashboards aren't used. Cache aggressively where stale data is acceptable.

### What Must Be True

**Load Time Targets:**
- <3 seconds: Executive dashboards (must be fast)
- <5 seconds: Operational dashboards (acceptable wait)
- <10 seconds: Scheduled reports (one-time compute OK)
- >10 seconds: Too slow (users abandon)

**Optimization Strategies:**

**Pre-Aggregation:**
- Don't query raw tables in real-time
- Create daily/hourly rollups instead
- Example: Daily revenue summary (pre-aggregated) > raw transactions

**Incremental Loading:**
- Load only new/changed data
- Example: Daily dashboard uses last 90 days (cached) + today's data (fresh)

**Materialized Views:**
- Pre-compute complex logic overnight
- Refresh daily (or hourly if critical)
- Example: Cohort retention view (N² logic) materialized once, queried many times

**Partition Pruning:**
- Filter on partitioned column early (date, region, customer)
- Query engine skips irrelevant partitions
- Example: WHERE date >= '2026-03-01' skips Jan/Feb partitions

**Summary Tables for Drill-Down:**
- Summary: Quick aggregate view (dashboard card)
- Detail: Full data (drill-down table, may be slower)
- User experience: Fast overview + optional detail

### Verification
- Dashboard 95th percentile load time <3 seconds
- Pre-aggregated tables used (not raw facts)
- Materialized views scheduled (not queried live)
- Partition pruning confirmed in query plans
- Cache strategy documented (refresh schedule)

### Red Flags
- Dashboard takes 10+ seconds to load
- Querying billion-row table live (no pre-aggregation)
- Incremental filters missing (full scan every time)
- Dashboard materialized as view instead of table

---

## Section 6: Data Quality & Validation

### The Rule
Validate before reporting. Tell stakeholders what's wrong.

### What Must Be True

**Before Publishing Any Report:**
1. Validate data exists (non-zero row count)
2. Cross-check against known benchmarks (within 2%)
3. Look for outliers (1 customer with 100x typical value?)
4. Check for nulls (>5% nulls in critical columns = investigate)
5. Verify freshness (data not stale)

**Flagging Issues:**
- Alert prominently: "Data is 2 days old; may not reflect today's orders"
- Document gaps: "Q1 data incomplete for Region X; excluding from analysis"
- Call out anomalies: "May 15 spike due to system migration; treat as outlier"

**Communicating Limitations:**
- Sample size: "n=50 customers; limited confidence"
- Exclusions: "Excludes trial customers under 30 days"
- Assumptions: "Assumes churn date = last login + 60 days; not perfect"

### Verification
- Data validation checklist completed before publishing
- Anomalies documented and flagged
- Data freshness disclosed
- Limitations stated in report header
- Cross-checks against known sources (within 2%)

### Red Flags
- Report published without data validation
- Anomaly discovered but not flagged
- Data 1+ weeks old; users assume current
- No mentions of exclusions or limitations
- Numbers conflict with finance/CRM with no explanation

---

## When to Escalate

**Immediate (Within 1 Hour):**
- Metric definition conflict (finance vs. sales disagree)
- Data appears wrong (3x normal value; investigate)
- Dashboard loading slow (>10 seconds; blocking users)

**Daily Stand-Up:**
- Metric consistency issues
- Data freshness gap (delayed pipeline)
- New anomaly pattern discovered

**Weekly Review:**
- Performance optimization backlog
- Metric definition clarification needed
- Dashboard usage analytics

---

## Hallucination Guard List

❌ "Revenue" reported without definition (10 possible meanings)  
❌ Dashboard with 20 visualizations (cognitive overload)  
❌ Metric reported without prior period or target comparison  
❌ Pie chart (replace with horizontal bar)  
❌ "Dashboard loads in 15 seconds" (too slow; users abandon)  
❌ Average revenue reported without distribution (hiding outliers)  
❌ Report published without data validation  
❌ Metric changed silently (no communication to stakeholders)  

---

**Reference**: These standards distill practices from Tufte (data visualization), Kahneman (decision-making), dimensional modeling, and 10+ years of analytics retrospectives.
