# CHANGELOG_AI.md

AI handoff ledger for this repository.
Every AI agent reads this before starting work and updates it before ending work.

---

### 2026-05-16 (lore expansion) — Claude Code (Opus 4.7)

Task:
- Add lifecycle thumbnails to the 5 About-page stage cards.
- Switch OG image to user-provided `opengraph_polyester.png`.
- Audit verbiage across all pages, fill the biggest gaps.
- Build out the 1985 "Mr. Leonard" origin story, then reconcile with the actual surviving audio.

Selected agent team:
- Default senior engineer (no specialized agent invoked).

Changes made:
- About: added small per-stage WebP thumbnails (resized via `cwebp` to 480px, ~19–38 KB each, written to `public/media/stage-*.webp`). Added a new "Fig. 3" section with Diet / Communication / Discovery cards, last linking to /our-story/.
- OG/Twitter cards: switched to `/media/opengraph_polyester.png` (1536×1024) with explicit width/height/alt in `app/layout.jsx`.
- Newsletter: new `components/NewsletterSignup.jsx` (Formspree-backed, dark/light variants), wired into footer.
- Footer rebuilt: 4-column layout (description + Learn + Act + Newsletter), added Contact / Our Story / Team / Safe-Communities links, "in memoriam of the East Quogue colony (1985)" line.
- Header nav: added Our Story.
- 4 new pages:
  - `/our-story/` — flagship lore page anchored on the **real** 1985 Z100 Scott Shannon Morning Zoo call by "Mr. Leonard." Reframed as in-universe testimony (Mr. Leonard genuinely distraught; on-air comedy framing was the only register a 7:40 AM morning show would allow). Quotes the actual recording, including the closing cry "I CAN BARELY SAY POLYEHE, POLYESE!" and the Shannon West-Quogue→East-Quogue correction that, in-universe, sent the 1986 Stony Brook intervention to the right town. Links to the YouTube video.
  - `/contact/` — 6 contact channels (general/press/hotline/counsel/legacy/sightings), 6 offices, Formspree contact form.
  - `/team/` — 8 leadership bios, 48 founding-charter signatories list, "Mr. Leonard not listed" note.
  - `/safe-communities/` — the 41 actually-listed certified municipalities, 5 criteria, 2 named decertifications. Fixes the prior dead `href="#"` on Take Action.
- Rescue Stories: added dates to each story, rollup-of-4 stats strip, full Report-a-Sighting Formspree form (split to `components/ReportSightingForm.jsx` so the page stays a server component with metadata).
- Threats: added 4-stat intro strip (CountUp) above the existing hero figure.
- Home: new "What, exactly, is a polyester?" card with CTAs to /about/ and /our-story/.
- Take Action: "View the 41 certified communities" now points to `/safe-communities/`.
- `lib/forms.js`: added `newsletter`, `contact`, `sighting` keys (all to existing FORMSPREE_ID `xdajnapp`).
- `app/sitemap.js`: registered the 4 new routes.

Audio transcription:
- Installed `yt-dlp` (Homebrew). YouTube now gates auto-caption fetches behind PO tokens for server IPs (consistent 429), so fell back to audio download → local Whisper.
- Installed `whisper-cpp` (Homebrew), pulled `ggml-base.en.bin` (~141 MB) to `/tmp/whisper-models/`.
- Pulled best audio for `oCCCkprVbCs` (137 s, "Z100 Mr Leonard 'Polyester' Call [WHTZ NYC] (1985)"), transcoded to 16 kHz mono WAV via yt-dlp's ffmpeg post-processor, transcribed in ~3.6 s.
- Saved raw transcript to `.ai/mr-leonard-transcript-1985.txt` (gitignored — see `.gitignore`). Base.en model is weak on proper nouns ("Quogue" → "Quad", "Trigère" → "Frisier/Tresier", "Sansabelt" → "Sensistly", "slaughter" → "spatter") — corrected interactively with the user (who recognized the bit from when he was 10).

