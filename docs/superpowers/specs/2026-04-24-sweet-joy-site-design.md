# Sweet & Joy — Site Design Spec

**Date:** 2026-04-24
**Project:** Sweet & Joy by Vanessa Sulevis — bilingual bakery website
**Goal:** Sales conversion (cake orders, gourmet sweets) for both American local and Brazilian/Latino audiences in Kernersville, NC
**Stack:** Vanilla HTML + CSS + JS, deployed to Cloudflare Pages, no build step
**Reference spec:** `SWEET_JOY_SITE_PROMPT.md` (full requirements)

---

## 1. Aesthetic Direction

**Soft Luxury Editorial** — high-end patisserie magazine. Romantic, feminine, hand-crafted. NOT generic bakery pink, NOT clipart.

Brand language pulled from references:
- Hand-drawn cake silhouette and cursive wordmark from logo
- Heart bullet points and warm coral price badges from Docinhos sheet
- Dark brown text on blush surfaces from business card
- Asymmetric, breathable layouts

---

## 2. Design Tokens

```css
:root {
  /* Colors */
  --color-bg:      #FFF0EE;  /* blush surface */
  --color-cream:   #FFF8F5;  /* lighter alt surface for cards / alternating sections */
  --color-primary: #C4867A;  /* mauve */
  --color-coral:   #E89380;  /* warm coral — price badges, active states, CTA hover */
  --color-accent:  #3D2B2B;  /* dark brown — text, borders */
  --color-white:   #FFFFFF;

  /* Typography */
  --font-display:  "Cormorant Garamond", serif;       /* italic for headlines */
  --font-body:     "Outfit", system-ui, sans-serif;
  --font-script:   "Style Script", cursive;           /* brand wordmark / accents */

  /* Spacing scale */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
  --space-6: 6rem;

  /* Layout */
  --max-width: 1200px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-pill: 999px;

  /* Motion */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 200ms;
  --dur-med:  450ms;
  --dur-slow: 800ms;
}
```

Google Fonts URL (load only weights used):
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&family=Style+Script&display=swap
```

---

## 3. Signature Detail

**Hand-drawn "frosting drip" SVG dividers** between every section, animated to draw-on-scroll via `stroke-dasharray`/`stroke-dashoffset` transition triggered by IntersectionObserver. Mauve stroke (`--color-primary`), 1.5px weight.

Supporting signature elements:
- 1–2% opacity SVG film-grain overlay on hero only (`<svg><filter>` with `feTurbulence`)
- Asymmetric soft blush "blob" SVG behind hero logo
- Heart-shaped bullet points in feature lists (matching Docinhos sheet aesthetic)

---

## 4. Layout & Composition

### Hero (desktop, asymmetric)
- Logo seal right, slightly off-center, on soft blush blob
- Headline + tagline left, ~55% width, overlapping the blob
- CTAs below tagline ([Order Now] [See Our Work])
- Subtle grain overlay across hero
- Staggered fade-in on load: blob → logo → headline → tagline → CTAs (200ms stagger)

### Hero (mobile)
- Centered stack: logo → headline → tagline → CTAs
- Same staggered animation

### Section rhythm
- Alternating `--color-bg` ↔ `--color-cream` backgrounds for visual rhythm
- Frosting-drip SVG divider between every section
- Scroll-reveal: each section fades up + draws divider as it enters viewport

### Container
- `max-width: var(--max-width)`, horizontal padding `var(--space-3)` mobile / `var(--space-5)` desktop
- Mobile-first; one breakpoint at 768px (tablet/desktop)

---

## 5. Component Inventory

| Component | Purpose | Notes |
|---|---|---|
| Header | Sticky nav | Logo (simplified), section links, EN/PT toggle |
| Hero | Conversion entry | Asymmetric, grain, staggered animation |
| About | Trust building | Founder photo + bilingual story (3–4 sentences) |
| HowToOrder | Interactive funnel | 3 pill-step cards, live summary, pre-fills form |
| Docinhos | Product showcase | Grid of cards, hover lift, "Order This" CTA |
| InstagramFeed | Social proof | Behold.so widget placeholder |
| OrderForm | Primary conversion | Web3Forms POST, conditional fields, pre-population |
| Contact | Channels + map | WhatsApp / email / Instagram / Facebook + Google Maps embed placeholder |
| Footer | Brand close | Logo, social icons, language toggle (repeat), copyright |
| WhatsAppFAB | Persistent CTA | Fixed bottom-right, blush bg, pulse animation |
| BackToTop | UX polish | Appears after 400px scroll |

---

## 6. How to Order — Interaction Spec

Three pill-shaped step cards (horizontal on desktop, stacked on mobile):

1. **Step 1 — Cake Size:** 4 pill options (4" / 6" / 10" / 12"), each shows servings + price
2. **Step 2 — Batter:** 2 pill options (Vanilla / Chocolate)
3. **Step 3 — Fillings:** 12 pill options, multi-select, max 2 (UI prevents 3rd selection)

States per pill: default → hover (lift + coral border) → selected (filled coral, white text, check icon) → disabled (when max reached)

**Live summary panel** (right column desktop, below steps mobile):
- Shows current selections as they're made
- "Build My Order →" CTA disabled until all 3 steps complete
- On click: scroll to Order Form + dispatch state to pre-fill `cake_size`, `batter_flavor`, `fillings[]`

State stored in single JS object `orderBuilder.state`. No persistence needed (session-scoped).

---

## 7. Order Form — Behavior Spec

**Submission:** POST to `https://api.web3forms.com/submit` with `access_key=PLACEHOLDER_WEB3FORMS_KEY`, `subject="New Order Request — Sweet & Joy"`, `redirect=false`. Receive JSON response, render inline thank-you state on success / inline error state on failure. No page redirect.

