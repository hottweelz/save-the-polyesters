# Analytics Engineering Sacred Standards 🏗️

**Last Updated**: April 12, 2026  
**Scope**: dbt development, dimensional modeling, metric definitions, testing, and documentation  
**Enforcement**: All analytics engineering agents reference these sections for maintainability and consistency

---

## Section 1: dbt Project Structure & Code Standards

### The Rule
Consistent structure enables collaboration. Naming conventions eliminate confusion. Version everything.

### What Must Be True

**Directory Structure (Mandatory):**
```
models/
├── staging/              # stg_* models (raw → clean only)
│   ├── crm/              # by source system
│   │   ├── _crm__sources.yml
│   │   ├── _crm__models.yml
│   │   ├── stg_crm__customers.sql
│   │   └── stg_crm__accounts.sql
│   ├── billing/
│       └── stg_billing__subscriptions.sql
│
├── intermediate/         # int_* models (business logic)
│   ├── finance/
│   │   ├── int_mrr_by_month.sql
│   │   └── int_subscription_history.sql
│   └── customer/
│       ├── int_customer_lifetime_value.sql
│
├── marts/                # fct_* / dim_* (dimensional model)
│   ├── finance/
│   │   ├── _marts__models.yml
│   │   ├── dim_customers.sql
│   │   ├── dim_products.sql
│   │   ├── fct_revenue.sql
│   │   └── fct_subscription_events.sql
│   ├── marketing/
│   │   ├── dim_campaigns.sql
│   │   └── fct_marketing_spend.sql
│
├── macros/               # Reusable SQL functions
│   ├── cents_to_dollars.sql
│   ├── safe_divide.sql
│   └── generate_schema_name.sql
│
└── dbt_project.yml       # Project configuration
```

**Layer Definitions (Strict boundaries):**

**Staging (`stg_*`):**
- Input: Raw source tables
- Output: Clean tables (renamed columns, correct types, basic filters)
- Changes allowed: Rename, cast, filter, simple deduplication
- Changes NOT allowed: Joins (except dedup keys), aggregations, business logic
- Example: `SELECT user_id, name, email, created_at FROM raw.salesforce_users` → `SELECT user_id, name, email, created_date FROM stg_crm__users`

**Intermediate (`int_*`):**
- Input: Staging tables + other intermediates
- Output: Business logic transformations
- Changes allowed: Joins, aggregations, derived columns, window functions
- Changes NOT allowed: None (business logic belongs here)
- Example: Calculate cohort, churn logic, time-based windows

**Marts (`fct_*`, `dim_*`):**
- Input: Intermediate tables
- Output: Dimensional model (facts + dimensions)
- Fact table grain: One row per transaction/event/period
- Dimension table grain: One row per entity per version (SCD Type 2 if tracking history)
- Example: `fct_revenue` (one row per customer per month), `dim_customers` (one row per customer + change event)

**Naming Conventions (Non-negotiable):**
- Staging: `stg_[source_system]__[entity_name]` (double underscore between system + entity)
- Intermediate: `int_[business_process]__[descriptor]`
- Fact: `fct_[event_name]__[grain]` (e.g., `fct_subscription_events__daily`)
- Dimension: `dim_[entity_name]` (e.g., `dim_customers`, `dim_products`)
- Never: CamelCase, no underscores, abbreviations without glossary

**Version Control:**
- All dbt code in git
- Code review required before merge to main
- Commit messages: "feat: add churn flag logic" or "fix: revenue double-counting"
- PR template: Describe changes, link to issue, note breaking changes

### Verification
- Project follows directory structure (no models in root)
- Naming conventions consistent across 100% of models
- Staging models contain no joins/aggregation
- Intermediate models contain business logic (not staging)
- Marts contain dimensional model (facts + dims)
- All code in git with branch protection on main

### Red Flags
- Models scattered without layer separation
- Mixed naming (stg_staging, staging_, stg_intermediate)
- Staging model doing aggregations ("SELECT customer_id, SUM(revenue)...")
- Mart models mixing multiple business domains
- No git history; code appears suddenly

---

## Section 2: Testing & Documentation

### The Rule
Untested code is broken code. Undocumented code is dead code.

### What Must Be True

**dbt Tests (SQL-Based):**
- Unique test: Primary key uniqueness (no duplicates)
- Not null test: Critical columns always populated
- Relationships test: Foreign keys exist in reference table
- Accepted values test: Enumerated columns contain expected values

**Testing Pattern (Mandatory for all critical models):**
```yaml
# models/_models.yml
version: 2

models:
  - name: fct_revenue
    columns:
      - name: revenue_key
        tests:
          - unique
          - not_null
      - name: customer_id
        tests:
          - not_null
          - relationships:
              to: ref('dim_customers')
              field: customer_id
      - name: mrr_amount
        tests:
          - not_null
          - dbt_utils.accepted_values:
              values: [gt, 0]  # Greater than 0
```