Files touched:
- Added: `app/{our-story,contact,team,safe-communities}/page.jsx`, `components/{NewsletterSignup,ReportSightingForm}.jsx`, `public/media/stage-*.webp` (×5), `public/media/opengraph_polyester.png`, `images/opengraph_polyester.png`, `images/webp/*Photoroom.webp` (×10).
- Modified: `app/{page,layout,about/page,threats/page,rescue-stories/page,take-action/page,sitemap}.{jsx,js}`, `components/{SiteFooter,SiteHeader}.jsx`, `lib/forms.js`.

Commands/tests run:
```bash
cwebp -resize 480 0 -q 82 …  # 5× stage thumbnails
brew install yt-dlp whisper-cpp
yt-dlp -f bestaudio --extract-audio --audio-format wav … oCCCkprVbCs
whisper-cli -m ggml-base.en.bin -f /tmp/mrleonard.wav --output-txt
npx next build              # 23 routes prerendered, all green
```

Results:
- Build green throughout, 23 static routes (was 19).
- 4 new pages, 2 new components, newsletter wired, all dead `#` links resolved EXCEPT the WIP PDF placeholders (research downloads, poster downloads) — intentionally left per user.
- Transcript saved locally; YouTube link embedded on /our-story/.

Decisions made:
- Reconciled the in-universe lore with the actual surviving audio per user's call: kept Mr. Leonard's distress sincere, reframed the comedy-bit surface as the only register morning-drive radio permitted. Scott Shannon's accidental West→East Quogue correction is now the lore's pivot point.
- Picked one image per lifecycle stage from the 10 user-supplied photoroom files (defaults: tuftling/fledgefluff/sub_adult `_polyester` variants, spinner-Photoroom, elder2-Photoroom). Easy to swap by edit.
- Kept rescue-stories as a server component by extracting `ReportSightingForm` to its own client component — preserved `metadata` export.

Known issues:
- Research download/dataset/cite buttons and 4 poster downloads remain `href="#"` placeholders pending PDF work.
- Z100/Scott-Shannon proper nouns in lore are based on user identification + auto-transcript; some on-page detail (e.g. listing Joan Baez/Jackson Browne as picketers) comes from Mr. Leonard's own on-air claim, in-universe accepted as fact.

Next recommended steps:
- Generate the research PDFs + 4 poster PDFs and wire the `#` links.
- Consider a re-transcribe with `ggml-medium.en.bin` for cleaner proper nouns if anyone wants to put the transcript itself on /our-story/ as a sidebar.
- The 5 stage thumbnails could each get an alt text pass for screen readers (currently generic "Illustrated {phase} stage polyester").

Notes for next agent:
- All new forms point at `FORMSPREE_ID` (`xdajnapp`) via per-purpose keys in `lib/forms.js` — split endpoints when inbox routing matters.
- `/our-story/` is now load-bearing for site identity. Treat the West-Quogue→East-Quogue correction and "I CAN BARELY SAY POLYEHE, POLYESE!" line as canon.
- The `images/webp/*Photoroom.webp` source files are large originals; only the resized `public/media/stage-*.webp` are referenced in code. Consider gitignoring the originals if repo size becomes a concern.

---

### 2026-05-01 — Claude Code

Task:
- Created CLAUDE.md to wire the project's agent system into Claude Code natively
- Created this CHANGELOG_AI.md handoff ledger (was missing)

Selected agent team:
- Default senior engineer (no specialized agent needed for scaffolding task)

Changes made:
- Created `CLAUDE.md` — Claude Code config referencing agent system, handoff protocol, and startup/shutdown rules
- Created `CHANGELOG_AI.md` — initial handoff ledger

Files touched:
- `CLAUDE.md` (created)
- `CHANGELOG_AI.md` (created)

Commands/tests run:
```bash
# none — scaffolding only
```

Results:
- Claude Code will now auto-load CLAUDE.md on startup and follow the same agent-team-selection and handoff protocol as Codex

Decisions made:
- CLAUDE.md mirrors AGENTS.md intent without duplicating its full content — AGENTS.md remains the canonical cross-tool spec
- Kept CLAUDE.md concise; deferred to .ai/rules/ files for full detail

Known issues:
- None

Next recommended steps:
- Verify Claude Code picks up CLAUDE.md correctly on next session start
- Add project-specific context to CLAUDE.md as the codebase grows

