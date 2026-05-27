# PMF Radar

An open-source market-evidence skill for founders: scan complaints, workarounds, competitors, and buyer signals before you build.

PMF Radar scans for market pull. It does not validate an idea, prove PMF, or replace customer conversations.

## Recommended Workflow

1. Run [GStack Office Hours](https://github.com/garrytan/gstack) or another founder pressure-test to clarify the idea, target user, status quo, and narrowest wedge.
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

- `skills/pmf-radar/examples/travel-assistant-input.md`
- `skills/pmf-radar/examples/freelancer-invoice-chaser-input.md`
- `skills/pmf-radar/examples/sample-output.md`

## Install

Install PMF Radar with:

```bash
npx skills add KDotIndustries/pmf-radar
```

The installable payload lives under `skills/pmf-radar`, so the repository root install discovers the PMF Radar skill without copying repo docs or tests.

Then ask your agent to run PMF Radar on a startup idea, an Office Hours memo, multiple verticals to compare, or post-MVP usage and revenue evidence.

For stronger external research, connect [EXA MCP](https://exa.ai/docs/reference/exa-mcp) to your agent. Exa is optional; PMF Radar can also use the agent's normal web search, browser search, or user-provided links and snippets.

## Limitations

PMF Radar uses public and user-provided evidence. It does not bypass paywalls, scrape private communities, use leaked data, collect sensitive personal information, or expose user PII.
