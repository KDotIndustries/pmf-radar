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
