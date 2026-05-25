# PMF Radar Skill Package Implementation Plan

> Superseded note: this plan captured the earlier PM0-style generated harness-copy implementation. The current implementation follows the Hallmark-style package shape: top-level `SKILL.md`, top-level `references/`, optional `commands/` and `examples/`, and `package.json` `skill` metadata installable with `npx skills add KDotIndustries/pmf-radar`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build PMF Radar as a PM0-style open-source, instruction-only market-evidence skill package.

**Architecture:** Keep `skills/pmf-radar/` as the canonical source. Package metadata, README, optional command, examples, content-contract tests, and generated harness copies wrap that canonical skill for cross-harness use.

**Tech Stack:** Markdown skill files, Node.js ESM, Node built-in test runner, package/plugin JSON manifests.

---

## File Structure

- Create `package.json`: package metadata and test/sync scripts.
- Create `README.md`: founder-facing package documentation.
- Create `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`: PM0-style plugin manifests.
- Create `skills/pmf-radar/SKILL.md`: canonical skill entrypoint and routing.
- Create `skills/pmf-radar/references/output-templates.md`: report structures for all three modes.
- Create `skills/pmf-radar/references/scoring-rubric.md`: dimensions, scoring guidance, verdict labels.
- Create `skills/pmf-radar/references/source-playbook.md`: source buckets and source quality rules.
- Create `skills/pmf-radar/references/search-patterns.md`: reusable search query patterns.
- Create `skills/pmf-radar/references/validation-tests.md`: real-world validation strength rules.
- Create `skills/pmf-radar/references/red-flags.md`: kill, park, research-more, and regulated-market risks.
- Create `commands/validate-idea.md`: optional command wrapper.
- Create `examples/travel-assistant-input.md`, `examples/freelancer-invoice-chaser-input.md`, `examples/sample-output.md`: approachable examples.
- Create `scripts/sync-harness-skills.mjs`: copy canonical skill into harness directories.
- Create harness copies under `.agents`, `.claude`, `.cursor`, `.gemini`, `.github`, `.kiro`, `.opencode`, `.pi`, `.qoder`, `.rovodev`, `.trae-cn`, and `.trae`.
- Create `tests/skill-content.test.mjs`: content-contract tests.

## Task 1: Package Baseline And Required File Contract

**Files:**
- Create: `package.json`
- Create: `tests/skill-content.test.mjs`

- [ ] **Step 1: Write the failing required-file test**

Create `tests/skill-content.test.mjs` with this initial content:

```js
import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function exists(relativePath) {
  await access(path.join(root, relativePath));
}

test("PMF Radar package exposes required v1 files", async () => {
  for (const file of [
    "README.md",
    "LICENSE",
    "package.json",
    ".codex-plugin/plugin.json",
    ".claude-plugin/plugin.json",
    ".cursor-plugin/plugin.json",
    "commands/validate-idea.md",
    "examples/travel-assistant-input.md",
    "examples/freelancer-invoice-chaser-input.md",
    "examples/sample-output.md",
    "scripts/sync-harness-skills.mjs",
    "skills/pmf-radar/SKILL.md",
    "skills/pmf-radar/references/output-templates.md",
    "skills/pmf-radar/references/scoring-rubric.md",
    "skills/pmf-radar/references/source-playbook.md",
    "skills/pmf-radar/references/search-patterns.md",
    "skills/pmf-radar/references/validation-tests.md",
    "skills/pmf-radar/references/red-flags.md"
  ]) {
    await exists(file);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/*.test.mjs
```

Expected: FAIL with missing `package.json`, plugin manifest, command, example, script, or skill file errors.

- [ ] **Step 3: Add package metadata**

Create `package.json`:

```json
{
  "name": "pmf-radar",
  "version": "0.1.0",
  "type": "module",
  "private": false,
  "description": "Market-evidence research skill for founders and AI builders.",
  "license": "MIT",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "sync:harnesses": "node scripts/sync-harness-skills.mjs"
  },
  "keywords": [
    "skills",
    "founders",
    "market-research",
    "product-market-fit",
    "startup"
  ]
}
```

