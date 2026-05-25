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
