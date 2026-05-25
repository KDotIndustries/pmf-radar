# PMF Radar Skill Package Design

Date: 2026-05-25
Status: Superseded by Hallmark-style `npx skills add KDotIndustries/pmf-radar` package
Source PRD: `docs/PRD_PMF_Radar_Open_Source_Skill.md`
Reference package: `/Users/omarkhatib/GitHub/pm0`

> Superseded note: this design captured the earlier PM0-style harness-copy approach. The current package uses a top-level `SKILL.md`, top-level `references/`, optional `commands/` and `examples/`, and `package.json` `skill` metadata instead of generated per-harness directories or plugin manifests.

## Summary

PMF Radar will be an open-source, instruction-only agent skill package that helps founders scan public market evidence before building. The package will implement the PRD and follow the PM0 repo shape closely enough to be installable, testable, and portable across harnesses that support `SKILL.md`-style skills.

The core positioning is:

```text
Office Hours = clarity.
PMF Radar = evidence.
Customers = validation.
```

The skill must never present itself as an idea validator, market validator, PMF validator, or a replacement for customer validation.

## Goals

- Create a complete open-source skill package, not just a standalone Markdown file.
- Keep `skills/pmf-radar/SKILL.md` concise and route detailed guidance into references.
- Support three modes:
  - pre-build market signal scan
  - comparative radar for ideas or verticals
  - post-MVP PMF diagnosis
- Make the skill search-provider agnostic while preferring Exa when available.
- Include examples, tests, and plugin metadata comparable to PM0.
- Preserve one canonical skill source under `skills/pmf-radar/`.

## Non-Goals

- Do not build a SaaS app, browser extension, scraper, dashboard, database, scoring API, or paid report generator.
- Do not require Exa, Reddit, a custom API key, or any specific web-search provider.
- Do not implement official Reddit API integration.
- Do not create fake certainty through a single averaged score.
- Do not optimize for compliance-heavy enterprise market research workflows in v1.

## Package Shape

The repo will contain:

```text
README.md
LICENSE
package.json
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
.agents/skills/pmf-radar/
.claude/skills/pmf-radar/
.cursor/skills/pmf-radar/
.gemini/skills/pmf-radar/
.github/skills/pmf-radar/
.kiro/skills/pmf-radar/
.opencode/skills/pmf-radar/
.pi/skills/pmf-radar/
.qoder/skills/pmf-radar/
.rovodev/skills/pmf-radar/
.trae-cn/skills/pmf-radar/
.trae/skills/pmf-radar/
tests/skill-content.test.mjs
```

This is approach 1 from the design discussion: a full PM0-style package. It includes PRD-required artifacts plus packaging, tests, plugin manifests, and harness skill copies modeled after PM0. The canonical source remains `skills/pmf-radar/`; harness directories are generated copies.

## Skill Architecture

`skills/pmf-radar/SKILL.md` will be the entry point. It will include frontmatter with:

- `name: pmf-radar`
- a trigger description covering startup idea research, market evidence scans, competitor weakness research, complaint and workaround discovery, vertical comparison, and post-MVP PMF diagnosis

The body will stay procedural and compact:

1. State the validation boundary.
2. Narrow vague ideas before researching.
3. Select one of the three modes.
4. Choose tools based on availability:
   - Exa MCP if available
   - native web search or web fetch if available
   - browser or generic search if available
   - user-provided links, snippets, or pasted evidence if search is unavailable
5. Load only the reference files needed for the selected mode.
6. Produce the required report artifact and state evidence gaps.

Detailed scoring, search queries, source quality, red flags, validation tests, and report templates will live in references so the skill uses progressive disclosure.

## References

`output-templates.md` will contain the three required report structures:

- `PMF_RADAR.md`
- `PMF_COMPARISON.md`
- `PMF_DIAGNOSIS.md`

`scoring-rubric.md` will define dimensions, score meanings, verdict labels, and the rule that scores are judgment aids rather than averages.

The allowed Mode A verdict labels are:

- Build now
- Run paid test
- Research more
- Park
- Kill
- Internal tool only

`source-playbook.md` will describe source buckets:

- complaint sources
- review sources
- competitor and alternative sources
- existing spend sources
- buyer and distribution sources

`search-patterns.md` will provide reusable query patterns for pain, workarounds, spend, competitor dissatisfaction, buyer access, and disconfirming evidence.

`validation-tests.md` will define real validation strength:

- strong: payment, paid pilot, LOI with clear conditions, serious workflow access, repeat use, referrals, disappointment if removed
- medium: target-buyer waitlist, detailed interview, strong outreach reply, pricing questions, pilot request
- weak: friends liking it, AI scores, generic survey responses, social likes, TAM slides, unsupported "I would use it"

`red-flags.md` will define kill, park, research-more, and internal-tool-only signals. It will include special trust and compliance risks for regulated markets.

## Modes And Outputs

### Mode A: Pre-Build Market Signal Scan

Use this when the founder has an idea but no meaningful customer data. The output is `PMF_RADAR.md`.

