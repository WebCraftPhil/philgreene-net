# Cursor Agent Rules (Memory + Idempotence)

**Purpose:** Prevent duplicated work, keep a running record of agent activity, and ship changes safely.

These rules apply to ALL automated agents (Cursor, Copilot, Claude, etc.) and human contributors using agent assistance.

---

## 0) Golden Order of Operations
1. **READ MEMORY** → Scan `docs/agents/ledger.json`, `worklog.md`, `journey.md`, and open PRs.
2. **PLAN** → Propose a minimal, testable plan (bullets, ≤10 lines).
3. **DIFF** → Change only what the plan requires. Prefer small PRs.
4. **TEST** → Run lint, typecheck, unit tests, and build.
5. **LOG** → Append a ledger entry (see schema) and include a Task Summary in the commit.

**If similar work already exists with the same intent and inputs → STOP** (do not repeat). Instead: reference prior entry and either reuse or extend.

---

## 1) Memory & Ledger

- **Ledger file:** `docs/agents/ledger.json` (append-only, newest last).
- **Schema:** `docs/agents/ledger.schema.json` (validate on CI).
- **Required fields per entry:**
  - `id`: `YYYYMMDD-HHMM-<slug>` (UTC)
  - `actor`: `"agent:cursor"` or `"human:phil"`
  - `intent`: short string (e.g., `"add blog index pagination"`)
  - `inputs`: hashable inputs or key params (e.g., `{"pageSize": 10}`)
  - `relatedFiles`: list of repo paths changed
  - `status`: `"done" | "skipped-duplicate" | "failed"`
  - `evidence`: commit SHA(s) or PR #, plus test results summary
  - `notes`: 1–3 bullet points (constraints, follow-ups)
  - `fingerprint`: SHA256 of (intent + inputs) to detect duplicates

**Dup check:** Before making changes, compute the `fingerprint` of proposed work and search the ledger; if a matching `done` exists and inputs are unchanged → **skip** and link to that entry.

---

## 2) Planning Rules (Do Less, Ship More)

- Always propose a **Minimal Viable Change** plan (≤10 lines).
- Prefer **single-purpose PRs** over grab-bag commits.
- If touching unfamiliar code, add **1–2 docstrings** or comments.
- If creating new files, place them according to `/Project Structure` in `AGENTS.md`.

---

## 3) Idempotence & Safety

- **Never regenerate files that already exist** unless the plan requires a targeted edit.
- **Search before create:** grep for component/function names and check `docs/agents/ledger.json` for prior art.
- If the task depends on external config/env, update `.env.example` and `README.md`.
- New features must include **one test path** (unit/integration) or explain why not.

---

> This repo uses **Cursor Agent Rules** in `CURSOR_AGENT_RULES.md`. All automated work must:
> 1) read the ledger, 2) plan, 3) diff, 4) test, 5) log.  
> Duplicate work with identical intent/inputs must be skipped.


## 4) Commit Discipline

**Commit message (Conventional Commits + Task Summary):**
