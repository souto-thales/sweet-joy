# Sweet & Joy — Claude Code Protocol

## Project Context
Static bilingual (EN/PT-BR) website for **Sweet & Joy by Vanessa Sulevis** — a custom cake and gourmet dessert bakery in Kernersville, NC. Primary goal is **sales conversion**, not branding. Full spec in `SWEET_JOY_SITE_PROMPT.md`.

## Tech Stack
- **Frontend:** Vanilla HTML + CSS + JS (no frameworks)
- **Form backend:** Web3Forms (key: `5de06771-2e3a-4aa5-9f1a-094124a0595f`)
- **Instagram feed:** Behold.so widget (feed-id: `X3KV2gcvdmljs6adDASa`)
- **Static hosting:** Cloudflare Workers Builds via MarcosSulevis/sweet-joy (auto-deploy on push, assets-only)
- **API Worker:** Cloudflare Worker in Thales's account — `sweet-joy.thalessouto.workers.dev`
- **Live URL:** https://sweetjoycakes.com
- **Fonts:** Google Fonts only (Cormorant Garamond + Outfit + Style Script)

## Architecture — Two Cloudflare Accounts

**Critical:** sweetjoycakes.com is served by a Worker on **Marcos's Cloudflare account** (Workers Builds, assets-only). The API Worker is in **Thales's Cloudflare account** (account ID: `ea0d7ce79a23434ad8f14cd6901199cc`).

| Layer | Account | URL | Deploy |
|---|---|---|---|
| Static site (HTML/CSS/JS) | Marcos | sweetjoycakes.com | Auto via git push (uses `wrangler.public.jsonc`) |
| API Worker | Thales | sweet-joy.thalessouto.workers.dev | Manual: `npx wrangler deploy` (uses `wrangler.jsonc`) |

**Two wrangler configs, on purpose:**
- `wrangler.jsonc` — full Worker config (KV binding, `worker.js` API routes). Used by Thales's manual deploys to his account.
- `wrangler.public.jsonc` — assets-only (no KV, no Worker script). Used by Marcos's Worker Builds deploy command: `npx wrangler deploy --config wrangler.public.jsonc`. Non-production branch command: `npx wrangler versions upload --config wrangler.public.jsonc`.

**Never remove `worker.js`, `wrangler.jsonc`, or `wrangler.public.jsonc` from git** — removing `wrangler.public.jsonc` breaks Marcos's auto-deploy; removing `worker.js`/`wrangler.jsonc` breaks Thales's manual deploys.

**After any Worker code change:** run `npx wrangler deploy` from the project root. If the ADMIN_PASSWORD secret is ever lost (e.g. after a redeploy), restore it with: `echo "Vanessa1@" | npx wrangler secret put ADMIN_PASSWORD`

**workers.dev doubles as preview/staging:** `wrangler.jsonc` has `assets: { directory: "." }`, so `npx wrangler deploy` pushes the *entire site* (HTML/CSS/JS/images) to `sweet-joy.thalessouto.workers.dev`, not just the API. Useful to preview changes before they hit production. The Worker upload is fast (uploads only changed files). Requires fresh wrangler auth (`npx wrangler login`) if token expired.

## Vacation Mode System

Vanessa's self-service portal to announce absences. All state stored in Cloudflare KV.

| Item | Value |
|---|---|
| KV namespace | `VACATION_CONFIG` (ID: `24cc5fddfb594b85aa1dedea8ac6fad8`) |
| Admin panel (workers.dev) | https://sweet-joy.thalessouto.workers.dev/admin |
| Admin panel (main site) | https://sweetjoycakes.com/admin |
| Admin password | `Vanessa1@` (stored as Cloudflare Worker Secret) |
| Session TTL | 30 days (token stored in `localStorage` as `sj.admin.token`) |

**How it works:**
1. Vanessa logs in at `/admin`, sets vacation dates + custom message, clicks Enable
2. `script.js` fetches `/api/vacation` on page load from `sweet-joy.thalessouto.workers.dev`
3. Banner logic:
   - **≤10 days before start** → "Heads up" preview banner
   - **During vacation** → "I'm away" banner + notice prepended to order form
   - **After end date** → no banner
4. Order form blocks any event_date inside the vacation window — inline bilingual error directs the customer to pick a date from `endDate + 1` onward. Pre- and post-vacation dates still submit normally (5-day minimum lead time still enforced).

**Worker API routes (`worker.js`):**
- `GET  /api/health` — health check
- `GET  /api/vacation` — public, wildcard CORS, returns vacation config from KV
- `POST /api/admin/login` — password auth, returns session token
- `POST /api/admin/vacation` — save vacation config (requires Bearer token)

**CORS:** Public vacation endpoint uses `*`. Admin endpoints use `https://sweetjoycakes.com` only.

## Git Setup
Two remotes, single push:
- `origin` → souto-thales/sweet-joy (source of truth)
- `origin` push also goes to → MarcosSulevis/sweet-joy (Cloudflare Worker Builds deploy target)
- `git push` deploys to both automatically