Notes for next agent:
- Agent profiles are in `.ai/agents/` (241 files). Read agent-team-selection.md before picking a team.
- AGENTS.md is the universal contract; CLAUDE.md is the Claude-specific entry point that points to it.

---

### 2026-05-16 — Claude Code (Opus 4.7)

Task:
- Build the complete parody activism website specified in `Project Prompt "Save The Polyesters".md`
- Wire real existing images from `images/webp/` into the build
- Configure for GitHub Pages static export

Selected agent team:
- design-brand-guardian — fake-nonprofit visual identity (cream/moss/rose palette, serif display + Inter body)
- design-ux-architect — IA across 7 pages, sticky donation, scroll-storytelling
- design-visual-storyteller — straight-faced emotionally-manipulative copy in activist-nonprofit voice
- engineering-frontend-developer — Next.js 14 App Router + Tailwind + Framer Motion build
- marketing-seo-specialist — metadata, OG tags, NGO JSON-LD, sitemap/robots
- testing-accessibility-auditor — skip-link, focus rings, semantic landmarks, alt text

Changes made:
- Scaffolded a complete Next.js 14 (App Router) project at the repo root with Tailwind and Framer Motion
- Configured static export (`output: 'export'`, `images.unoptimized`, optional `NEXT_PUBLIC_BASE_PATH`) for GitHub Pages
- Built design system in `app/globals.css` and `tailwind.config.js` (cream/moss/rose pastel palette, Playfair Display + EB Garamond + Inter, pulse-glow CTA)
- Built 7 reusable components: `SiteHeader`, `SiteFooter`, `StickyDonate`, `Reveal` (Framer Motion scroll-in), `CountUp`, `LiveRescueCounter`, `DonationBanner`, `HabitatMap` (interactive SVG), `PopulationChart` (animated SVG), `StoryCard`
- Wrote all 7 required pages with full straight-faced satire copy:
  - Home: hero, live displacement counter, animated crisis stats, pull quote, 3-up intro, habitat map teaser, donation banner, image storytelling
  - About The Species: fake binomial classification, fake biology, 5-stage lifecycle, population chart, fur-harvesting process, habitat map
  - Threats: 8 fully written threat sections (data centers, urban sprawl, luxury apartments, fast fashion, climate change, AI infrastructure, road construction, industrial runoff) each with animated stat
  - Rescue Stories: 6 full field stories with photos, locations, summaries
  - Take Action: donate tiers + custom amount, adopt-a-polyester (3 individuals), 3 petitions with animated progress bars, vigil signup form, downloadable poster grid, Polyester-Safe Community certification
  - Research: 5 fake whitepapers with abstracts, partner list, population chart
  - Merchandise: 8 parody products with gradient covers + ISSMW-certified promise
- Added `app/not-found.jsx`, `app/sitemap.js`, `app/robots.js`, NGO JSON-LD in root layout, OG/Twitter metadata
- Copied optimized WebP images from `images/webp/` into `public/media/` so the static export includes them
- Added `public/favicon.svg`, `README.md`, `.gitignore`, `jsconfig.json`, `postcss.config.js`

Files touched:
- `package.json`, `next.config.mjs`, `tailwind.config.js`, `postcss.config.js`, `jsconfig.json`, `.gitignore` (created)
- `app/` — `globals.css`, `layout.jsx`, `page.jsx`, `not-found.jsx`, `sitemap.js`, `robots.js`, and `about/`, `threats/`, `rescue-stories/`, `take-action/`, `research/`, `merchandise/` page files (created)
- `components/` — 9 components (created)
- `public/favicon.svg`, `public/media/*.webp` (created/copied)
- `README.md` (created)
- `CHANGELOG_AI.md` (this entry)

Commands/tests run:
```bash
npm install
npm install next@14.2.33   # upgraded from 14.2.15 over security warning
npm run build              # static export — all 12 routes prerendered successfully
```

Results:
- `next build` compiled cleanly. All 12 routes (`/`, `/about`, `/threats`, `/rescue-stories`, `/take-action`, `/research`, `/merchandise`, `/_not-found`, plus `/sitemap.xml`, `/robots.txt`, internal asset routes) emit as static HTML in `out/`. First-load JS budget is healthy (87 kB shared, +0.4–4.8 kB per route).
- Site is responsive, accessible (skip link, focus rings, semantic landmarks, alt text on every image, ARIA on interactive map/counter/sticky CTA), SEO-equipped (per-page metadata, OG tags, JSON-LD), and ready to deploy.

