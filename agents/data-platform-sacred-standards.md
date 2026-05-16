# Data Platform Sacred Standards 🔧

**Last Updated**: April 12, 2026  
**Scope**: ETL/ELT pipelines, orchestration, data quality, monitoring, and schema management  
**Enforcement**: All data platform agents reference these sections for reliability, not hope

---

## Section 1: Pipeline Reliability & Idempotency

### The Rule
Idempotent pipelines can be safely rerun. Pipelines that fail silently are worse than pipelines that fail loud.

### What Must Be True

**Idempotency (Foundation):**
- Rerunning pipeline on same input produces identical output
- Use: INSERT (with duplicate key error handling) or INSERT OVERWRITE or MERGE (not append-only)
- Example ✓: `INSERT OVERWRITE TABLE fct_revenue WHERE date = '2026-03-12'` (same run = same result)
- Example ❌: `INSERT INTO TABLE fct_revenue` (rerun = duplicate rows)

**Failure Modes Handled:**
- Upstream data unavailable → Retry with exponential backoff (not immediate failure)
- Downstream table locked → Retry after delay (not fail immediately)
- Timeout on large query → Increment timeout or partition smaller (not stall)
- Network glitch → Retry 3x before escalating

**Loud Failures:**
- Zero rows processed → Alert (not silent success)
- Lateness detected (data arrived >1hr late) → Alert
- Test failures (data quality failures) → Alert and hold pipeline
- Memory errors or timeouts → Alert (not hide in logs)

**Deployment Safety:**
- Every DAG has staging environment test run before production
- Test run uses sample data (10% volume) to catch logic errors early
- Rollback procedure documented: "To revert, run: dbt seed --select previous_ckpt"

### Verification
- DAG code tested in staging with sample data before production
- Idempotent check: Rerun same DAG twice on same data, compare row counts (should match exactly)
- Error handling: Runbook documents retry logic and fallback behavior
- Test mode documented and runnable for any DAG

### Red Flags
- "Pipeline succeeded" with 0 rows loaded (no validation)
- DAG deployed to production without test run
- Retry logic missing (fails once then gives up)
- No distinction between "no data available" vs. "data processing error"
- Rerunning pipeline produces duplicate rows

---

## Section 2: Data Quality Testing & Validation

### The Rule
Test at ingestion (source contract) and after transformation (output contract). Define both explicitly.

### What Must Be True

**Source Validation (Ingestion):**
- Schema check: Expected columns present, correct data types
- Cardinality check: Row count within expected range (±5% typical)
- Uniqueness check: Primary keys unique (no duplicates at source)
- Nullness check: Critical columns have <5% nulls (threshold varies by domain)
- Example: "Daily CRM export should have 10K–12K rows; 0 null values in customer_id"

**Transformation Tests (dbt):**
- Primary key tests: `SELECT pk, COUNT(*) FROM table GROUP BY 1 HAVING COUNT(*) > 1` (should return 0)
- Foreign key tests: No orphaned rows in fact table (all customer_ids exist in dim_customers)
- Referential integrity: Order dates >= customer creation date
- Value range: Revenue amounts > 0; percentages in [0, 100]
- Completeness: <5% nulls in critical columns

**Anomaly Detection:**
- Row count anomalies: If daily total drops >20%, investigate
- Distribution shift: Compare today's values to 30-day rolling average
- Freshness monitoring: Alert if data older than expected refresh window

### Verification
- Data quality tests written in SQL or dbt (not manual spotchecks)
- Tests run before/after every transformation
- Test results logged and monitored (failures block downstream)
- Schema change detection: Alert if columns added/removed
- Baseline expectations documented (row count range, null tolerance)

### Red Flags
- "Data looks good" (manual eyeball, not automated tests)
- Data quality tests exist but don't run before pipeline
- Test failures ignored; pipeline continues anyway
- No nullness/uniqueness/referential checks
- No alerting on data freshness

---

## Section 3: Monitoring, SLAs & Observability

### The Rule
Unmonitored pipelines fail silently. Define SLAs. Monitor everything. Alert on deviations.

### What Must Be True

**SLA Definition:**
- Refresh schedule: "Daily 9 PM UTC"
- Completion window: "Must complete by 6 AM UTC" (9 hours)
- Acceptable lateness: "Alert if not complete by 7 AM UTC"
- Maximum downtime: "99% uptime = 7 hours outage/year allowed"
- Example SLA doc: "daily_revenue pipeline: 9 PM → 6 AM, 99.9% uptime, max 1-hour lateness"

**Monitoring Metrics:**
- Pipeline duration: Track over time; alert if >baseline + 50%
- Row counts: Daily row count graph; alert on drops >20% or spikes >50%
- Data freshness: "Last successful load: 3 hours ago" (should be <24 hours)
- Data quality test pass rate: Chart % tests passing; alert if any fail
- Execution lateness: Days when pipeline completed late; track SLA compliance %
- Warehouse cost: Query costs per pipeline; budget alerts

**Alerting Thresholds:**
- Critical: Pipeline not complete by SLA deadline → Immediate alert
- High: Data quality test failure → Immediate alert
- Medium: Pipeline duration >1.5x baseline → Alert (investigate optimization)
- Low: Warehouse cost spike → Alert (review for optimization)

**Dashboard & Observability:**
- Central monitoring dashboard: All pipelines, SLA status, recent failures
- Drill-down capabilities: View detailed logs for failed runs
- Runbooks: Each pipeline has runbook for "pipeline delayed" or "tests failed"
- Alerting channels: Slack for real-time, email for daily summary

### Verification
- SLA document exists for every production pipeline
- Monitoring dashboard shows all pipelines + SLA status
- Alerts configured for SLA breach, test failures, cost anomalies
- At least 2-week history of run times, row counts, test results
- Runbook exists for each pipeline