**Order notification flow (post-submit):** On successful Web3Forms response, build a WhatsApp message containing a human-readable order summary (name, event date, product interest, cake size/batter/fillings, docinhos qty, special requests) and open `https://wa.me/13369891342?text=<URL-encoded summary>` in a new tab. Customer reviews and taps Send; Vanessa receives the order instantly on her WhatsApp. Web3Forms email to Vanessa still fires in parallel as the system-of-record. The thank-you UI shows two states: (1) success + "We've also opened WhatsApp so you can confirm directly with Vanessa — just tap Send" with a manual "Open WhatsApp" fallback link in case the popup was blocked, (2) success-only message if the customer's device has no WhatsApp handler. Cost: $0, no API, no backend.

**Pre-population sources:**
1. From How to Order section → fill size, batter, fillings
2. From Docinhos product card "Order This" → fill `product_interest=Gourmet Sweets`, scroll to form
3. Default state if user navigates directly → all empty

**Conditional fields:**
- Cake fields (size, batter, fillings) shown only when `product_interest` includes "Custom Cake"
- Docinhos quantity shown only when `product_interest` includes "Gourmet Sweets"
- Both shown when "Both" selected

**Validation:** Required fields validated on submit with inline error states (red border + helper text below input). Email format check. Date must be ≥ 7 days out. Filling checkbox: max 2.

---

## 8. Bilingual System

- Default language: English. Persist user choice in `localStorage.lang`.
- Every text node carries `data-en="..."` and `data-pt="..."` attributes.
- Toggle button (header + footer) flips a single state var → JS swaps `textContent` for all nodes with both attrs.
- `<html lang="...">` updated on toggle for accessibility.
- No page reload, no separate URLs.

---

## 9. Animation & Motion

- **Page load:** Hero staggered fade-in (blob 0ms → logo 200ms → headline 400ms → tagline 600ms → CTAs 800ms)
- **Scroll reveal:** IntersectionObserver with `threshold: 0.15`. Each entering section gets `.is-visible` class → fade up 24px + opacity 0→1, duration `var(--dur-med)`
- **Frosting-drip dividers:** Draw via `stroke-dashoffset` 0→length, duration `var(--dur-slow)`, triggered by same observer
- **Product cards hover:** lift 4px + scale 1.02 + shadow, transition `var(--dur-fast) var(--ease)`
- **WhatsApp FAB:** subtle 2s pulse loop (scale 1 → 1.06 → 1)
- **Reduced motion:** All animations gated by `@media (prefers-reduced-motion: reduce)` → instant transitions

---

## 10. Responsive Strategy

Mobile-first. One breakpoint at `768px`.

| Section | Mobile | Desktop |
|---|---|---|
| Header | Hamburger menu | Inline nav |
| Hero | Centered stack | Asymmetric split |
| About | Photo above text | Photo left, text right |
| HowToOrder | Stacked steps | 3 columns + summary panel |
| Docinhos | 1 col | 2–3 col grid |
| OrderForm | Single column | Two-column (50/50) |
| Contact | Stacked | Map left, info right |
| Footer | Stacked | 3 columns |

---

## 11. File Structure

```
/
├── CLAUDE.md
├── SWEET_JOY_SITE_PROMPT.md
├── docs/superpowers/specs/
│   └── 2026-04-24-sweet-joy-site-design.md  (this file)
├── index.html
├── style.css
├── script.js
└── assets/
    ├── logo-simplified.jpeg
    ├── logo-full.jpeg
    ├── business-card.jpeg
    └── images/
        ├── hero-bg.jpg
        ├── founder.jpg
        ├── cake-custom-01.jpg
        ├── cake-custom-02.jpg
        ├── docinhos-01.jpg
        └── docinhos-02.jpg
```

`script.js` internal organization (single file, logical sections):
1. **i18n** — language toggle + localStorage persist
2. **scrollReveal** — IntersectionObserver controller
3. **orderBuilder** — How to Order state machine + form pre-fill dispatcher
4. **formHandler** — Web3Forms submit + validation + inline status + WhatsApp redirect builder
5. **utils** — back-to-top, smooth-scroll, WhatsApp pulse, mobile menu

---

## 12. Out of Scope

- Build tooling (no bundler, no PostCSS, no Tailwind)
- Tests (per project CLAUDE.md: no tests unless requested)
- CMS (static content)
- Analytics (post-launch concern)
- Custom domain config (post-launch checklist in `index.html`)

---

## 13. Post-Launch (handoff to user)

The HTML file ends with a comment listing manual steps Vanessa or Thales must complete:
1. Register Web3Forms → replace `PLACEHOLDER_WEB3FORMS_KEY`
2. Register Behold.so → connect `@sweetjoync` → paste embed
3. Add real product photos to `assets/images/`
4. Add founder photo
5. Set up Google Business Profile
6. Submit sitemap to Google Search Console
7. Point custom domain to Cloudflare Pages

---

## 14. Implementation Order (per project CLAUDE.md)

| Task | Scope |
|---|---|
| 1 | HTML scaffold — all sections, bilingual `data-en`/`data-pt` attributes |
| 2 | CSS — tokens, typography, mobile-first layout, alternating section bgs |
| 3 | Hero animations + scroll reveal (IntersectionObserver) + frosting-drip dividers |
| 4 | How to Order interactive selector + state + pre-fill dispatch |
| 5 | Order Form — Web3Forms integration, validation, conditional fields |
| 6 | Language toggle + localStorage |
| 7 | WhatsApp FAB + Back to Top + final polish |
| 8 | Behold.so placeholder + Instagram section |
| 9 | Cross-browser QA + Cloudflare Pages deploy |

User confirms each task with `/compact` per project protocol.