Decisions made:
- Chose Next.js 14 (App Router) over plain HTML — the prompt requires Framer Motion + multi-page nav + scroll storytelling + SEO; Next gives all of this with `output: 'export'` for static hosting parity.
- Chose JSX (no TypeScript) to match the prompt's "Js" framing and reduce setup overhead.
- Built all 7 pages in one pass per the user's "Full site, all 7 pages" choice and the Codex Execution Optimization Rule in AGENTS.md.
- Reused the existing optimized WebP imagery (`images/webp/`) by copying into `public/media/`, rather than introducing a build-time copy script — keeps the repo simple.
- All petition/donation/adopt forms use local React state and a stub submit handler. No real backend, no real payment processor, no real data exfiltration — appropriate for parody.
- Strictly avoided naming real companies (data center, fashion, or AI). All threats are framed industry-categorically. All studies, journals, partner orgs, and individuals are invented.
- Skipped fake live video/audio embeds — the prompt mentions "dramatic background videos" but the existing Firefly MP4s are working files, not finished assets. Hero uses an existing campaign still as background instead.

Known issues:
- Next 14.2.33 still emits a deprecation warning about a security advisory; upgrading to Next 15 would require migrating image domains config and rechecking App Router conventions. Deferred to a follow-up.
- Tailwind `bg-grain` token defined but unused — kept for designers iterating on hero textures.
- Donation/adoption/petition forms are visual stubs only. Wire to a real platform (Stripe, Donorbox, Action Network) before any public launch.

Next recommended steps:
- Decide on a real fulfillment path for donations/adoptions/petitions, or leave the forms as visual stubs and add an "All forms are inert — this site is satire" banner in the footer if you ever publish it publicly.
- Replace stat numbers and rescue stories with whatever new bits you want; everything is hardcoded in the page files for easy editing.
- Optionally add Open Graph image variants (currently both OG and Twitter cards reuse `/media/baby_polyester_campaign.webp`).
- Optionally generate poster PDFs and wire them to the `/take-action/#posters` download buttons (currently `#` placeholders).
- Optionally migrate to Next 15 to clear the security advisory warning.

Notes for next agent:
- Static export is configured. `npm run build` writes a fully self-contained `out/` directory.
- For GitHub Pages project sites, set `NEXT_PUBLIC_BASE_PATH=/<repo-name>` before building.
- All copy lives directly in each page's component — no CMS, no MDX. Find-and-edit text in `app/<route>/page.jsx`.
- The brand voice rule: completely straight delivery, treat every claim as real, never wink at the camera. Read the Editorial Guidelines section of `README.md` before editing copy.

---

### 2026-05-16 (later) — Claude Code (Opus 4.7)

Task:
- Iterative polish + Cloudflare deploy setup + initial GitHub push.

Selected agent team:
- design-ux-architect — mobile responsive sweep, hero layout, footer cleanup
- engineering-frontend-developer — Formspree wiring, map overlay refactor, Cloudflare config
- devops-engineer — wrangler config + GitHub publishing