**Documentation (100% Coverage Required):**
```yaml
models:
  - name: fct_revenue
    description: "Monthly recurring revenue fact table; grain=one row per customer per month"
    columns:
      - name: revenue_key
        description: "Surrogate key (customer_id + revenue_month)"
        tests: [unique, not_null]
      - name: customer_id
        description: "Foreign key to dim_customers"
        tests: [not_null, relationships]
      - name: mrr_amount
        description: "Monthly recurring revenue amount in USD; normalized to 30-day months"
      - name: start_date
        description: "Month when MRR is active (grain)"
```

**Documentation Requirements:**
- Model description: What is this table? What's the grain?
- Column descriptions: What does this field represent? How is it calculated?
- Column tests: Uniqueness, not-null, referential integrity, value ranges
- Breaking changes: If model changes, document migration path for downstream

**Version Tracking & Deprecated Models:**
- Document breaking changes in changelog
- Deprecate model 1 version before removal
- Example: "v2: Renamed revenue_amount → mrr_amount; old name still available as alias"

### Verification
- All models have descriptions (no null descriptions)
- All critical columns have tests
- All critical columns have descriptions
- Breaking changes documented in dbt_project.yml or README
- Deprecated models have migration path documented

### Red Flags
- Model with no description
- Column with no description ("amount" is ambiguous; USD? EUR? before/after tax?)
- Critical columns without uniqueness/not-null tests
- Breaking change deployed without migration notice
- Model deleted without deprecation period

---

## Section 3: Materialization Strategy & Incremental Models

### The Rule
Views are fast to develop, tables are fast to query. Choose wisely. Incremental models save warehouse costs.

### What Must Be True

**Materialization Types:**

**View (Default for Development):**
- Use when: Logic is simple, query only occasionally
- Pros: Always fresh; no storage cost; easy to iterate
- Cons: Slow if complex logic; recalculated on every query
- Example: `SELECT * FROM staging WHERE is_active = true`

**Table (Materialized, Default for Marts):**
- Use when: Complex logic, queried frequently, large dataset
- Pros: Fast queries; pre-computed; good for dashboards
- Cons: Storage cost; stale until refresh; slower to iterate
- Example: `fct_revenue`, `dim_customers`

**Incremental (For Append-Only, Non-Volatile Tables):**
- Use when: Large tables (>100M rows), new data only (no updates)
- Pros: Minimal reprocessing; fast refreshes; cost-efficient
- Cons: Complex logic; backfill tricky; can accumulate duplicates if not careful
- Example: Event tables, subscription changes, audit logs

**Incremental Implementation (Mandatory Safeguards):**
```sql
-- models/marts/fct_events.sql
{{
  config(
    materialized='incremental',
    unique_key='event_id',  -- REQUIRED: prevents duplicates on rerun
    on_schema_change='fail', -- Catch schema changes, don't silently drop columns
    incremental_strategy='delete+insert'
  )
}}

SELECT
  event_id,
  event_date,
  customer_id,
  amount
FROM {{ ref('stg_events') }}

{% if execute and execute_macros %}
  {% if this.exists %}
    -- Only fetch data since last successful run
    WHERE event_date >= (SELECT MAX(event_date) FROM {{ this }})
  {% endif %}
{% endif %}
```

