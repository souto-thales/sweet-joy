# Sweet & Joy — Claude Code Protocol

## Project Context
Static bilingual (EN/PT-BR) website for **Sweet & Joy by Vanessa Sulevis** — a custom cake and gourmet dessert bakery in Kernersville, NC. Primary goal is **sales conversion**, not branding. Full spec in `SWEET_JOY_SITE_PROMPT.md`.

## Tech Stack
- **Frontend:** Vanilla HTML + CSS + JS (no frameworks)
- **Form backend:** Web3Forms (key: `5de06771-2e3a-4aa5-9f1a-094124a0595f`)
- **Instagram feed:** Behold.so widget (feed-id: `X3KV2gcvdmljs6adDASa`)
- **Deployment:** Cloudflare Pages via MarcosSulevis/sweet-joy (auto-deploy on push)
- **Live URL:** https://sweetjoycakes.com
- **Fonts:** Google Fonts only (Cormorant Garamond + Outfit + Style Script)

## Git Setup
Two remotes, single push:
- `origin` → souto-thales/sweet-joy (source of truth)
- `origin` push also goes to → MarcosSulevis/sweet-joy (Cloudflare Pages deploy target)
- `git push` deploys to both automatically

## File Structure
```
/
├── CLAUDE.md
├── SWEET_JOY_SITE_PROMPT.md
├── index.html
├── style.css
├── script.js
├── sitemap.xml
└── assets/
    └── images/
        ├── cake1.jpeg … cake13.jpeg   ← hero carousel
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
- [x] Hero carousel (13 cake photos)
- [x] About section (founder.jpg)
- [x] Cakes portfolio section
- [x] Docinhos grid — 17 flavors, JS-rendered, real photos
- [x] How to Order interactive flow (JS state machine)
- [x] Order form — Web3Forms, validation, file upload for design references
- [x] Real Google reviews (Yuka Wakabayashi, Luciane Azevedo, Isabela Trimentose)
- [x] Instagram feed (Behold.so embed)
- [x] FAQ section
- [x] Language toggle EN/PT-BR (localStorage)
- [x] WhatsApp float button + Back to Top
- [x] SEO: canonical URL, sitemap.xml, JSON-LD, OG/Twitter tags (cake photo)
- [x] Deployed — Cloudflare Pages auto-deploys from MarcosSulevis/sweet-joy

### Pending (requires Vanessa's action)
- [ ] **Google Business Profile GPS** — registered coordinates are in the Pacific Ocean; fix by editing location pin at business.google.com → the Google Maps embed on the site will auto-correct once saved
- [ ] **Google Search Console** — Vanessa needs to provide HTML meta verification code; uncomment the placeholder in `index.html` line ~11 and push