- [ ] **Step 4: Add temporary empty required files**

Create the required directories and empty files from Step 1. This step is only to establish the file tree before content-specific tests are added:

```text
.codex-plugin/plugin.json
.claude-plugin/plugin.json
.cursor-plugin/plugin.json
commands/validate-idea.md
examples/travel-assistant-input.md
examples/freelancer-invoice-chaser-input.md
examples/sample-output.md
scripts/sync-harness-skills.mjs
skills/pmf-radar/SKILL.md
skills/pmf-radar/references/output-templates.md
skills/pmf-radar/references/scoring-rubric.md
skills/pmf-radar/references/source-playbook.md
skills/pmf-radar/references/search-patterns.md
skills/pmf-radar/references/validation-tests.md
skills/pmf-radar/references/red-flags.md
```

- [ ] **Step 5: Run test to verify it passes**

Run:

```bash
npm test
```

Expected: PASS for the required-file test.

- [ ] **Step 6: Commit**

```bash
git add package.json tests/skill-content.test.mjs .codex-plugin .claude-plugin .cursor-plugin commands examples scripts skills
git commit -m "test: add PMF Radar package file contract"
```

## Task 2: README And Plugin Metadata

**Files:**
- Modify: `tests/skill-content.test.mjs`
- Modify: `README.md`
- Modify: `.codex-plugin/plugin.json`
- Modify: `.claude-plugin/plugin.json`
- Modify: `.cursor-plugin/plugin.json`

- [ ] **Step 1: Add README and manifest tests**

Append these tests to `tests/skill-content.test.mjs`:

```js
test("README states positioning, workflow, modes, and validation boundary", async () => {
  const readme = await read("README.md");

  assert.match(readme, /PMF Radar/);
  assert.match(readme, /market evidence/i);
  assert.match(readme, /Office Hours = clarity\./);
  assert.match(readme, /PMF Radar = evidence\./);
  assert.match(readme, /Customers = validation\./);
  assert.match(readme, /Pre-build market signal scan/);
  assert.match(readme, /Comparative radar/);
  assert.match(readme, /Post-MVP PMF diagnosis/);
  assert.match(readme, /Exa/i);
  assert.match(readme, /optional/i);
  assert.match(readme, /does not validate/i);
  assert.doesNotMatch(readme, /validate your idea instantly/i);
  assert.doesNotMatch(readme, /know if your startup will work/i);
});

test("plugin manifests describe PMF Radar without validation overclaims", async () => {
  for (const file of [
    ".codex-plugin/plugin.json",
    ".claude-plugin/plugin.json",
    ".cursor-plugin/plugin.json"
  ]) {
    const manifest = JSON.parse(await read(file));
    assert.equal(manifest.name, "pmf-radar");
    assert.equal(manifest.version, "0.1.0");
    assert.match(manifest.description, /market-evidence/i);
    assert.match(manifest.skills, /skills/);
    assert.doesNotMatch(JSON.stringify(manifest), /validator/i);
  }
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test
```

Expected: FAIL because `README.md` and plugin manifests do not yet contain required content.

- [ ] **Step 3: Write README**

Replace `README.md` with sections using this structure and required language:

```markdown
# PMF Radar

An open-source market-evidence skill for founders: scan complaints, workarounds, competitors, and buyer signals before you build.

PMF Radar scans for market pull. It does not validate an idea, prove PMF, or replace customer conversations.

## Recommended Workflow

1. Run GStack Office Hours or another founder pressure-test to clarify the idea, target user, status quo, and narrowest wedge.
2. Run PMF Radar to scan public market evidence.
3. Run a real validation test: customer interviews, paid pilots, LOIs, waitlists, usage tests, or actual payment.

Office Hours = clarity.
PMF Radar = evidence.
Customers = validation.

## Modes

### Pre-build market signal scan

Use this when the idea has no product or little customer data. PMF Radar produces `PMF_RADAR.md`.

### Comparative radar

Use this when comparing multiple ideas or verticals. PMF Radar produces `PMF_COMPARISON.md`.

### Post-MVP PMF diagnosis

Use this when there is a product, users, revenue, usage, interviews, support tickets, or churn data. PMF Radar produces `PMF_DIAGNOSIS.md`.

## Search Providers

Use Exa if available. Otherwise use the agent's normal web search, web fetch, browser search, or user-provided links and snippets. Exa is optional.

## Examples

- `examples/travel-assistant-input.md`
- `examples/freelancer-invoice-chaser-input.md`
- `examples/sample-output.md`

## Install

Install with a skills-aware package manager when available, or copy `skills/pmf-radar` into your agent's skills directory.

This package also includes PM0-style harness copies for agents that discover skills from repo-local dot-directories.

## Limitations

PMF Radar uses public and user-provided evidence. It does not bypass paywalls, scrape private communities, use leaked data, collect sensitive personal information, or expose user PII.
```