Changes made:
- Removed the now-redundant "Polyesters displaced this year" stat from the home stats grid; live counter above already shows it. Grid switched to 1→3 columns.
- Mobile responsive sweep: new `clamp()`-based `.stat-num` token, `tabular-nums`, `min-w-0` on grid items; `CountUp` gained a `compact` prop ("4.3M" on phones); `LiveRescueCounter` rescaled with `clamp()`; donate/adopt grids 1→2→4 on small breakpoints.
- Habitat map: dropped hand-coded SVG continents; replaced with `HabitatOverlay` rendering the user-supplied `public/media/world_map.svg` (2.8 MB raw, ~178 KB gzipped) with overlaid marker dots whose positions are configured in `lib/map-positions.js` (per-region xPct/yPct percentages, easy to fine-tune by sight).
- Extracted canonical region + status data to `lib/regions.js`; deleted `components/RegionList.jsx`.
- Hero: removed the cream-50 disc that was masking the alpha channel on `baby_polyester-trans.webp`; only the soft rose-glow blur remains behind the image.
- Threats page: DC-damage image now renders at its natural 1329×1183 aspect with a captioned moss-green footer bar.
- Footer: dropped the redundant Legal column from the main grid; removed the rose-tinted Satire-Notice strip; horizontal legal-links bar (containing the Satire Notice link) is now the single source.
- Legal pages: added 7 docs under `app/legal/` (Satire Notice, Terms, Privacy/GDPR/CCPA, Cookies, EULA, Accessibility/ADA/WCAG/Section 508/EAA, ESG) sharing a sidebar layout; added a global `CookieConsent` banner persisting choice in `localStorage`.
- Formspree: installed `@formspree/react`; wired 3 petition forms, vigil signup form, and a new Polyester-Safe Community certification packet intake form to endpoint `xdajnapp` (centralized in `lib/forms.js`). Each form carries hidden `_subject`, `form_type`, and `_gotcha` honeypot fields. Donate UI left as visual mockup (financial hold).
- Cloudflare: added `wrangler.jsonc` configured for Workers Static Assets (`compatibility_date: 2026-05-16`), `.nvmrc` pinning Node 20, and `npm run deploy` / `npm run preview` scripts. README updated with both the manual `wrangler deploy` flow and the dashboard Git-integration flow.
- Initialized git repo at project root and pushed `main` to `https://github.com/hottweelz/save-the-polyesters`.

Files touched:
- `app/page.jsx`, `app/about/page.jsx`, `app/threats/page.jsx`, `app/take-action/page.jsx`, `app/layout.jsx`
- `app/legal/{layout,terms,privacy,cookies,eula,accessibility,esg,disclaimer}/page.jsx`
- `app/globals.css`, `app/sitemap.js`
- `components/{HabitatOverlay,CookieConsent,SiteFooter,SiteHeader,LiveRescueCounter,CountUp}.jsx`
- `lib/{regions,map-positions,forms}.js`
- `public/media/world_map.svg`
- `package.json`, `wrangler.jsonc`, `.nvmrc`, `README.md`, `CHANGELOG_AI.md`

Commands/tests run:
```bash
npm install @formspree/react
npm run build           # 19 routes prerendered, ~140 kB first-load JS on heavy pages
git init && git add . && git commit
git remote add origin https://github.com/hottweelz/save-the-polyesters.git
git push -u origin main
```

Results:
- Build green throughout.
- Static `out/` directory is the deploy artifact for both Cloudflare paths.
- Initial commit pushed to GitHub `main`.

Decisions made:
- Picked Cloudflare Workers Static Assets over legacy Pages because in 2026 they're the same platform and Workers is the documented forward path. Config is plain enough to migrate to Pages-style Git deploy without code changes.
- Did NOT add wrangler as a devDependency; relying on `npx wrangler …` so version is unpinned. If reproducibility becomes important, pin via devDep.
- Did NOT install pdf-lib or generate research PDFs — user paused on PDFs pending more polyester imagery.
- Did NOT wire any donation/financial processor — user paused on financial integrations (possible web3/meme-coin pivot).
- Marker positions in `lib/map-positions.js` seeded from equirectangular math; the supplied map's aspect ratio (1.53:1) suggests a different projection, so positions will need a calibration pass by eye.

Known issues:
- Habitat map markers likely off until calibrated against the actual SVG's projection.
- `next@14.2.33` still carries a deprecation/security advisory; consider upgrading to Next 15.

Next recommended steps:
- Connect the GitHub repo to Cloudflare in the dashboard (Workers & Pages → Create → Pages → Connect to Git) to get auto-deploy + PR previews.
- Calibrate marker positions in `lib/map-positions.js` by eye against the live map.
- When more polyester imagery arrives: refresh Threats / Research / About hero illustrations, then revisit PDF generation.

Notes for next agent:
- All Formspree forms point at a single endpoint `xdajnapp` in `lib/forms.js`; split into multiple endpoints if you want per-form inboxes/routing.
- The map is a plain `<img>` (not next/image) on purpose — SVG + the image optimizer has been historically fussy and the file is already small gzipped.
