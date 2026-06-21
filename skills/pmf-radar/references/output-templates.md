# Output Templates

Use the selected mode's filename pattern and headings exactly. Do not add a fake
certainty score or claim the report validates the idea. Never write to a fixed
filename; repeated runs must not overwrite prior reports.

## Filename Rules

- Mode A: `pmf-radar-YYYY-MM-DD-{idea-slug}.md`
- Mode B: `pmf-comparison-YYYY-MM-DD-{theme-slug}.md`
- Mode C: `pmf-diagnosis-YYYY-MM-DD-{product-slug}.md`

Create the slug from the idea, comparison theme, or product name:
- lowercase
- ASCII letters and numbers
- hyphen-separated words
- no spaces or punctuation
- max 8 descriptive words

Use the current local date for `YYYY-MM-DD`. If the target file already exists,
append `-2`, `-3`, or a short timestamp before `.md`.

Do not use these fixed filenames because they cause overwritten reports:
- `PMF_RADAR.md`
- `PMF_COMPARISON.md`
- `PMF_DIAGNOSIS.md`

## Mode A - `pmf-radar-YYYY-MM-DD-{idea-slug}.md`

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

Explain in 3-6 sentences.

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
After the table, separate category validation from wedge validation:
- what competitors or alternatives prove buyers already pay for
- what they do not prove about this specific wedge
- what evidence would show the wedge is real

Example trap: customer service software is category-validated, but a headless customer service backend is wedge-validated only if buyers want to own the UI,
embed support natively, white-label support, or separate backend/control from
the support interface.

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

| Dimension | Score 1-5 | Rationale |
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

If recommending Build now, state the smallest sellable wedge, the distribution
test it enables, and why building is faster than asking for abstract purchase
intent. Do not recommend Build now only because a broad category has competitors.

## 16. Search log

List:
- query themes used
- source types searched
- what each source category revealed
- gaps in evidence
```

## Mode B - `pmf-comparison-YYYY-MM-DD-{theme-slug}.md`

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

## Mode C - `pmf-diagnosis-YYYY-MM-DD-{product-slug}.md`

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