- [ ] **Step 4: Write plugin manifests**

Use these exact shapes, changing only repository URLs later if the owner/name differs.

`.codex-plugin/plugin.json`:

```json
{
  "name": "pmf-radar",
  "version": "0.1.0",
  "description": "Market-evidence research for founders: complaints, workarounds, competitors, buyer signals, and validation tests.",
  "author": {
    "name": "PMF Radar"
  },
  "homepage": "https://github.com/omarkhatib/pmf-radar",
  "repository": "https://github.com/omarkhatib/pmf-radar",
  "license": "MIT",
  "keywords": [
    "market-evidence",
    "skills",
    "founders",
    "startup",
    "research"
  ],
  "skills": "./.agents/skills/",
  "interface": {
    "displayName": "PMF Radar",
    "shortDescription": "Market-evidence research before founders build",
    "longDescription": "Use PMF Radar to scan complaints, workarounds, competitors, buyer signals, source quality, and practical validation tests before deciding what to test next.",
    "developerName": "PMF Radar",
    "category": "Coding",
    "capabilities": [
      "Interactive",
      "Read",
      "Write"
    ],
    "defaultPrompt": [
      "Run PMF Radar on a travel assistant AI agent",
      "Compare verticals for this startup idea"
    ],
    "websiteURL": "https://github.com/omarkhatib/pmf-radar",
    "brandColor": "#0F766E",
    "screenshots": []
  }
}
```

`.claude-plugin/plugin.json`:

```json
{
  "name": "pmf-radar",
  "description": "Market-evidence research for founders: complaints, workarounds, competitors, buyer signals, and validation tests.",
  "version": "0.1.0",
  "author": {
    "name": "PMF Radar"
  },
  "homepage": "https://github.com/omarkhatib/pmf-radar",
  "repository": "https://github.com/omarkhatib/pmf-radar",
  "license": "MIT",
  "keywords": [
    "market-evidence",
    "skills",
    "founders",
    "startup",
    "research"
  ],
  "skills": "./.claude/skills/"
}
```

`.cursor-plugin/plugin.json`:

