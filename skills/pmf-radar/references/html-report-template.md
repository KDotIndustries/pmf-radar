# HTML Report Template

Create a same-basename `.html` companion for every PMF Radar Markdown report.
The HTML report must include all substantive information from the Markdown
report: verdict, idea summary, target customer and buyer, assumptions, pain
evidence, complaint patterns, workaround, spend, competitor map, category
validation, wedge validation, best wedge, business model, validation test, risks,
scoring, final recommendation, and search log.

## Technical Rules

Use only these external resources:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

Do not use any other external CSS, JavaScript, images, icon libraries, analytics,
CDNs, or remote assets. Inline all report content. Avoid local build steps.

Use this Tailwind theme block:

```html
<style type="text/tailwindcss">
  @theme {
    --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  }
</style>
```

## Design Direction

Make the report feel like a polished investor/customer research memo, not a
generic document dump.

- Use a clean editorial dashboard layout with a strong verdict header.
- Keep the page readable on mobile and desktop.
- Use a sticky in-page navigation on wide screens.
- Use color intentionally: green for strong evidence, amber for unresolved
  tests, red for risks, slate for neutral structure.
- Keep cards flat and restrained with `rounded-lg`, subtle borders, and no
  decorative blobs or gradients.
- Use tables for evidence, competitors, and scoring.
- Use compact badges for verdict, signal strength, category validation, wedge
  validation, and risk level.
- Put the "Category validated vs wedge validated" section near the competitor
  map so the judgment is visible.
- Include a final action panel with the smallest sellable wedge, next test,
  success metric, and kill metric.

## Required Structure

Use the matching report title:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PMF Radar: [Idea Name]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style type="text/tailwindcss">
    @theme {
      --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
    }
  </style>
</head>
<body class="bg-slate-50 font-sans text-slate-950 antialiased">
  <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <header class="border-b border-slate-200 pb-6">
      <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">PMF Radar</p>
      <div class="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">[Idea Name]</h1>
          <p class="mt-3 max-w-3xl text-base leading-7 text-slate-600">[Idea in one sentence]</p>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Verdict</p>
          <p class="mt-1 text-2xl font-bold text-slate-950">[Verdict]</p>
        </div>
      </div>
    </header>

    <div class="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
      <nav class="hidden lg:block">
        <div class="sticky top-6 rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <a class="block py-1 font-medium text-slate-700" href="#evidence">Evidence</a>
          <a class="block py-1 font-medium text-slate-700" href="#market">Market</a>
          <a class="block py-1 font-medium text-slate-700" href="#wedge">Wedge</a>
          <a class="block py-1 font-medium text-slate-700" href="#risks">Risks</a>
          <a class="block py-1 font-medium text-slate-700" href="#action">Action</a>
          <a class="block py-1 font-medium text-slate-700" href="#search-log">Search log</a>
        </div>
      </nav>

      <div class="space-y-8">
        <section id="evidence" class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-xl font-bold text-slate-950">Pain Evidence</h2>
          <!-- Include the full pain evidence table from Markdown. -->
        </section>

        <section id="market" class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-xl font-bold text-slate-950">Competitors And Alternatives</h2>
          <!-- Include competitor map plus category validation vs wedge validation. -->
        </section>

        <section id="wedge" class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-xl font-bold text-slate-950">Best Wedge And Business Model</h2>
          <!-- Include best wedge and business model hypothesis. -->
        </section>

        <section id="risks" class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-xl font-bold text-slate-950">Why This Might Be Bad</h2>
          <!-- Include adversarial risks and scoring table. -->
        </section>

        <section id="action" class="rounded-lg border border-slate-900 bg-slate-950 p-5 text-white shadow-sm">
          <h2 class="text-xl font-bold">Final Recommendation</h2>
          <!-- Include final recommendation, validation test, success metric, and kill metric. -->
        </section>

        <section id="search-log" class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-xl font-bold text-slate-950">Search Log</h2>
          <!-- Include query themes, searched source types, findings, and evidence gaps. -->
        </section>
      </div>
    </div>
  </main>
</body>
</html>
```

## Mode Coverage

For Mode A, include all 16 Markdown sections.

For Mode B, include the overall recommendation, comparison table, best first
wedge, ideas to park or kill, 7-day test plan, and evidence gaps.

For Mode C, include PMF status, strongest segment, activation evidence, usage
evidence, revenue evidence, qualitative evidence, PMF risks, segment to double
down on, features to ignore, next 30-day experiment, and final recommendation.

If the HTML report omits a Markdown section, fix it before delivering.