### Red Flags
- "SLA is just 'whenever it finishes'"
- No monitoring dashboard (discover failures from user complaints)
- Tests fail but pipeline continues
- Warehouse costs rising but no visibility why
- No alerting; only manual log reviews

---

## Section 4: Schema Evolution & Lineage

### The Rule
Schema changes break downstream systems. Plan for evolution. Track lineage.

### What Must Be True

**Backwards-Compatible Changes:**
- Adding optional columns: OK (downstream doesn't require it)
- Adding NOT NULL columns: Add with default value first, then backfill, then enforce constraint
- Renaming columns: Create new column first; deprecate old over 2 versions; remove at v3
- Changing data type: Validate conversion values safe (int→bigint OK, string→int risky)

**Breaking Changes (Rare, Planned):**
- Column removal: Announce 2 versions ahead; document downstream impact
- Column rename: Use deprecation glue (create both old + new names for N weeks)
- Data type change: Conversion required; communicate new format to downstream teams

**Lineage Tracking:**
- Document source→table→downstream relationships
- Example: "raw.salesforce_accounts → stg_accounts → dim_accounts → dashboard_revenue"
- Handle: Identify all consumers if upstream changes
- dbt `source()` and `ref()` enforce lineage in code

**Schema Registry (Optional but Recommended):**
- Confluent Schema Registry or equivalent for real-time
- Prevents breaking schema changes from shipping
- Example: "New schema version must be compatible with previous 2 versions"

### Verification
- Schema changes documented in git (not ad-hoc)
- dbt sources and refs used to enforce lineage
- Backwards compatibility verified before deployment
- Downstream impact analysis for non-backwards-compatible changes
- 2-week deprecation notice for breaking changes

### Red Flags
- Column dropped without downstream notification
- Data type changed (int→string) breaking downstream code
- No lineage tracking; don't know which dashboards depend on which tables
- "Renaming column is simple" (breaks all downstream SQL)

---

## Section 5: Cost Optimization & Performance

### The Rule
Unoptimized warehouses cost exponentially. Monitor cost. Optimize before it's a crisis.

### What Must Be True

**Query Optimization:**
- Incremental loads: Don't reprocess all history daily (partition + incremental strategy)
- Pruning: Use date filters to minimize table scan
- Aggregation early: Roll up facts before joining dimensions
- Caching: Pre-aggregate common queries

**Partitioning Strategy:**
- Partition large tables by date (query filters almost always include date)
- Example: `fct_events PARTITIONED BY date` (saves 90% on date-filtered queries)
- Partition pruning: Query engine skips partitions not matching filter

**Cost Monitoring & Alerts:**
- Track warehouse cost per pipeline
- Alert if query costs >$100 (investigate)
- Budget allocation: "Analytics team: $10K/month limit" with alerts at 80%
- Monthly review: Which pipelines/dashboards are most expensive?

**Performance Tuning:**
- Target: 95th percentile query latency <5 seconds
- Monitor slow-query log; optimize top 20% of expensive queries
- Re-analyze statistics on large tables (BigQuery/Redshift)
- Test with production workload volume (100 rows ≠ 100M rows)

### Verification
- Cost dashboard shows cost per pipeline, per team, per query
- Budget alerts configured; reviewed monthly
- Slow query logs analyzed; top queries optimized
- Cardinality estimates checked (actual vs. expected rows returned)

### Red Flags
- "Warehouse costs unexplained" (no visibility)
- Running same unoptimized query 100x/day
- Full table scan on billion-row table (no partition pruning)
- Queries taking 10+ minutes (debugging needed, not just acceptance)

---

## Disaster Recovery & Rollback

### The Rule
Backups are insurance. Test them. Rollback procedures are muscle memory.

### What Must Be True

**Backup & Recovery:**
- Daily snapshots of critical tables (recoverable to yesterday)
- Recovery procedure tested monthly (not "we hope it works")
- RTO (Recovery Time Objective): How fast to restore? (typical: 1–4 hours)
- RPO (Recovery Point Objective): How much data loss OK? (typical: 24 hours = 1 day)

**Rollback Procedures:**
- Data rollback: Documented steps to revert bad data (e.g., "dbt seed --select previous_version")
- Pipeline rollback: Previous DAG version can be restored within 1 hour
- Schema rollback: Old column definitions preserved (not deleted immediately)

### Verification
- Backup test run monthly; time to restore documented
- Rollback runbook exists for each critical pipeline
- RTO/RPO defined and meets business needs

---

## When to Escalate

**Immediate (Within 1 Hour):**
- SLA breach: Pipeline not complete by deadline
- Data quality test failure (data unusable downstream)
- Warehouse outage (no queries possible)

**Daily Stand-Up:**
- Pipeline slow (>1.5x baseline but completed)
- Cost spike detected
- Schema issue discovered

**Weekly Review:**
- Performance trending down (optimization needed)
- Cost exceeding budget
- New data quality issues

---

## Hallucination Guard List

❌ "Pipeline succeeded" with zero rows (no validation)  
❌ "Data quality is fine" (manual spotcheck, not automated tests)  
❌ Rerunning pipeline produces different row counts (not idempotent)  
❌ "Drop column, nobody uses it" (no downstream impact analysis)  
❌ Warehouse cost unknown (no monitoring)  
❌ Pipeline delayed but no alert fired  
❌ "Full table scan is fine" (kills performance on large tables)  
❌ Backup never tested (won't work in emergency)  

---

**Reference**: These standards distill practices from Airflow (orchestration), dbt (testing), AWS/GCP/Snowflake (best practices), and 10+ years of pipeline incident reports.