**`.github/workflows/sync-fork.yml`** — guarded with `if: github.repository == 'souto-thales/sweet-joy'` so it only runs on the source-of-truth repo. Without the guard, it also runs on Marcos's fork and fails (missing `MARCOS_SYNC_TOKEN` secret), sending spurious failure emails. Keep the guard if you ever edit this file.

## File Structure
```
/
├── CLAUDE.md
├── SWEET_JOY_SITE_PROMPT.md
├── index.html
├── admin.html          ← Vanessa's vacation admin panel
├── style.css
├── script.js
├── worker.js           ← Cloudflare Worker (API routes + static asset fallback)
├── wrangler.jsonc      ← Full Worker config (Thales's manual deploy — KV + worker.js)
├── wrangler.public.jsonc ← Assets-only config (Marcos's auto-deploy — no KV, no worker.js)
├── sitemap.xml
├── _headers            ← Security headers
├── .assetsignore       ← Excludes worker/config files from being served as assets
└── assets/
    └── images/
        ├── cake1.jpeg … cake14.jpeg   ← hero carousel (14 photos)
        ├── founder.jpg                ← Vanessa photo (About section)
        ├── logo.png
        ├── logo-simplified.png
        ├── logo-simplified-white.png
        └── gourmet sweets/            ← 17 flavor photos for docinhos grid
└── References/                        ← brand assets, not served
```

## Design Tokens
```css
--color-bg:      #FFF0EE;
--color-primary: #C4867A;
--color-accent:  #3D2B2B;
--color-white:   #FFFFFF;
```
Typography: elegant script display + refined sans-serif. NO Inter, NO Roboto, NO Arial.

## 🚀 Vibe-Coding Rules (High Autonomy)
- **Programming Autonomy:** Do not ask for permission on code structure, CSS decisions, or JS implementation. You are the Lead Engineer.
- **Silent Mode:** No preambles, no explanations. Just execute.
- **Decision Making:** Pick the simplest, most performant option. Only interrupt the user for:
  1. Design direction approvals (before writing any code)
  2. Concept clarifications
  3. Final review at the end of each Task

## 🛠 Implementation Standards
- **Token Efficiency:** Refer to files by path. Do not read entire files into context unless actively modifying them.
- **Brevity:** Keep chat responses focused on "Task X complete."
- **Bilingual:** Every text node must have `data-en` and `data-pt` attributes — no hardcoded strings without both languages.
- **Mobile-first:** All CSS starts from mobile breakpoint up.
- **Images:** Always have the user save photos directly as real JPEG files into `assets/images/`. Never copy from the Claude image cache and rename — cache files are often PNG regardless of extension, which breaks the carousel.

## 🎨 Design Rules
- Aesthetic target: **Soft Luxury Editorial** — high-end patisserie feel.
- NEVER use generic bakery templates, purple gradients, or clipart aesthetics.

## Key References
| Item | Value |
|---|---|
| WhatsApp | (336) 989-1342 |
| WhatsApp link | https://wa.me/13369891342 |
| Email | vanessa.sulevis@gmail.com |
| Instagram | https://www.instagram.com/sweetjoync/ |
| Facebook | https://www.facebook.com/profile.php?id=61582126022768 |
| Web3Forms key | `5de06771-2e3a-4aa5-9f1a-094124a0595f` |
| Behold.so feed ID | `X3KV2gcvdmljs6adDASa` |

## Current Status — Site is LIVE

### Done
- [x] Full site live at sweetjoycakes.com
- [x] Hero carousel (14 cake photos — cake1–cake14)
- [x] About section (founder.jpg)
- [x] Cakes portfolio section
- [x] Docinhos grid — 17 flavors, JS-rendered, real photos
- [x] How to Order — process-flow infographic (4 steps: Size → Batter → Fillings → Optional Sweets) with SVG icons + CTA scrolling to order form
- [x] Order form — Web3Forms, validation, multi-flavor Sweet Treats picker (per-flavor min 30, hidden `docinhos_selection` consolidates rows for email/WhatsApp), file upload for design references
- [x] Real Google reviews (Yuka Wakabayashi, Luciane Azevedo, Isabela Trimentose)
- [x] Instagram feed (Behold.so embed)
- [x] FAQ section
- [x] Language toggle EN/PT-BR (localStorage)
- [x] WhatsApp float button + Back to Top
- [x] SEO: canonical URL, sitemap.xml, JSON-LD, OG/Twitter tags (cake photo)
- [x] Deployed — Cloudflare Workers Builds auto-deploys from MarcosSulevis/sweet-joy (assets-only via `wrangler.public.jsonc`)
- [x] Vacation mode — admin portal + banner + form notice + 10-day preview + event-date order block during vacation window

### Pending (requires Vanessa's action)
- [ ] **Google Business Profile GPS** — registered coordinates are in the Pacific Ocean; fix by editing location pin at business.google.com → the Google Maps embed on the site will auto-correct once saved
- [ ] **Google Search Console** — Vanessa needs to provide HTML meta verification code; uncomment the placeholder in `index.html` line ~11 and push
- [ ] **WhatsApp Business auto-reply** — set directly in the WhatsApp Business app (native feature, not site-related)
