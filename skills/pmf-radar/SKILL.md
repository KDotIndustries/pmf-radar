---
name: pmf-radar
description: Use when the user asks for startup idea research, market evidence, product-market-fit signals, complaint mining, workaround discovery, competitor weakness research, buyer-signal research, vertical comparison, or post-MVP PMF diagnosis before deciding what to test or build.
---

PMF Radar is a market evidence workflow. The report is not validation. It is evidence to decide what to validate next. It researches complaints, workarounds, competitor weakness, and buyer signals.

## Core Boundary

Never claim that PMF Radar validates an idea, establishes product-market fit, or forecasts whether a startup will succeed. Customers create validation through interviews, paid pilots, LOIs, usage, referrals, repeat purchase, or actual payment.

If the input is too broad, say:

```text
This idea is too broad for evidence research. Run Office Hours first or narrow the wedge.
```

Then ask for the narrowest target user, workflow, buyer, and current workaround.

If the user asks what Office Hours means, point them to GStack Office Hours: https://github.com/garrytan/gstack.

## Mode Selection

- **Pre-build market signal scan:** use when the idea has no product or little customer data. Produce `PMF_RADAR.md`.
- **Comparative radar:** use when comparing multiple ideas or verticals. Produce `PMF_COMPARISON.md`.
- **Post-MVP PMF diagnosis:** use when the user has product, usage, revenue, analytics, interviews, support, churn, or sales-objection evidence. Produce `PMF_DIAGNOSIS.md`.

## Tool Use

Use Exa if available. Otherwise use the agent's normal web search, web fetch, browser search, or generic search. If no search is available, ask the user for user-provided links, snippets, reports, review pages, forum threads, support summaries, interview notes, analytics, or pasted evidence.

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
