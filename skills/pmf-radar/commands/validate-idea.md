# /validate-idea

Run PMF Radar evidence research for a startup idea. This command does not validate the idea by itself.

## Input

Accept one of:

- a raw startup idea
- an Office Hours memo
- multiple ideas or verticals to compare
- post-MVP usage, revenue, interview, support, churn, or sales evidence

## Routing

- Raw idea: use PMF Radar Mode A and produce `pmf-radar-YYYY-MM-DD-{idea-slug}.md`.
- Multiple ideas or verticals: use Mode B and produce `pmf-comparison-YYYY-MM-DD-{theme-slug}.md`.
- Existing product evidence: use Mode C and produce `pmf-diagnosis-YYYY-MM-DD-{product-slug}.md`.

Never overwrite an existing PMF Radar report. If a generated name already exists, append `-2`, `-3`, or a short timestamp before `.md`.

If the idea is too broad, ask for the target user, workflow, buyer, and current workaround before researching.