The report will include verdict, narrowed idea, target customer and buyer, riskiest assumptions, pain evidence, repeated complaint patterns, workaround evidence, existing spend, competitor map, best wedge, business model hypothesis, 7-day validation test, adversarial risks, scoring, final recommendation, and search log.

### Mode B: Comparative Radar

Use this when comparing ideas or verticals. The output is `PMF_COMPARISON.md`.

The report will include overall recommendation, comparison table, best first wedge, ideas to park or kill, 7-day test plan for the top option, and evidence gaps.

### Mode C: Post-MVP PMF Diagnosis

Use this when the founder has a product, users, revenue, analytics, interviews, support tickets, churn data, or usage evidence. The output is `PMF_DIAGNOSIS.md`.

The report will include PMF status, strongest-pull segment, activation evidence, usage evidence, revenue evidence, qualitative evidence, PMF risks, segment to double down on, features to ignore, next 30-day experiment, and final recommendation.

## README Design

`README.md` will be founder-facing and package-facing. It will cover:

- what PMF Radar is
- what it is not
- recommended workflow with GStack Office Hours
- three modes
- install guidance inspired by PM0
- Exa as optional, not required
- examples
- limitations and ethics

The README must use "market evidence" language and avoid "validate instantly" language.

The examples should use simple, approachable ideas rather than internal thesis examples. The travel-assistant example should be intentionally familiar so users can understand the workflow quickly. The freelancer-invoice-chaser example should give the package one lightweight B2B/workflow idea that is neither healthcare-adjacent nor travel-related.

## Command Design

`commands/validate-idea.md` will be included as an optional convenience command. It must explicitly say that the command performs evidence research and does not validate the idea by itself.

The command should route into PMF Radar and request a clear idea, Office Hours memo, comparison set, or post-MVP evidence depending on the user's input.

## Cross-Harness Packaging

The PM0 package uses two compatibility mechanisms:

1. Plugin manifests for harnesses that consume package metadata.
2. Copied skill directories for harnesses that discover repo-local skills under their own dot-directory.

PMF Radar will mirror both. The plugin manifests are:

- `.codex-plugin/plugin.json`
- `.claude-plugin/plugin.json`
- `.cursor-plugin/plugin.json`

The manifests will point to the harness-specific packaged skill roots they expose, while `skills/pmf-radar/` remains the canonical source copied into those roots. The capability language should describe PMF Radar as market-evidence research for founders and emphasize interactive, read, and web-research-oriented workflows. No manifest should imply that PMF Radar installs integrations or performs validation.

The harness skill copies will be:

- `.agents/skills/pmf-radar`
- `.claude/skills/pmf-radar`
- `.cursor/skills/pmf-radar`
- `.gemini/skills/pmf-radar`
- `.github/skills/pmf-radar`
- `.kiro/skills/pmf-radar`
- `.opencode/skills/pmf-radar`
- `.pi/skills/pmf-radar`
- `.qoder/skills/pmf-radar`
- `.rovodev/skills/pmf-radar`
- `.trae-cn/skills/pmf-radar`
- `.trae/skills/pmf-radar`

`scripts/sync-harness-skills.mjs` will copy `skills/pmf-radar/` into each harness target. This keeps the package portable without maintaining divergent skill content by hand.

## Test Strategy

Use Node's built-in test runner, following PM0's `tests/*.test.mjs` pattern.

Tests will verify:

- all required PRD files exist
- `SKILL.md` contains the right frontmatter name and core trigger terms
- forbidden overclaiming language is absent
- Exa is optional and fallbacks are documented
- all three output artifact names are present
- all verdict labels are present
- required scoring dimensions are present
- source handling rules are present
- README includes the recommended workflow and validation boundary
- examples exist for a travel assistant AI agent and a freelancer invoice chaser
- harness skill copies match the canonical `skills/pmf-radar/` content after running the sync script

The tests are content-contract tests, not runtime behavior tests, because v1 is instruction-only.

## Safety And Source Handling

The skill will instruct agents to use only publicly accessible sources or user-provided materials. It will forbid bypassing paywalls, scraping private communities, using leaked data, collecting sensitive personal information, or exposing user PII.

Reports should quote minimally, summarize primarily, include links where available, mark uncertainty, and show conflicts when sources disagree.

## Implementation Order

1. Create package metadata and README.
2. Create the canonical skill and references.
3. Add optional command and examples.
4. Add plugin manifests.
5. Add harness sync script and generated harness copies.
6. Add content-contract tests.
7. Run tests and fix package content until they pass.

## Acceptance Criteria

- `npm test` passes.
- The required PRD artifacts exist.
- The package can be understood from the README without reading the PRD.
- `SKILL.md` stays compact and delegates detailed guidance to references.
- The package avoids "validator" positioning and clearly separates evidence from validation.
- The package mirrors PM0's open-source packaging style while staying instruction-only.
- Harness-specific skill directories are generated from the canonical `skills/pmf-radar/` directory.
