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

const forbiddenOverclaims = [
  /idea validator/i,
  /market validator/i,
  /PMF validator/i,
  /validate your idea instantly/i,
  /know if your startup will work/i,
  /get a score and start building/i,
  /proves PMF/i,
  /proves product-market fit/i,
  /predicts startup success/i,
  /validates market demand/i,
  /replaces customer validation/i
];

function assertNoForbiddenOverclaims(content, label) {
  for (const pattern of forbiddenOverclaims) {
    assert.doesNotMatch(content, pattern, `${label} must not contain ${pattern}`);
  }
}

function assertSkillFrontmatter(content, label) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `${label} must start with a complete YAML frontmatter block`);

  const frontmatter = match[1];
  assert.match(frontmatter, /^name: pmf-radar$/m);
  assert.match(frontmatter, /^description: \S.+$/m);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(content, values, label) {
  for (const value of values) {
    assert.match(content, new RegExp(escapeRegExp(value)), `${label} must include ${value}`);
  }
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

test("package and plugin placeholders contain syntactically valid JSON", async () => {
  for (const file of [
    "package.json",
    ".codex-plugin/plugin.json",
    ".claude-plugin/plugin.json",
    ".cursor-plugin/plugin.json"
  ]) {
    const content = await read(file);
    assert.doesNotThrow(() => JSON.parse(content), `${file} must parse as JSON`);
  }
});

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
  assertNoForbiddenOverclaims(readme, "README.md");
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
    assertNoForbiddenOverclaims(JSON.stringify(manifest), file);
  }
});

test("SKILL.md routes PMF Radar modes and tool fallback", async () => {
  const skill = await read("skills/pmf-radar/SKILL.md");

  assertSkillFrontmatter(skill, "skills/pmf-radar/SKILL.md");
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
  assertNoForbiddenOverclaims(skill, "skills/pmf-radar/SKILL.md");
});

test("references include required output templates and verdict labels", async () => {
  const output = await read("skills/pmf-radar/references/output-templates.md");
  const scoring = await read("skills/pmf-radar/references/scoring-rubric.md");

  assertIncludesAll(output, [
    "PMF_RADAR.md",
    "# PMF Radar: [Idea Name]",
    "## 1. Verdict",
    "## 2. Idea in one sentence",
    "## 3. Target customer and buyer",
    "## 4. Assumptions being tested",
    "## 5. Pain evidence",
    "## 6. Repeated complaint patterns",
    "## 7. Current workaround",
    "## 8. Existing spend",
    "## 9. Competitor and alternative map",
    "## 10. Best wedge",
    "## 11. Business model hypothesis",
    "## 12. 7-day validation test",
    "## 13. Why this idea might be bad",
    "## 14. Scoring",
    "## 15. Final recommendation",
    "## 16. Search log",
    "PMF_COMPARISON.md",
    "# PMF Comparison: [Theme]",
    "## 1. Overall recommendation",
    "## 2. Comparison table",
    "## 3. Best first wedge",
    "## 4. Ideas to park or kill",
    "## 5. 7-day test plan for top option",
    "## 6. Evidence gaps",
    "PMF_DIAGNOSIS.md",
    "# PMF Diagnosis: [Product Name]",
    "## 1. PMF status",
    "## 2. Segment with strongest pull",
    "## 3. Activation evidence",
    "## 4. Usage evidence",
    "## 5. Revenue evidence",
    "## 6. Qualitative evidence",
    "## 7. PMF risks",
    "## 8. Segment to double down on",
    "## 9. Features to ignore",
    "## 10. Next 30-day experiment",
    "## 11. Final recommendation"
  ], "skills/pmf-radar/references/output-templates.md");

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
    assert.match(scoring, new RegExp(escapeRegExp(dimension)));
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

  assertIncludesAll(search, [
    "## Pain Complaints",
    "[workflow] takes too long",
    "[target user] hate [workflow]",
    "site:reddit.com [target user] [workflow] frustrated",
    "## Current Workarounds",
    "[workflow] spreadsheet template",
    "[workflow] virtual assistant",
    "[workflow] outsourcing",
    "## Existing Spend",
    "[workflow] pricing",
    "hire [role] for [workflow]",
    "Upwork [workflow]",
    "## Competitor Dissatisfaction",
    "[competitor] alternative",
    "[category] G2 reviews",
    "[category] Capterra reviews",
    "## Buyer And Distribution",
    "[target buyer] community",
    "[target buyer] association",
    "[target buyer] LinkedIn group",
    "## Evidence Against The Idea",
    "why [category] startups fail",
    "[target buyer] won't pay for software",
    "[category] low willingness to pay"
  ], "skills/pmf-radar/references/search-patterns.md");

  assertIncludesAll(validation, [
    "## Strong Validation",
    "customer pays",
    "paid pilot",
    "LOI",
    "uses the product repeatedly",
    "## Medium Validation",
    "waitlist signup from target buyer",
    "detailed interview",
    "strong reply to cold outreach",
    "buyer asks about pricing",
    "## Weak Validation",
    "friends say it is cool",
    "AI gives it a high score",
    "generic survey responses",
    "users say \"I would use this\" but do not pay or act",
    "## Recommendation Rules",
    "kill metric",
    "If only weak validation is available",
    "regulated markets"
  ], "skills/pmf-radar/references/validation-tests.md");

  assertIncludesAll(redFlags, [
    "## Build Now Red Flags",
    "## Run Paid Test Red Flags",
    "## Research More Red Flags",
    "## Park Red Flags",
    "## Kill Red Flags",
    "## Internal Tool Only Red Flags",
    "## Regulated Markets",
    "healthcare",
    "finance",
    "legal"
  ], "skills/pmf-radar/references/red-flags.md");
});

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
  assert.match(sample, /TBD|Do not rate/i);
  assert.doesNotMatch(
    sample,
    /Add real source summary here after running PMF Radar\.\s*\|\s*Source link\s*\|\s*(Strong|Medium|Weak|High|Low|[1-5])/i
  );
});
