# PRD: PMF Radar — Open-Source Market Evidence Skill

**Version:** 0.1  
**Product type:** Open-source agent skill / skill pack component  
**Primary artifact:** `SKILL.md`  
**Optional artifact:** `commands/validate-idea.md`  
**Install path:** `npx skills add KDotIndustries/pmf-radar`  
**Working thesis:** Office Hours creates clarity. PMF Radar finds market evidence. Customers create validation.

---

## 1. Summary

PMF Radar is an open-source agent skill that helps founders scan for evidence of market pull before they build.

It does **not** claim to validate an idea. It searches for public evidence of:

- real user complaints;
- repeated pain;
- current workarounds;
- existing spend;
- competitor weaknesses;
- buyer urgency;
- distribution paths;
- wedge opportunities;
- validation experiments.

The skill should work after a founder has already clarified the idea, ideally through [GStack Office Hours](https://github.com/garrytan/gstack), but it should not require GStack.

Recommended workflow:

```text
1. [GStack Office Hours](https://github.com/garrytan/gstack)
   → pressure-test the idea, target user, status quo, and narrowest wedge.

2. PMF Radar
   → search for market evidence, buyer signals, competitor weaknesses, and workarounds.

3. Real-world validation
   → interviews, paid pilots, LOIs, waitlists, usage tests, or actual payment.
```

The core message:

```text
Office Hours = clarity.
PMF Radar = evidence.
Customers = validation.
```

---

## 2. Why This Exists

Founders often mistake a clean idea for a real market. They ask an LLM whether an idea is good, receive a polished answer, and feel falsely validated.

PMF Radar should prevent this.

The skill should force the agent to find evidence outside the founder's imagination:

- Are people already complaining about this?
- Are people already paying for a workaround?
- Are current tools hated, expensive, complex, or incomplete?
- Is there an obvious buyer?
- Is the pain frequent enough?
- Can the founder reach customers this week?
- What would prove the idea is bad?

PMF Radar is especially useful for ideas in the “AI-native operator / collapse the layer” thesis, where the best opportunities are not dashboards but places where AI can remove coordination work, repetitive service labor, or operational overhead.

Examples from our internal ideas:

- **OperatorDesk:** AI customer/back-office operator for service businesses.
- **CareLoop:** voice-first family care coordination for aging parents.

---

## 3. Product Positioning

### Bad positioning

Avoid these names and claims:

- Idea Validator
- Market Validator
- PMF Validator
- “Validate your idea instantly”
- “Know if your startup will work”
- “Get a score and start building”

These overclaim. A skill cannot prove PMF or validate demand by itself.

### Better positioning

Use:

```text
PMF Radar
```

Tagline:

```text
An open-source market-evidence skill for founders: scan complaints, workarounds, competitors, and buyer signals before you build.
```

Core promise:

```text
PMF Radar scans for market pull. It does not pretend to replace customer validation.
```

---

## 4. Target Users

### Primary users

- indie hackers;
- startup founders;
- AI builders;
- product managers;
- startup studios;
- accelerator applicants;
- developers deciding between multiple ideas;
- operators evaluating AI-native service opportunities.

### Secondary users

- consultants;
- AI automation agencies;
- product teams researching feature opportunities;
- venture studios;
- market researchers;
- PMs doing discovery.

### Excluded users

Do not optimize v1 for:

- enterprise market-research teams needing compliance-heavy research workflows;
- large-scale paid data pipelines;
- automated scraping businesses;
- users who want investment advice;
- users who want a fake “yes/no” answer without doing customer work.

---

## 5. Core User Stories

### Story 1: Founder with a raw idea

As a founder, I want to give the skill a startup idea and receive a market evidence report, so I can decide whether to research, test, park, or kill it.

### Story 2: Founder after Office Hours

As a founder, I want to pass in an Office Hours memo, so PMF Radar can use the clarified wedge and search for external evidence.

### Story 3: Founder comparing ideas

As a founder, I want to compare multiple ideas, so I can identify the one with the strongest pain evidence, clearest buyer, and fastest paid test.

### Story 4: Founder choosing a vertical

As a founder, I want to compare verticals for the same product thesis, so I can pick the first niche.

Example:

```text
Product thesis: AI customer-ops operator.
Candidate verticals: home services, property management, auto service, med spas, ecommerce.
PMF Radar should compare which vertical has the best evidence and easiest validation path.
```

### Story 5: Post-MVP founder

As a founder with early users, I want PMF Radar to analyze retention, usage, churn, customer quotes, sales objections, and paid conversion, so I can diagnose whether I have early PMF signals.

---

## 6. Scope

## 6.1 In Scope for v1

PMF Radar v1 should be **instruction-only**. No backend, no UI, no API key requirement, no custom scraper.

Required:

- `README.md`
- `LICENSE`
- `package.json`
- `SKILL.md`
- `references/output-templates.md`
- `references/scoring-rubric.md`
- `references/source-playbook.md`
- `references/search-patterns.md`
- `references/validation-tests.md`
- `references/red-flags.md`

Optional in v1:

- `commands/validate-idea.md`
- `examples/travel-assistant-input.md`
- `examples/freelancer-invoice-chaser-input.md`
- `examples/sample-output.md`

The skill should work in agents that support `SKILL.md`-style skills. It should be compatible with Codex-style skills and broadly useful for Claude Code or local coding agents that can read Markdown instructions.

---

## 6.2 Out of Scope for v1

Do not build:

- a SaaS app;
- a browser extension;
- a dashboard;
- a paid report generator;
- an automated scraper;
- a database;
- a scoring API;
- account creation;
- payment system;
- source storage;
- Reddit API integration;
- G2/Capterra scraping scripts;
- Exa-only dependency.

PMF Radar v1 should be a strong, reusable agent workflow, not a productized app.

---

## 7. Relationship to GStack Office Hours

PMF Radar should **not** clone GStack Office Hours.

[GStack Office Hours](https://github.com/garrytan/gstack) already handles founder pressure-testing and narrow-wedge thinking. PMF Radar should be positioned as the next step.

Recommended README language:

```markdown
## Recommended workflow

PMF Radar works best after a founder pressure-test session.

Recommended:

1. Run [GStack Office Hours](https://github.com/garrytan/gstack) to clarify the idea, target user, status quo, and narrowest wedge.
2. Run PMF Radar to scan public market evidence.
3. Run a real validation test: customer interviews, paid pilots, LOIs, waitlists, usage tests, or actual payment.

Office Hours = clarity.
PMF Radar = evidence.
Customers = validation.
```

The skill should accept an Office Hours memo if the user provides one, but it should also work standalone.

If the input idea is vague, PMF Radar should say:

```text
This idea is too broad for evidence research. Run Office Hours first or narrow the wedge.
```

Example:

```text
Too broad: AI back office for SMBs.
Better: AI appointment-rescheduling and invoice-resend operator for med spas.
```

---

## 8. Search Provider Strategy

PMF Radar should be **search-provider agnostic**.

It should prefer the best available search tools, but never require a specific provider.

### Tool priority

```text
1. Exa MCP, if available
2. Native web search / web fetch, if available
3. Browser-based or generic web search, if available
4. User-provided links, snippets, reports, or pasted search results
```

### Exa usage

Exa is useful because it can connect AI assistants to web search, code search, and company research. If the agent has Exa MCP tools available, PMF Radar should use them.

Possible Exa tools:

```text
web_search_exa
web_fetch_exa
web_search_advanced_exa, if available
```

Use Exa especially for:

- broad web search;
- competitor discovery;
- company pages;
- blog/forum discovery;
- fetching clean page content;
- searching public pages with domain filters.

### Exa should be optional

Do not make Exa required. Many users will use Claude, Codex, ChatGPT, Perplexity, native web search, or a local agent with a different search provider.

The skill should say:

```text
Use Exa if available. Otherwise use the agent's normal web search. If no search is available, ask the user for links or pasted evidence.
```

---

## 9. Reddit Search Strategy

PMF Radar should support Reddit as a source, but it should not depend on Reddit.

### How to search Reddit

If Exa advanced search supports domain filters:

```text
includeDomains: ["reddit.com"]
```

If using normal web search:

```text
site:reddit.com [target user] [workflow] frustrated
site:reddit.com/r/smallbusiness [workflow] software complaint
site:reddit.com/r/Entrepreneur [problem] annoying
site:reddit.com/r/SaaS [competitor] alternative
```

If Reddit results are stale or incomplete:

- search Google-like results with `site:reddit.com`;
- search specific subreddits manually;
- use user-provided Reddit links;
- do not over-index on Reddit alone.

### Reddit limitations

The skill should warn:

```text
Reddit is useful for complaints and language, but it is noisy and may not represent paying buyers. Treat Reddit as evidence, not proof.
```

For a future app or serious commercial research product, official Reddit API integration can be considered, but it is not part of v1.

---

## 10. Source Types to Search

PMF Radar should search more than “the internet.” It should intentionally search different evidence buckets.

### 10.1 Complaint sources

Use these to find pain language:

- Reddit;
- Hacker News;
- Indie Hackers;
- Product Hunt comments;
- niche forums;
- Discord/community posts, if publicly accessible;
- Quora;
- blog comments;
- YouTube comments, if accessible;
- X/Twitter, if accessible;
- LinkedIn posts/comments, if accessible.

### 10.2 Review sources

Use these to find dissatisfaction with current tools:

- G2;
- Capterra;
- TrustRadius;
- Gartner Peer Insights, if publicly accessible;
- Trustpilot;
- App Store reviews;
- Google Play reviews;
- Chrome Web Store reviews;
- Shopify App Store reviews;
- WordPress plugin reviews;
- GitHub issues;
- GitHub Discussions;
- npm package reviews/issues when relevant.

### 10.3 Competitor and alternative sources

Use these to find what exists:

- competitor landing pages;
- pricing pages;
- docs/help centers;
- case studies;
- changelogs;
- public roadmaps;
- alternative-to pages;
- review comparison pages;
- agency/service provider pages.

### 10.4 Existing spend sources

Use these to prove money changes hands:

- pricing pages;
- job posts;
- salary pages;
- Upwork listings;
- freelancer marketplaces;
- agency pages;
- BPO/provider pages;
- consultant pages;
- service directories;
- “hire [role]” pages;
- customer case studies;
- public procurement/RFPs, if relevant.

### 10.5 Buyer and distribution sources

Use these to find where buyers gather:

- subreddits;
- associations;
- conferences;
- newsletters;
- podcasts;
- LinkedIn groups/pages;
- Facebook groups, if public and accessible;
- Slack/Discord communities, if public and accessible;
- trade publications;
- industry directories;
- local business directories.

---

## 11. Search Buckets and Query Patterns

The skill should generate searches across these buckets for every idea.

### 11.1 Pain complaints

Goal: find people expressing pain.

Query patterns:

```text
"[workflow] takes too long"
"[workflow] is annoying"
"[workflow] frustrating"
"[target user] hate [workflow]"
"[target user] manual [workflow]"
"[workflow] spreadsheet"
"[workflow] reddit"
site:reddit.com [target user] [workflow] frustrated
site:news.ycombinator.com [workflow] problem
```

### 11.2 Current workarounds

Goal: find how people solve it today.

```text
"[workflow] spreadsheet template"
"[workflow] checklist"
"[workflow] SOP"
"[workflow] virtual assistant"
"[workflow] Zapier"
"[workflow] agency"
"[workflow] outsourcing"
"[workflow] freelancer"
```

### 11.3 Existing spend

Goal: find whether money already changes hands.

```text
"[workflow] pricing"
"[workflow] managed service"
"[workflow] consultant"
"hire [role] for [workflow]"
"[role] salary [workflow]"
"[workflow] BPO"
"[workflow] agency pricing"
"Upwork [workflow]"
```

### 11.4 Competitor dissatisfaction

Goal: find what current tools fail at.

```text
"[competitor] reviews"
"[competitor] too expensive"
"[competitor] alternative"
"[competitor] hard to use"
"[competitor] customer support bad"
"[category] G2 reviews"
"[category] Capterra reviews"
"[category] App Store reviews"
```

### 11.5 Buyer and distribution

Goal: find where to reach buyers.

```text
"[target buyer] community"
"[target buyer] association"
"[target buyer] conference"
"[target buyer] newsletter"
"[target buyer] podcast"
"[target buyer] subreddit"
"[target buyer] LinkedIn group"
"[target buyer] directory"
```

### 11.6 Evidence against the idea

Goal: actively look for reasons the idea may be bad.

```text
"why [category] startups fail"
"[category] crowded market"
"[target buyer] won't pay for software"
"[workflow] not a problem"
"[competitor] solves this well"
"[category] low willingness to pay"
"[category] churn"
```

---

## 12. Evidence Quality Rules

The skill must rank evidence by strength.

### Strong evidence

- people already paying for a workaround;
- people hiring humans to solve the problem;
- repeated complaints across independent sources;
- bad reviews of current tools;
- users asking for recommendations;
- direct quotes from target customers;
- clear revenue loss, time loss, risk, or stress;
- clear buyer with budget;
- proof of workflow frequency;
- proof of urgency.

### Medium evidence

- expert essays;
- industry trend reports;
- founder opinions;
- indirect complaints;
- social media discussions;
- competitor funding announcements;
- category growth claims;
- single-person anecdotes from plausible buyers.

### Weak evidence

- generic TAM;
- influencer threads;
- AI-generated reports;
- one-off anecdotes;
- “this seems cool”;
- vague trend claims;
- complaints from non-buyers;
- evidence that only supports curiosity, not purchase intent.

### Rule

PMF Radar should never let weak evidence carry the verdict.

If the report has many weak signals but no strong signals, the verdict should be:

```text
Research more
```

or:

```text
Park
```

not:

```text
Build now
```

---

## 13. Scoring Rubric

PMF Radar should score each dimension from 1 to 5.

Do not blindly average the score. Explain the judgment.

| Dimension | Meaning |
|---|---|
| Pain intensity | Is the pain severe or just annoying? |
| Frequency | Does it happen daily/weekly or rarely? |
| Buyer clarity | Is there an obvious buyer/economic owner? |
| Existing spend | Are people already paying for tools, staff, agencies, or workarounds? |
| Workaround ugliness | Are current solutions manual, fragmented, expensive, or hated? |
| Competitive gap | Are existing tools weak, overpriced, complex, or incomplete? |
| Distribution accessibility | Can the founder reach buyers directly? |
| MVP feasibility | Can a useful version be tested in 1–2 weeks? |
| AI advantage | Does AI change the economics or workflow meaningfully? |
| Trust/compliance risk | Is the idea burdened by regulation, safety, privacy, or trust issues? Reverse-score this. |
| Founder-market fit | Does the founder have relevant experience, access, or insight? |
| Speed to paid test | Can the founder ask for payment, LOI, or pilot quickly? |

### Verdict labels

PMF Radar must choose one:

```text
Build now
Run paid test
Research more
Park
Kill
Internal tool only
```

### Interpretation

- **Build now:** strong evidence, clear buyer, reachable segment, feasible wedge.
- **Run paid test:** enough evidence to sell before building.
- **Research more:** signals are promising but incomplete.
- **Park:** interesting but not urgent or not reachable.
- **Kill:** weak pain, unclear buyer, no spend, or impossible wedge.
- **Internal tool only:** useful for the founder but weak as a standalone business.

---

## 14. Product Modes

PMF Radar should support three modes.

### Mode A: Pre-build market signal scan

Use when the idea has no product or little/no customer data.

Goal:

```text
Find evidence of pain, spend, workarounds, competitors, and the fastest validation test.
```

Primary output:

```text
PMF_RADAR.md
```

### Mode B: Comparative radar

Use when comparing multiple ideas or verticals.

Goal:

```text
Compare market pull and recommend which idea or vertical to test first.
```

Primary output:

```text
PMF_COMPARISON.md
```

### Mode C: Post-MVP PMF diagnosis

Use when the user already has a product, users, revenue, analytics, interviews, support tickets, or churn data.

Goal:

```text
Diagnose whether there is early PMF pull or whether the founder is pushing the product onto the market.
```

Primary output:

```text
PMF_DIAGNOSIS.md
```

---

## 15. Required Output: Mode A — `PMF_RADAR.md`

```markdown
# PMF Radar: [Idea Name]

## 1. Verdict

Choose one:
- Build now
- Run paid test
- Research more
- Park
- Kill
- Internal tool only

Explain in 3–6 sentences.

## 2. Idea in one sentence

Rewrite the idea clearly and narrowly.

## 3. Target customer and buyer

Identify:
- user
- buyer
- economic owner
- decision-maker
- who feels the pain most
- who can approve payment

## 4. Assumptions being tested

List the riskiest assumptions.

Group by:
- pain
- buyer
- spend
- workflow
- technical feasibility
- distribution
- trust/compliance

## 5. Pain evidence

| Evidence | Source | Signal strength | Interpretation |
|---|---|---:|---|

Include links where available. Quote sparingly. Summarize more than you quote.

## 6. Repeated complaint patterns

Cluster complaints into themes.

Example:
- manual data entry
- too many tools
- poor customer communication
- high staff workload
- expensive incumbents
- no accountability

## 7. Current workaround

Explain what people do today:
- spreadsheets
- agencies
- VAs
- manual admin
- bad SaaS
- phone calls
- email
- contractors
- internal tools
- doing nothing

## 8. Existing spend

Show how money already changes hands:
- subscriptions
- staff/headcount
- agencies
- outsourcing
- consultants
- per-transaction services
- manual labor

If there is no evidence of spend, say that clearly.

## 9. Competitor and alternative map

| Alternative | What it does | Weakness | Why we might win |
|---|---|---|---|

Include direct competitors, indirect alternatives, and manual workarounds.

## 10. Best wedge

Identify the narrowest first version worth testing.

Bad:
"AI back office for SMBs."

Good:
"AI appointment-rescheduling and invoice-resend operator for med spas."

## 11. Business model hypothesis

Suggest:
- subscription price
- managed service price
- outcome pricing, if relevant
- pilot price
- why the buyer would pay

## 12. 7-day validation test

Include:
- exact target buyer
- outreach channel
- outreach message angle
- landing page promise
- concierge/manual version
- what proof to ask for
- success metric
- kill metric

## 13. Why this idea might be bad

Be adversarial.

Include:
- market risk
- distribution risk
- willingness-to-pay risk
- technical risk
- trust/compliance risk
- competition risk
- founder-market-fit risk

## 14. Scoring

| Dimension | Score 1–5 | Rationale |
|---|---:|---|

Do not blindly average. Explain which dimensions matter most.

## 15. Final recommendation

Choose one action:
- build prototype
- run paid pilot
- run interviews
- compare verticals
- park
- kill

## 16. Search log

List:
- query themes used
- source types searched
- what each source category revealed
- gaps in evidence
```

---

## 16. Required Output: Mode B — `PMF_COMPARISON.md`

Use when comparing multiple ideas or verticals.

```markdown
# PMF Comparison: [Theme]

## 1. Overall recommendation

Which idea or vertical should be tested first and why?

## 2. Comparison table

| Idea / vertical | Pain intensity | Existing spend | Buyer clarity | Competition gap | Distribution | MVP feasibility | Trust risk | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---|

## 3. Best first wedge

## 4. Ideas to park or kill

## 5. 7-day test plan for top option

## 6. Evidence gaps
```

Example use:

```text
Compare OperatorDesk verticals:
- home services
- property management
- auto service
- med spas
- ecommerce ops
```

---

## 17. Required Output: Mode C — `PMF_DIAGNOSIS.md`

Use after product launch.

```markdown
# PMF Diagnosis: [Product Name]

## 1. PMF status

Choose one:
- No PMF
- Weak pull
- Promising niche pull
- Strong early PMF
- Expanding PMF

## 2. Segment with strongest pull

## 3. Activation evidence

Analyze:
- time to value
- onboarding completion
- first successful workflow
- user confusion

## 4. Usage evidence

Analyze:
- repeat usage
- frequency
- retention
- feature usage
- task completion

## 5. Revenue evidence

Analyze:
- paid conversion
- willingness to pay
- expansion
- churn
- sales cycle
- objections

## 6. Qualitative evidence

Analyze:
- customer quotes
- support tickets
- complaints
- referrals
- disappointment survey
- NPS or sentiment

## 7. PMF risks

## 8. Segment to double down on

## 9. Features to ignore

## 10. Next 30-day experiment

## 11. Final recommendation
```

---

## 18. Validation Philosophy

PMF Radar must repeat this principle throughout the skill:

```text
The report is not validation. It is evidence to decide what to validate next.
```

### What counts as actual validation

Strong validation:

- customer pays;
- customer signs a paid pilot;
- customer signs LOI with clear conditions;
- customer gives access to the workflow;
- customer schedules a serious sales call;
- customer uses the product repeatedly;
- customer refers another buyer;
- customer is disappointed if the product disappears.

Medium validation:

- waitlist signup from target buyer;
- detailed interview;
- strong reply to cold outreach;
- buyer shares internal workflow;
- buyer asks about pricing;
- buyer requests pilot.

Weak validation:

- friends say it is cool;
- AI gives it a high score;
- generic survey responses;
- social media likes;
- TAM slide;
- users say “I would use this” but do not pay or act.

---

## 19. Safety, Ethics, and Source Handling

The skill should only use publicly accessible sources or sources provided by the user.

Rules:

- do not bypass paywalls;
- do not scrape private communities;
- do not use leaked data;
- do not collect sensitive personal information;
- do not expose user PII in the output;
- quote minimally and summarize primarily;
- include source links where available;
- clearly mark uncertain or weak evidence;
- respect site terms and access restrictions;
- when sources conflict, show the conflict.

For regulated markets such as healthcare, finance, legal, insurance, and elder care, PMF Radar should add a specific trust/compliance risk section.

---

## 20. Repo Structure

Recommended repository:

```text
pmf-radar/
  README.md
  LICENSE
  package.json
  SKILL.md
  references/
    output-templates.md
    scoring-rubric.md
    source-playbook.md
    search-patterns.md
    validation-tests.md
    red-flags.md
  commands/
    validate-idea.md
  examples/
    travel-assistant-input.md
    freelancer-invoice-chaser-input.md
    sample-output.md
```

v1 should ship with:

```text
README.md
LICENSE
package.json
SKILL.md
references/*.md
commands/validate-idea.md
examples/*.md
```

---

## 21. `SKILL.md` Requirements

The `SKILL.md` file must include metadata:

```markdown
---
name: pmf-radar
description: Scan for market pull and product-market-fit signals for startup ideas. Use after an idea has been pressure-tested or when evaluating a startup, vertical, wedge, product concept, or post-MVP traction. Searches public sources for complaints, workarounds, competitor weaknesses, existing spend, buyer signals, and validation experiments. Does not claim to validate ideas by itself.
---
```

The description should front-load trigger terms:

- market pull;
- PMF;
- product-market fit;
- startup idea;
- market validation;
- customer discovery;
- competitor research;
- G2 reviews;
- Reddit complaints;
- buyer signals;
- existing spend;
- workarounds.

The skill instructions should include:

- role/persona;
- when to use;
- when not to use;
- input requirements;
- research procedure;
- source playbook;
- scoring rubric;
- output format;
- adversarial section;
- validation test design;
- post-MVP mode.

---

## 22. Suggested `SKILL.md` Core Text

The local LLM should generate a polished `SKILL.md` based on this skeleton:

```markdown
---
name: pmf-radar
description: Scan for market pull and product-market-fit signals for startup ideas. Use after an idea has been pressure-tested or when evaluating a startup, vertical, wedge, product concept, or post-MVP traction. Searches public sources for complaints, workarounds, competitor weaknesses, existing spend, buyer signals, and validation experiments. Does not claim to validate ideas by itself.
---

# PMF Radar

You are PMF Radar, an adversarial market-evidence analyst.

Your job is not to validate ideas by vibes. Your job is to scan for evidence of market pull.

Prefer:
- user complaints over trend essays;
- existing spend over TAM claims;
- workarounds over founder imagination;
- buyer behavior over social media hype;
- direct evidence over polished narratives;
- validation experiments over opinions.

## Core principle

The report is not validation. It is evidence to decide what to validate next.

Office Hours creates clarity.
PMF Radar finds evidence.
Customers create validation.

## Recommended workflow

If the idea is vague, recommend running [GStack Office Hours](https://github.com/garrytan/gstack) first.
If the idea is specific enough, proceed with PMF Radar.
If the user provides an Office Hours memo, use it as context.

## Inputs to request if missing

Ask only for missing information that blocks the research:
- idea description;
- target customer;
- business type;
- target geography, if relevant;
- founder constraints;
- desired decision: build, compare, park, kill, or design experiment.

Do not over-question. If the input is enough, begin.

## Modes

Mode A: Pre-build market signal scan.
Mode B: Comparative radar.
Mode C: Post-MVP PMF diagnosis.

## Search provider policy

Use the best available search tools:
1. Exa MCP, if available.
2. Native web search/fetch, if available.
3. Browser or generic search, if available.
4. User-provided links/snippets if search is unavailable.

Use Exa if available, but do not require it.

## Source types

Search across:
- Reddit;
- Hacker News;
- Indie Hackers;
- Product Hunt comments;
- G2;
- Capterra;
- App Store / Google Play reviews;
- Chrome Web Store reviews;
- Shopify App Store reviews;
- GitHub issues;
- niche forums;
- competitor pages;
- pricing pages;
- job posts;
- Upwork/freelancer listings;
- agency/service provider pages;
- public case studies;
- buyer communities.

## Evidence quality

Classify evidence as strong, medium, or weak.
Strong evidence includes existing spend, hiring, repeated complaints, bad reviews, ugly workarounds, and clear buyer urgency.
Weak evidence includes generic TAM, influencer posts, AI-generated reports, and vague trend claims.

## Output

Produce the correct output depending on mode:
- PMF_RADAR.md
- PMF_COMPARISON.md
- PMF_DIAGNOSIS.md

Always include:
- verdict;
- evidence table;
- competitor map;
- current workaround;
- existing spend;
- best wedge;
- 7-day validation test;
- reasons the idea might be bad;
- search log.
```

---

## 23. README Requirements

The README should include:

### 23.1 Opening

```markdown
# PMF Radar

PMF Radar is an open-source agent skill for evidence-based startup market research.

It does not validate your idea by vibes. It scans for market pull: complaints, workarounds, competitor weaknesses, current spend, buyer urgency, and first validation tests.
```

### 23.2 Recommended workflow

```markdown
## Recommended workflow

PMF Radar works best after a founder pressure-test session.

1. Run [GStack Office Hours](https://github.com/garrytan/gstack) to clarify the idea, target user, status quo, and narrowest wedge.
2. Run PMF Radar to search public market evidence.
3. Run a real-world validation test: customer interviews, paid pilots, LOIs, waitlists, or usage tests.

Office Hours = clarity.
PMF Radar = evidence.
Customers = validation.
```

### 23.3 Installation

Include skills CLI install instructions:

```markdown
## Install

Install PMF Radar with:

```bash
npx skills add KDotIndustries/pmf-radar
```

Then ask your agent to run PMF Radar on a startup idea, an Office Hours memo, multiple verticals to compare, or post-MVP usage and revenue evidence.
```

### 23.4 Optional Exa MCP

```markdown
## Optional: Exa MCP

PMF Radar does not require Exa. If your agent supports Exa MCP, it can use Exa for web search and page fetching.

Example Codex setup:

```bash
codex mcp add exa --url https://mcp.exa.ai/mcp
```

If Exa is unavailable, PMF Radar should use the agent's native web search or ask for user-provided sources.
```

### 23.5 Example prompts

Include OperatorDesk and CareLoop examples.

---

## 24. Example Prompt: OperatorDesk

```text
Use PMF Radar.

Mode: Comparative radar.

Idea: AI customer-ops operator for service businesses.

Thesis: Businesses forward repetitive customer requests to an AI operator. It handles rescheduling, invoice resends, follow-ups, CRM updates, and escalates risky requests.

Candidate verticals:
- home services
- property management
- auto service departments
- appointment-based med spas
- ecommerce ops

Constraints:
- I can build a concierge MVP fast.
- I want an AI-native service company, not a generic SaaS dashboard.
- I want a vertical with clear ROI and willingness to pay.

Goal:
Tell me which vertical to test first, what evidence supports it, and what 7-day paid pilot test to run.
```

---

## 25. Example Prompt: CareLoop

```text
Use PMF Radar.

Mode: Pre-build market signal scan.

Idea: Voice-first family care coordination assistant for aging parents and their adult children.

Thesis: The parent interacts by phone call, scheduled voice check-ins, Siri/App Shortcuts, Apple Watch shortcut, and simple voice responses. The family gets reminders, alerts, and a shared care timeline.

Target customer:
Adult children caring for aging parents who live independently or semi-independently.

Constraints:
- Avoid medical diagnosis.
- Avoid emergency-service replacement.
- Avoid complex elder UI.
- Focus on medication reminders, wellness check-ins, family escalation, and care coordination.

Goal:
Tell me whether this is worth testing, what the riskiest assumptions are, who would pay, and what manual MVP validates demand.
```

---

## 26. Example Prompt: Generic Startup Idea

```text
Use PMF Radar.

Mode: Pre-build market signal scan.

Idea: [one-sentence idea]
Target customer: [buyer/user]
Business type: [B2B/B2C/B2B2C/prosumer]
Constraints: [time, budget, domain access, technical ability]
Goal: Decide whether to build, test, park, or kill this idea.
```

---

## 27. Validation Test Design Requirements

Every PMF Radar report must include a 7-day test.

The test must specify:

- exact target buyer;
- how many people to contact;
- outreach channel;
- outreach copy angle;
- what to offer;
- what to ask for;
- what proof counts;
- success metric;
- kill metric.

### Example 7-day test template

```markdown
## 7-day validation test

### Target buyer
[Specific buyer persona]

### Outreach list
Build a list of 30–50 buyers from [source].

### Offer
[Specific pain-removal offer]

### Message angle
"We noticed [pain]. We can [outcome] in [time] without [annoying thing]. Interested in a pilot?"

### Concierge MVP
Do the workflow manually behind the scenes with AI assistance.

### Success metric
- 5+ serious replies;
- 3+ calls booked;
- 1+ paid pilot or signed pilot agreement.

### Kill metric
- fewer than 2 serious replies from 50 targeted outreaches;
- no willingness to share workflow;
- no willingness to pay after pain is confirmed.
```

---

## 28. Red Flags the Skill Must Catch

PMF Radar should explicitly flag:

- no clear buyer;
- user and buyer are different with no obvious budget path;
- pain is interesting but rare;
- no evidence of existing spend;
- market is crowded and incumbents solve it well;
- target users complain but do not pay;
- product is a feature, not a company;
- founder has no access to buyers;
- validation depends on app-store virality;
- “AI wrapper” with no workflow ownership;
- trust/compliance burden too high for MVP;
- idea requires many integrations before first value;
- output is a dashboard when customer wants an outcome;
- over-reliance on Reddit complaints without buyer evidence.

---

## 29. Quality Bar

A good PMF Radar report should feel like:

```text
A skeptical market researcher who wants the idea to survive only if the evidence is real.
```

It should not feel like:

```text
A startup coach trying to encourage the founder.
```

Required qualities:

- specific;
- source-grounded;
- adversarial;
- concise where possible;
- explicit about uncertainty;
- clear about next action;
- unwilling to confuse research with validation.

---

## 30. Acceptance Criteria

The local LLM should generate a repo that satisfies these criteria.

### 30.1 Skill files

- top-level `SKILL.md` exists.
- `SKILL.md` has valid front matter with `name` and `description`.
- `SKILL.md` explains when to use and when not to use the skill.
- `SKILL.md` includes all three modes.
- `SKILL.md` includes search-provider fallback logic.
- `SKILL.md` includes source types beyond generic web search.
- `SKILL.md` includes output formats.
- `SKILL.md` includes validation philosophy.

### 30.2 Reference files

Reference files exist:

```text
scoring-rubric.md
source-playbook.md
search-patterns.md
validation-tests.md
red-flags.md
```

### 30.3 README

README includes:

- what PMF Radar is;
- what it is not;
- recommended workflow with GStack Office Hours;
- installation;
- optional Exa MCP setup;
- example prompts;
- output examples;
- license.

### 30.4 No hard dependencies

- The repo must not require Exa.
- The repo must not require Reddit API.
- The repo must not require scripts.
- The repo must work as Markdown/instruction-only.

### 30.5 Example tests

The repo should include at least two example inputs:

- OperatorDesk;
- CareLoop.

Optional:

- sample output for one idea.

---

## 31. Implementation Plan for Local LLM

Ask the local LLM to create these files:

```text
README.md
LICENSE
package.json
SKILL.md
references/output-templates.md
references/scoring-rubric.md
references/source-playbook.md
references/search-patterns.md
references/validation-tests.md
references/red-flags.md
examples/travel-assistant-input.md
examples/freelancer-invoice-chaser-input.md
examples/sample-output.md
```

Optional later:

```text
commands/validate-idea.md
```

### v1 build instruction

```text
Build PMF Radar as an instruction-only open-source agent skill. Do not build an app, backend, crawler, or UI. Generate the repo files, make the skill usable in Codex/Claude-style skill systems, and make Exa optional.
```

---

## 32. Future Versions

### v2: command workflow

Add:

```text
commands/validate-idea.md
```

Command behavior:

```text
1. Check if idea is specific enough.
2. If vague, recommend Office Hours.
3. If specific, run PMF Radar.
4. Produce PMF_RADAR.md.
```

### v3: lightweight scripts

Optional scripts:

- generate search queries;
- normalize evidence snippets;
- produce source tables;
- compare multiple ideas;
- export Markdown report.

### v4: optional source adapters

Optional adapters:

- Exa;
- Firecrawl;
- Reddit API;
- G2/Capterra accessible page search;
- GitHub issues search;
- App Store review search.

Do not build these until the instruction-only skill proves useful.

---

## 33. Source Notes

Useful external references for the local LLM to know about:

- OpenAI Codex Skills docs: https://developers.openai.com/codex/skills
- Exa MCP server: https://github.com/exa-labs/exa-mcp-server
- GStack Office Hours skill: https://github.com/garrytan/gstack/blob/main/office-hours/SKILL.md
- PM Skills Marketplace: https://github.com/phuryn/pm-skills

Internal source context:

- OperatorDesk PRD: collapse-layer AI back-office/customer-ops operator.
- CareLoop PRD: voice-first family care-ops assistant for aging parents.
- Comments thesis: AI infrastructure + human coordination era; AI collapsing operational costs; passive tools becoming active agents.
