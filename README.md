# Save The Polyesters

Parody activism website for the (entirely fictional) **Polyester Conservation Coalition** — a satirical riff on emotionally manipulative wildlife-nonprofit campaigning. Played completely straight, on the surface.

This is **satire and parody**. *Polysynthia domestica* does not exist. Polyester does not come from animals. No real companies or individuals are targeted.

---

## Stack

- **Next.js 14** (App Router, static export)
- **Tailwind CSS** with custom pastel/moss/rose palette
- **Framer Motion** for scroll-reveal, hero animations, donation banner
- **Formspree** (`@formspree/react`) for petition / vigil / certification intake forms
- JSX (no TypeScript), no backend — fully static, deployable anywhere

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Production build (static HTML)

```bash
npm run build        # emits ./out/
```

The `out/` directory is a complete static site (`next.config.mjs` sets `output: 'export'`). Serve it from any static host.

### Site URL (used for OG image, sitemap, JSON-LD)

All absolute URLs are derived from one env var at build time:

```bash
NEXT_PUBLIC_SITE_URL=https://savethepolyesters.org
```

Fallback order: `NEXT_PUBLIC_SITE_URL` → Cloudflare's auto-set `CF_PAGES_URL`
→ `http://localhost:3000`. Until you set a real domain, social-media scrapers
will see the placeholder, so set this in the Cloudflare dashboard
(**Workers & Pages → your project → Settings → Variables → Production**)
the moment you have a domain.

### Deploying to Cloudflare (Workers Static Assets)

Repo: <https://github.com/hottweelz/save-the-polyesters>.
Config lives in [`wrangler.jsonc`](wrangler.jsonc) — uploads `./out` to Cloudflare's edge as Workers Static Assets (the unified Workers + Pages platform).

**Option A — manual deploy from your laptop**

```bash
npx wrangler login          # one-time browser auth
npm run deploy              # runs `next build && wrangler deploy`
```

The first deploy creates the Worker named `save-the-polyesters` in your Cloudflare account. Subsequent `npm run deploy` calls update it.

**Option B — auto-deploy on git push (recommended)**

In the Cloudflare dashboard:

1. **Workers & Pages → Create → Pages → Connect to Git**
2. Pick `hottweelz/save-the-polyesters`, branch `main`.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variables: `NODE_VERSION = 20`
4. Save & deploy.

Every push to `main` will trigger a build at Cloudflare and publish to your `*.pages.dev` URL. Pull-request branches get preview URLs automatically.

**Local preview against the Cloudflare runtime**

```bash
npm run preview             # builds, then runs `wrangler dev` against ./out
```

## Project structure

```
app/
  layout.jsx           Root layout, fonts, metadata, JSON-LD
  page.jsx             Home — hero, live counter, stats, habitat map
  about/page.jsx       The Species — classification, lifecycle, harvesting process
  threats/page.jsx     Eight threat sections with stats
  rescue-stories/      Six field rescue stories
  take-action/page.jsx Donate, adopt, petitions, vigil signup, posters, certification
  research/page.jsx    Five fake whitepapers
  merchandise/page.jsx Eight parody products
  legal/<page>         Satire notice, ToS, privacy, cookies, EULA, accessibility, ESG
  sitemap.js / robots.js
components/
  SiteHeader / SiteFooter / StickyDonate / CookieConsent
  Reveal               Framer Motion scroll-in wrapper
  CountUp              Animated number counter (with `compact` prop)
  LiveRescueCounter    Live-ticking displacement counter
  DonationBanner       Reusable emotional CTA
  HabitatOverlay       World-map image with overlaid region markers
  PopulationChart      Animated SVG decline chart
  StoryCard            Rescue-story card
lib/
  regions.js           Canonical region + status data
  map-positions.js     Per-region marker percentages on the world map
  forms.js             Formspree endpoint config
public/
  media/               Optimized WebP assets + world_map.svg
  favicon.svg
```

## Map calibration

Marker positions live in [`lib/map-positions.js`](lib/map-positions.js) as percentages
of the rendered image box. They're seeded from equirectangular math; the supplied
`world_map.svg` probably uses a different projection, so the dots will need a
fine-tuning pass. Open `npm run dev`, scroll to the habitat map, and nudge each
`xPct` / `yPct` by eye until each dot sits on its city.

## Forms

All Formspree-backed forms (petitions, vigil signup, certification packet) point at
a single endpoint configured in [`lib/forms.js`](lib/forms.js). Each submission
carries a `_subject` and `form_type` field so you can route/filter in Formspree.
A `_gotcha` honeypot is included on every form.

## Editorial guidelines (the parody itself)

- **Never break character.** The site treats every claim as completely real.
- **No real companies or individuals** are named or accused. All threats are framed as industry-categorical (data centers, fast fashion, urban sprawl), never brand-specific.
- **Fictional sources only.** All studies, journals, partner orgs, and people are invented.
- The humor is in the straight delivery. Resist the urge to wink at the camera.

## Source of truth

Per repo convention (`AGENTS.md`, `CLAUDE.md`), the source of truth is the code and `CHANGELOG_AI.md` — not chat history.

## License

For private/parody use. Do not represent the Polyester Conservation Coalition as a real organization, do not solicit real donations, and do not represent its research as peer-reviewed.