```json
{
  "name": "pmf-radar",
  "description": "Market-evidence research for founders: complaints, workarounds, competitors, buyer signals, and validation tests.",
  "version": "0.1.0",
  "author": {
    "name": "PMF Radar"
  },
  "homepage": "https://github.com/omarkhatib/pmf-radar",
  "repository": "https://github.com/omarkhatib/pmf-radar",
  "license": "MIT",
  "keywords": [
    "market-evidence",
    "skills",
    "founders",
    "startup",
    "research"
  ],
  "skills": "./.cursor/skills/"
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run:

```bash
npm test
```

Expected: PASS for README and manifest tests.

- [ ] **Step 6: Commit**

```bash
git add README.md .codex-plugin/plugin.json .claude-plugin/plugin.json .cursor-plugin/plugin.json tests/skill-content.test.mjs
git commit -m "docs: add PMF Radar package metadata"
```

## Task 3: Canonical Skill Entry Point

**Files:**
- Modify: `tests/skill-content.test.mjs`
- Modify: `skills/pmf-radar/SKILL.md`

- [ ] **Step 1: Add SKILL.md contract tests**

Append:

```js
test("SKILL.md routes PMF Radar modes and tool fallback", async () => {
  const skill = await read("skills/pmf-radar/SKILL.md");

  assert.match(skill, /^---\nname: pmf-radar\n/m);
  assert.match(skill, /market evidence/i);
  assert.match(skill, /complaints/i);
  assert.match(skill, /workarounds/i);
  assert.match(skill, /competitor/i);
  assert.match(skill, /buyer signals/i);
  assert.match(skill, /Pre-build market signal scan/);
  assert.match(skill, /Comparative radar/);
  assert.match(skill, /Post-MVP PMF diagnosis/);
  assert.match(skill, /Use Exa if available/i);
  assert.match(skill, /normal web search/i);
  assert.match(skill, /user-provided links/i);
  assert.match(skill, /too broad for evidence research/i);
  assert.match(skill, /The report is not validation/i);
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: FAIL because `SKILL.md` has no frontmatter or routing content.

- [ ] **Step 3: Write `SKILL.md`**

Replace `skills/pmf-radar/SKILL.md` with:

```markdown
---
name: pmf-radar
description: Use when the user asks for startup idea research, market evidence, product-market-fit signals, complaint mining, workaround discovery, competitor weakness research, buyer-signal research, vertical comparison, or post-MVP PMF diagnosis before deciding what to test or build.
---

PMF Radar is a market evidence workflow. The report is not validation. It is evidence to decide what to validate next.

## Core Boundary

Never claim that PMF Radar validates an idea, proves product-market fit, or predicts startup success. Customers create validation through interviews, paid pilots, LOIs, usage, referrals, repeat purchase, or actual payment.

If the input is too broad, say:

```text
This idea is too broad for evidence research. Run Office Hours first or narrow the wedge.
```

Then ask for the narrowest target user, workflow, buyer, and current workaround.

## Mode Selection

- **Pre-build market signal scan:** use when the idea has no product or little customer data. Produce `PMF_RADAR.md`.
- **Comparative radar:** use when comparing multiple ideas or verticals. Produce `PMF_COMPARISON.md`.
- **Post-MVP PMF diagnosis:** use when the user has product, usage, revenue, analytics, interviews, support, churn, or sales-objection evidence. Produce `PMF_DIAGNOSIS.md`.

## Tool Use

Use Exa if available. Otherwise use the agent's normal web search, web fetch, browser search, or generic search. If no search is available, ask the user for links, snippets, reports, review pages, forum threads, support summaries, interview notes, analytics, or pasted evidence.

Use only public sources or user-provided materials. Do not bypass paywalls, scrape private communities, use leaked data, collect sensitive personal information, or expose user PII.

## Reference Loading

Read only the references needed for the selected mode:

- `references/output-templates.md` for required report shape.
- `references/source-playbook.md` before evidence gathering.
- `references/search-patterns.md` before building queries.
- `references/scoring-rubric.md` before scoring or choosing verdicts.
- `references/validation-tests.md` before recommending next validation steps.
- `references/red-flags.md` before final recommendation.

## Evidence Rules

Rank evidence by strength. Repeated complaints, existing spend, bad reviews, hiring, direct buyer quotes, urgent workflow pain, and proof of frequency carry more weight than generic TAM, trend claims, social likes, or AI-generated reports.

Quote sparingly. Summarize primarily. Include links where available. Mark weak, uncertain, stale, inferred, or contradictory evidence explicitly.
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: PASS for SKILL.md routing tests.

- [ ] **Step 5: Commit**

```bash
git add skills/pmf-radar/SKILL.md tests/skill-content.test.mjs
git commit -m "feat: add PMF Radar skill entrypoint"
```

## Task 4: Reference Files And Output Templates

**Files:**
- Modify: `tests/skill-content.test.mjs`
- Modify: `skills/pmf-radar/references/output-templates.md`
- Modify: `skills/pmf-radar/references/scoring-rubric.md`
- Modify: `skills/pmf-radar/references/source-playbook.md`
- Modify: `skills/pmf-radar/references/search-patterns.md`
- Modify: `skills/pmf-radar/references/validation-tests.md`
- Modify: `skills/pmf-radar/references/red-flags.md`

- [ ] **Step 1: Add reference contract tests**

Append:

```js
test("references include required output templates and verdict labels", async () => {
  const output = await read("skills/pmf-radar/references/output-templates.md");
  const scoring = await read("skills/pmf-radar/references/scoring-rubric.md");

  for (const artifact of ["PMF_RADAR.md", "PMF_COMPARISON.md", "PMF_DIAGNOSIS.md"]) {
    assert.match(output, new RegExp(artifact.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const label of ["Build now", "Run paid test", "Research more", "Park", "Kill", "Internal tool only"]) {
    assert.match(scoring, new RegExp(label));
  }

  for (const dimension of [
    "Pain intensity",
    "Frequency",
    "Buyer clarity",
    "Existing spend",
    "Workaround ugliness",
    "Competitive gap",
    "Distribution accessibility",
    "MVP feasibility",
    "AI advantage",
    "Trust/compliance risk",
    "Founder-market fit",
    "Speed to paid test"
  ]) {
    assert.match(scoring, new RegExp(dimension.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("references include source, search, validation, and red-flag guidance", async () => {
  const source = await read("skills/pmf-radar/references/source-playbook.md");
  const search = await read("skills/pmf-radar/references/search-patterns.md");
  const validation = await read("skills/pmf-radar/references/validation-tests.md");
  const redFlags = await read("skills/pmf-radar/references/red-flags.md");

  for (const term of ["Reddit", "G2", "Capterra", "GitHub issues", "pricing pages", "job posts", "communities"]) {
    assert.match(source, new RegExp(term, "i"));
  }

  for (const pattern of ["takes too long", "spreadsheet template", "pricing", "alternative", "community", "won't pay"]) {
    assert.match(search, new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }

  for (const term of ["paid pilot", "LOI", "waitlist", "detailed interview", "friends say it is cool"]) {
    assert.match(validation, new RegExp(term, "i"));
  }

  for (const term of ["Kill", "Park", "Internal tool only", "regulated markets", "healthcare", "finance", "legal"]) {
    assert.match(redFlags, new RegExp(term, "i"));
  }
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: FAIL because reference files are empty.

- [ ] **Step 3: Write `output-templates.md`**

Use the three templates from `docs/PRD_PMF_Radar_Open_Source_Skill.md` sections 15, 16, and 17. Preserve all Mode A headings from `# PMF Radar: [Idea Name]` through `## 16. Search log`, all Mode B headings from `# PMF Comparison: [Theme]` through `## 6. Evidence gaps`, and all Mode C headings from `# PMF Diagnosis: [Product Name]` through `## 11. Final recommendation`.

- [ ] **Step 4: Write `scoring-rubric.md`**

Include:

```markdown
# Scoring Rubric

Scores are 1 to 5 judgment aids. Do not blindly average them.

## Verdict Labels

- Build now
- Run paid test
- Research more
- Park
- Kill
- Internal tool only

## Dimensions

| Dimension | Meaning |
|---|---|
| Pain intensity | Is the pain severe or just annoying? |
| Frequency | Does it happen daily/weekly or rarely? |
| Buyer clarity | Is there an obvious buyer or economic owner? |
| Existing spend | Are people already paying for tools, staff, agencies, or workarounds? |
| Workaround ugliness | Are current solutions manual, fragmented, expensive, or hated? |
| Competitive gap | Are existing tools weak, overpriced, complex, or incomplete? |
| Distribution accessibility | Can the founder reach buyers directly? |
| MVP feasibility | Can a useful version be tested in 1-2 weeks? |
| AI advantage | Does AI change the economics or workflow meaningfully? |
| Trust/compliance risk | Is the idea burdened by regulation, safety, privacy, or trust issues? Reverse-score this. |
| Founder-market fit | Does the founder have relevant experience, access, or insight? |
| Speed to paid test | Can the founder ask for payment, LOI, or pilot quickly? |
```

- [ ] **Step 5: Write remaining references**

Populate the remaining files using the PRD source sections:

- `source-playbook.md`: PRD sections 8, 9, 10, 12, and 19.
- `search-patterns.md`: PRD section 11.
- `validation-tests.md`: PRD section 18.
- `red-flags.md`: PRD sections 13, 18, and 19, with concrete red flags for each verdict.

Keep each reference concise, use headings, and do not duplicate full report templates outside `output-templates.md`.

- [ ] **Step 6: Run tests to verify they pass**

```bash
npm test
```

Expected: PASS for reference tests.

- [ ] **Step 7: Commit**

```bash
git add skills/pmf-radar/references tests/skill-content.test.mjs
git commit -m "feat: add PMF Radar research references"
```

## Task 5: Optional Command And Examples

**Files:**
- Modify: `tests/skill-content.test.mjs`
- Modify: `commands/validate-idea.md`
- Modify: `examples/travel-assistant-input.md`
- Modify: `examples/freelancer-invoice-chaser-input.md`
- Modify: `examples/sample-output.md`

- [ ] **Step 1: Add command and example tests**

Append:

```js
test("optional command and examples preserve evidence boundary", async () => {
  const command = await read("commands/validate-idea.md");
  const travel = await read("examples/travel-assistant-input.md");
  const invoice = await read("examples/freelancer-invoice-chaser-input.md");
  const sample = await read("examples/sample-output.md");

  assert.match(command, /evidence research/i);
  assert.match(command, /does not validate/i);
  assert.match(command, /PMF Radar/i);
  assert.match(travel, /travel assistant/i);
  assert.match(travel, /AI agent/i);
  assert.match(invoice, /freelancer/i);
  assert.match(invoice, /invoice/i);
  assert.match(sample, /PMF Radar:/);
  assert.match(sample, /Verdict/);
  assert.match(sample, /Research more|Run paid test|Park/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: FAIL because command and example files are empty.

- [ ] **Step 3: Write `commands/validate-idea.md`**

```markdown
# /validate-idea

Run PMF Radar evidence research for a startup idea. This command does not validate the idea by itself.

## Input

Accept one of:

- a raw startup idea
- an Office Hours memo
- multiple ideas or verticals to compare
- post-MVP usage, revenue, interview, support, churn, or sales evidence

## Routing

- Raw idea: use PMF Radar Mode A and produce `PMF_RADAR.md`.
- Multiple ideas or verticals: use Mode B and produce `PMF_COMPARISON.md`.
- Existing product evidence: use Mode C and produce `PMF_DIAGNOSIS.md`.

If the idea is too broad, ask for the target user, workflow, buyer, and current workaround before researching.
```

- [ ] **Step 4: Write input examples**

`examples/travel-assistant-input.md`:

```markdown
# Travel Assistant AI Agent Input

Idea: An AI agent that plans and updates personal travel itineraries.

Target user: Busy professionals who travel several times per year for work and personal trips.

Workflow: Choose flights and hotels, coordinate dates, track reservations, adjust plans when flights change, and keep the itinerary useful on the trip.

Current workaround: Google Flights, hotel sites, calendar, email confirmations, notes apps, travel blogs, and manual re-planning.

Question for PMF Radar: Is there evidence that this is painful enough to pay for, or is this mostly a convenience feature?
```

`examples/freelancer-invoice-chaser-input.md`:

```markdown
# Freelancer Invoice Chaser Input

Idea: An AI assistant that follows up on overdue freelancer invoices and prepares polite escalation messages.

Target user: Independent freelancers and small agencies with 5-50 active clients per year.

Workflow: Track sent invoices, identify late payments, write follow-up emails, escalate without damaging the client relationship, and reconcile payment status.

Current workaround: Spreadsheets, accounting software reminders, calendar reminders, manual email follow-ups, and awkward personal messages.

Question for PMF Radar: Is this a standalone business, a feature inside invoicing software, or an internal tool?
```

- [ ] **Step 5: Write sample output**

Use a compact Mode A sample for the travel assistant. It must include these headings:

```markdown
# PMF Radar: Travel Assistant AI Agent

## 1. Verdict

Research more.

## 2. Idea in one sentence

An AI agent that maintains a personal travel itinerary and helps re-plan when bookings, timing, or preferences change.

## 3. Target customer and buyer

The likely user is a frequent traveler. The buyer is unclear unless this is sold to business travelers, executive assistants, travel advisors, or companies managing frequent employee travel.

## 4. Assumptions being tested

- Pain: itinerary changes are frequent and stressful.
- Buyer: travelers will pay outside existing travel platforms.
- Spend: users already pay for planning help or premium travel tools.

## 5. Pain evidence

| Evidence | Source | Signal strength | Interpretation |
|---|---|---:|---|
| Add real source summary here after running PMF Radar. | Source link | Medium | Treat as evidence, not validation. |

## 15. Final recommendation

Run interviews with frequent travelers and compare against a narrower business-travel or travel-advisor wedge.
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npm test
```

Expected: PASS for command and example tests.

- [ ] **Step 7: Commit**

```bash
git add commands examples tests/skill-content.test.mjs
git commit -m "docs: add PMF Radar command and examples"
```

## Task 6: Harness Sync Script And Generated Copies

**Files:**
- Modify: `tests/skill-content.test.mjs`
- Modify: `scripts/sync-harness-skills.mjs`
- Create: `.agents/skills/pmf-radar/*`
- Create: `.claude/skills/pmf-radar/*`
- Create: `.cursor/skills/pmf-radar/*`
- Create: `.gemini/skills/pmf-radar/*`
- Create: `.github/skills/pmf-radar/*`
- Create: `.kiro/skills/pmf-radar/*`
- Create: `.opencode/skills/pmf-radar/*`
- Create: `.pi/skills/pmf-radar/*`
- Create: `.qoder/skills/pmf-radar/*`
- Create: `.rovodev/skills/pmf-radar/*`
- Create: `.trae-cn/skills/pmf-radar/*`
- Create: `.trae/skills/pmf-radar/*`

- [ ] **Step 1: Add harness sync tests**

Append:

```js
async function listFilesRecursive(relativeDir) {
  const absoluteDir = path.join(root, relativeDir);
  const entries = await readdir(absoluteDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const child = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFilesRecursive(child));
    } else {
      files.push(child);
    }
  }

  return files.sort();
}

test("harness skill copies match canonical PMF Radar skill", async () => {
  const canonicalFiles = await listFilesRecursive("skills/pmf-radar");
  const targets = [
    ".agents/skills/pmf-radar",
    ".claude/skills/pmf-radar",
    ".cursor/skills/pmf-radar",
    ".gemini/skills/pmf-radar",
    ".github/skills/pmf-radar",
    ".kiro/skills/pmf-radar",
    ".opencode/skills/pmf-radar",
    ".pi/skills/pmf-radar",
    ".qoder/skills/pmf-radar",
    ".rovodev/skills/pmf-radar",
    ".trae-cn/skills/pmf-radar",
    ".trae/skills/pmf-radar"
  ];

  for (const target of targets) {
    const targetFiles = await listFilesRecursive(target);
    assert.deepEqual(
      targetFiles.map((file) => file.replace(`${target}/`, "")),
      canonicalFiles.map((file) => file.replace("skills/pmf-radar/", ""))
    );

    for (const canonicalFile of canonicalFiles) {
      const relative = canonicalFile.replace("skills/pmf-radar/", "");
      assert.equal(
        await read(path.join(target, relative)),
        await read(canonicalFile),
        `${target}/${relative} differs from canonical skill`
      );
    }
  }
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: FAIL because harness copies do not exist.

- [ ] **Step 3: Write sync script**

Replace `scripts/sync-harness-skills.mjs` with:

```js
import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const targets = [
  ".agents/skills/pmf-radar",
  ".claude/skills/pmf-radar",
  ".cursor/skills/pmf-radar",
  ".gemini/skills/pmf-radar",
  ".github/skills/pmf-radar",
  ".kiro/skills/pmf-radar",
  ".opencode/skills/pmf-radar",
  ".pi/skills/pmf-radar",
  ".qoder/skills/pmf-radar",
  ".rovodev/skills/pmf-radar",
  ".trae-cn/skills/pmf-radar",
  ".trae/skills/pmf-radar"
];

const source = path.join(process.cwd(), "skills", "pmf-radar");

for (const target of targets) {
  const destination = path.join(process.cwd(), target);
  await mkdir(path.dirname(destination), { recursive: true });
  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { recursive: true });
  console.log(`synced ${target}`);
}
```

- [ ] **Step 4: Run sync script**

```bash
npm run sync:harnesses
```

Expected: prints `synced ...` for all 12 harness targets.

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test
```

Expected: PASS for harness sync tests.

- [ ] **Step 6: Commit**

```bash
git add scripts/sync-harness-skills.mjs .agents .claude .cursor .gemini .github .kiro .opencode .pi .qoder .rovodev .trae-cn .trae tests/skill-content.test.mjs
git commit -m "build: add PMF Radar harness skill copies"
```

## Task 7: Overclaim Guardrails And Final Content Tightening

**Files:**
- Modify: `tests/skill-content.test.mjs`
- Modify: `README.md`
- Modify: `skills/pmf-radar/SKILL.md`
- Modify: `skills/pmf-radar/references/*.md`
- Modify: `commands/validate-idea.md`
- Modify: `examples/*.md`

- [ ] **Step 1: Add forbidden-language and safety tests**

Append:

```js
test("package avoids PMF validation overclaims and unsafe source handling", async () => {
  const files = [
    "README.md",
    "commands/validate-idea.md",
    "examples/travel-assistant-input.md",
    "examples/freelancer-invoice-chaser-input.md",
    "examples/sample-output.md",
    "skills/pmf-radar/SKILL.md",
    ...(await listFilesRecursive("skills/pmf-radar/references"))
  ];

  for (const file of files) {
    const text = await read(file);
    assert.doesNotMatch(text, /Idea Validator/i, file);
    assert.doesNotMatch(text, /Market Validator/i, file);
    assert.doesNotMatch(text, /PMF Validator/i, file);
    assert.doesNotMatch(text, /Validate your idea instantly/i, file);
    assert.doesNotMatch(text, /Know if your startup will work/i, file);
    assert.doesNotMatch(text, /Get a score and start building/i, file);
  }

  const safety = [
    await read("README.md"),
    await read("skills/pmf-radar/SKILL.md"),
    await read("skills/pmf-radar/references/source-playbook.md")
  ].join("\n");

  assert.match(safety, /public/i);
  assert.match(safety, /user-provided/i);
  assert.match(safety, /paywalls/i);
  assert.match(safety, /private communities/i);
  assert.match(safety, /PII/i);
});
```

- [ ] **Step 2: Run tests**

```bash
npm test
```

Expected: PASS. If FAIL, edit the named file to remove overclaiming language or add missing safety guidance.

- [ ] **Step 3: Re-run harness sync after content edits**

```bash
npm run sync:harnesses
```

Expected: prints all 12 sync lines.

- [ ] **Step 4: Run final tests**

```bash
npm test
```

Expected: PASS for all tests.

- [ ] **Step 5: Commit**

```bash
git add README.md commands examples skills scripts .agents .claude .cursor .gemini .github .kiro .opencode .pi .qoder .rovodev .trae-cn .trae tests/skill-content.test.mjs
git commit -m "test: add PMF Radar content guardrails"
```

## Task 8: Final Verification

**Files:**
- Verify all package files.

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: all tests pass with `# fail 0`.

- [ ] **Step 2: Run sync and verify tests still pass**

```bash
npm run sync:harnesses
npm test
```

Expected: sync prints all 12 harness targets and tests pass with `# fail 0`.

- [ ] **Step 3: Inspect git state**

```bash
git status --short
```

Expected: no uncommitted package changes except pre-existing unrelated `.gitignore` if it remains untracked.

- [ ] **Step 4: Report result**

Summarize:

- package files created
- canonical skill path
- harness targets generated
- tests run and results
- any unrelated untracked files left alone
