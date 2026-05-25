# Source Playbook

Use public sources and user-provided material only. PMF Radar is
search-provider agnostic: use Exa if available, otherwise use normal web
search, web fetch, browser search, generic search, or user-provided links and
snippets.

## Tool Priority

1. Exa MCP, if available.
2. Native web search or web fetch, if available.
3. Browser-based or generic web search, if available.
4. User-provided links, snippets, reports, review pages, or pasted search results.

Useful Exa tools may include `web_search_exa`, `web_fetch_exa`, and
`web_search_advanced_exa` when available. Exa is optional; never block the
workflow only because Exa is missing.

## Reddit

Reddit is useful for complaints, buyer language, workaround descriptions, and
alternative discovery. Search it with domain filters such as
`includeDomains: ["reddit.com"]` when supported, or with queries such as
`site:reddit.com [target user] [workflow] frustrated`.

Limitations: Reddit is noisy and may not represent paying buyers. Treat Reddit
as evidence, not proof. If results are stale or incomplete, search specific
subreddits manually, use Google-like `site:reddit.com` queries, or ask the user
for relevant Reddit links.

## Source Buckets

Complaint sources:
- Reddit
- Hacker News
- Indie Hackers
- Product Hunt comments
- niche forums
- public Discord/community posts
- Quora
- blog comments
- YouTube comments
- X/Twitter or LinkedIn posts/comments when accessible

Review sources:
- G2
- Capterra
- TrustRadius
- Gartner Peer Insights when accessible
- Trustpilot
- App Store and Google Play reviews
- Chrome Web Store and Shopify App Store reviews
- WordPress plugin reviews
- GitHub issues, GitHub Discussions, and relevant npm issues

Competitor and alternative sources:
- competitor landing pages
- pricing pages
- docs/help centers
- case studies
- changelogs
- public roadmaps
- alternative-to pages
- review comparison pages
- agency or service provider pages

Existing spend sources:
- pricing pages
- job posts
- salary pages
- Upwork listings
- freelancer marketplaces
- agency pages
- BPO/provider pages
- consultant pages
- service directories
- "hire [role]" pages
- customer case studies
- public procurement or RFPs when relevant

Buyer and distribution sources:
- subreddits
- associations
- conferences
- newsletters
- podcasts
- LinkedIn groups/pages
- public Facebook groups
- public Slack/Discord communities
- trade publications
- industry directories
- local business directories

## Evidence Quality

Strong evidence:
- people already paying for a workaround
- people hiring humans to solve the problem
- repeated complaints across independent sources
- bad reviews of current tools
- users asking for recommendations
- direct quotes from target customers
- clear revenue loss, time loss, risk, or stress
- clear buyer with budget
- proof of workflow frequency or urgency

Medium evidence:
- expert essays
- industry trend reports
- founder opinions
- indirect complaints
- social media discussions
- competitor funding announcements
- category growth claims
- single-person anecdotes from plausible buyers

Weak evidence:
- generic TAM
- influencer threads
- AI-generated reports
- one-off anecdotes
- "this seems cool"
- vague trend claims
- complaints from non-buyers
- evidence of curiosity without purchase intent

Do not let weak evidence carry the verdict. Many weak signals without strong
signals usually means Research more or Park, not Build now.

## Source Safety

- Do not bypass paywalls.
- Do not scrape private communities.
- Do not use leaked data.
- Do not collect sensitive personal information.
- Do not expose user PII in the output.
- Quote minimally and summarize primarily.
- Include source links where available.
- Mark uncertain, stale, inferred, weak, or conflicting evidence.
- Respect site terms and access restrictions.
- For regulated markets such as healthcare, finance, legal, insurance, and
  elder care, add specific trust/compliance risk analysis.