**Key Safety Features:**
- `unique_key`: Columns defining uniqueness; dbt prevents duplicates on rerun
- `on_schema_change='fail'`: Model fails if schema changes (don't silently drop columns)
- Incremental filter: `WHERE date >= (SELECT MAX(date) FROM {{ this }})` (new data only)

### Verification
- Materialization explicitly set (not just default)
- Incremental models have unique_key defined
- Incremental models have on_schema_change='fail'
- Non-incremental models document why (too many updates, real-time needed, etc.)

### Red Flags
- Incremental model without unique_key (duplicates will accumulate)
- Large table materialized as view (slow queries)
- No incremental strategy for append-only table (warehouse costs blow up)
- on_schema_change not set (silently drops columns)

---

## Section 4: Metric Definitions & Semantic Layer

### The Rule
"Revenue" means 10 different things. Define metrics once, reuse everywhere. Eliminate shadow analytics.

### What Must Be True

**Metric Definition (dbt Metrics or Manual):**
```yaml
# models/_metrics.yml
version: 2

metrics:
  - name: monthly_recurring_revenue
    description: "Total MRR across all active subscriptions"
    label: "MRR"
    
    calculation_method: sum  # sum, average, count, count_distinct
    expression: subscription_plan_amount  # Column to aggregate
    
    filters:
      - field: subscription_status
        operator: '='
        value: 'active'
    
    time_grains: [day, month, quarter, year]  # Aggregation granularity
    dimensions: [customer_segment, region, product]  # Drill-down dimensions
    
    meta:
      owner: "Finance Team"
      refresh_interval: "daily"
      version: 2  # Track metric versions
```

**Metric Governance:**
- Owner: Who maintains this definition?
- Version: If calculation changes, increment version (v1 → v2)
- Migration path: If deprecating metric, replace with new definition
- Audit trail: Track changes over time

**Consistency Across Tools:**
- Same definition in dbt metrics, Looker LookML, Tableau DAX, PowerBI measures
- Cross-reference: "See dbt metrics.yml for canonical definition"
- Version control: All definitions in git

### Verification
- Every critical KPI has metric definition (MRR, ARR, churn, CAC, LTV, etc.)
- Definition in dbt metrics or LookML (centralizing logic)
- Cross-checks: Same metric calculated 3 ways should return identical numbers
- Owner documented for each metric
- Version tracking on metric changes

### Red Flags
- Revenue calculated differently on 3 dashboards
- Metric definition only in ad-hoc SQL (not centralized)
- "Revenue" never defined; everyone assumes different calculation
- Metric changes without version bump or deprecation notice
- No owner; metric "maintained by nobody"

---

## Section 5: Slowly Changing Dimensions (SCD Type 2)

### The Rule
Type 2 captures history. Type 1 overwrites. Choose correctly for your use case.

### What Must Be True

**SCD Type 1 (Overwrite, Simple):**
- Use when: History doesn't matter (current state only)
- Example: Customer email changes; old email not needed
- Implementation: `UPDATE dim_customers SET email = new_email WHERE customer_id = X`
- Result: Only current state exists

**SCD Type 2 (History Tracking, Complex):**
- Use when: History matters (cohorts, retention analysis, audit trail)
- Example: Customer segment changes; need to track "was Premium in Jan, downgraded to Standard in Feb"
- Implementation: Insert new row for each change; mark old rows as inactive

**SCD Type 2 Implementation (dbt Pattern):**
```sql
WITH customers_with_hashes AS (
  SELECT
    customer_id,
    name,
    segment,
    MD5(CONCAT(segment, '|', tier)) AS current_hash,  -- Detect changes
    LAG(MD5(CONCAT(segment, '|', tier))) OVER (PARTITION BY customer_id ORDER BY updated_date) AS prior_hash,
    updated_date
  FROM {{ ref('stg_crm__customers') }}
),

changes_detected AS (
  SELECT
    *,
    CASE WHEN current_hash != prior_hash THEN 1 ELSE 0 END AS is_change
  FROM customers_with_hashes
),

version_groups AS (
  SELECT
    *,
    SUM(is_change) OVER (PARTITION BY customer_id ORDER BY updated_date) AS version_id
  FROM changes_detected
),

final AS (
  SELECT
    {{ dbt_utils.generate_surrogate_key(['customer_id', 'version_id']) }} AS customer_key,
    customer_id,
    name,
    segment,
    MIN(updated_date) AS dbt_valid_from,
    MAX(updated_date) AS dbt_valid_to,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY updated_date DESC) = 1 AS is_current
  FROM version_groups
  GROUP BY 1, 2, 3, 4, 5  -- All non-date columns
)

SELECT * FROM final
```

**Key Fields for Type 2:**
- `dbt_valid_from`: When this version became active
- `dbt_valid_to`: When this version ended (NULL for current)
- `is_current`: Boolean for easy filtering to current state
- Surrogate key: Unique per version (prevents joins on wrong version)

**Querying Type 2 Dimensions:**
```sql
-- Get current customer segment
SELECT segment FROM dim_customers WHERE customer_id = 123 AND is_current = TRUE

-- Get historical states (when customer changed segments)
SELECT segment, dbt_valid_from, dbt_valid_to 
FROM dim_customers 
WHERE customer_id = 123 
ORDER BY dbt_valid_from
```

### Verification
- Type 2 dimensions have dbt_valid_from, dbt_valid_to, is_current flags
- Surrogate keys used to prevent version confusion in joins
- Tests: No overlapping version windows per entity
- Documentation: Model describes Type 2 and how to query

### Red Flags
- Type 2 without valid_from/valid_to (joins on wrong versions)
- Overlapping versions (customer_id active in 2 versions simultaneously)
- Querying Type 2 without is_current filter (getting multiple versions)
- No documentation on how to join to Type 2 correctly

---

## When to Escalate

**Immediate (Within 1 Hour):**
- Duplicate rows in fact table (data integrity issue)
- Test failures blocking downstream (data quality issue)
- Schema change breaking downstream models

**Daily Stand-Up:**
- Model performance degrading (optimization needed)
- Documentation gaps discovered
- New metric definition conflicts with existing

**Weekly Review:**
- Refactoring opportunities identified
- Metric consistency issues
- Breaking changes needed (plan deprecation)

---

## Hallucination Guard List

❌ Staging model with JOIN and GROUP BY (logic belongs in intermediate)  
❌ Fact table without grain description (ambiguous, prone to joins errors)  
❌ Incremental model without unique_key (duplicates accumulate silently)  
❌ Metric defined only in Tableau (not centralized; shadow analytics)  
❌ Type 2 dimension without dbt_valid_from/dbt_valid_to (version confusion)  
❌ Critical model with no tests or documentation  
❌ Breaking change deployed without deprecation period  
❌ Dimensions and facts mixed in same table (difficult to query)  

---

**Reference**: These standards distill practices from dbt documentation (best practices), Kimball (dimensional modeling), and 5+ years of dbt project retrospectives.
