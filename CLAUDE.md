# Sweet & Joy — Claude Code Protocol

## Project Context
Static bilingual (EN/PT-BR) website for **Sweet & Joy by Vanessa Sulevis** — a custom cake and gourmet dessert bakery in Kernersville, NC. Primary goal is **sales conversion**, not branding. Full spec in `SWEET_JOY_SITE_PROMPT.md`.

## Tech Stack
- **Frontend:** Vanilla HTML + CSS + JS (no frameworks)
- **Form backend:** Web3Forms (no backend required)
- **Instagram feed:** Behold.so widget embed
- **Deployment:** Cloudflare Pages (static, no build step)
- **Fonts:** Google Fonts only

## File Structure
```
/
├── CLAUDE.md
├── SWEET_JOY_SITE_PROMPT.md
├── index.html
├── style.css
├── script.js
└── assets/
    ├── logo-simplified.jpeg
    ├── logo-full.jpeg
    ├── business-card.jpeg
    └── images/         ← product photo placeholders
└── References/
    ├── Informações básicas
    ├── Business Card.jpeg
    ├── Logo.jpeg
    ├── Logo Simplified.jpeg
    ├── Docinhos Gourmet.jpeg
    ├── How to order.jpeg
    └── How to order in PT-BR.jpeg
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
- **Placeholders:** All image slots must have descriptive `class` and `alt` attributes for easy swap later.

## 🎨 Design Rules
- Read `/mnt/skills/public/frontend-design/SKILL.md` before writing any CSS.
- Aesthetic target: **Soft Luxury Editorial** — high-end patisserie feel.
- Signature detail: grain texture overlay on hero + SVG hand-drawn dividers between sections.
- NEVER use generic bakery templates, purple gradients, or clipart aesthetics.

## ⚙️ Superpowers Protocol
- **Planning phase:** Use **Opus** — architecture, design direction, component structure
- **Implementation phase:** Use **Sonnet** — all code generation and iteration
- Always present the plan and wait for user approval before switching to Sonnet

## 📅 Milestone Protocol (The /compact Rule)
At the end of every major Task, stop and prompt the user:
> *"Task [X] is verified. Please run `/compact` now to optimize tokens before we proceed."*

## Suggested Task Breakdown
| Task | Scope |
|---|---|
| Task 1 | HTML structure + all sections scaffolded, bilingual attributes in place |
| Task 2 | CSS — design tokens, typography, layout, mobile-first responsive |
| Task 3 | Hero animations + scroll-reveal (IntersectionObserver) |
| Task 4 | How to Order interactive selector (JS state + form pre-population) |
| Task 5 | Order Form — Web3Forms integration, validation, conditional fields |
| Task 6 | Language toggle (EN/PT-BR switch + localStorage) |
| Task 7 | WhatsApp float button + Back to Top + final polish |
| Task 8 | Behold.so placeholder + Instagram section |
| Task 9 | Cross-browser QA, performance check, Cloudflare Pages deploy test |

## Key References
| Item | Value |
|---|---|
| WhatsApp | (336) 989-1342 |
| WhatsApp link | https://wa.me/13369891342 |
| Email | vanessa.sulevis@gmail.com |
| Instagram | https://www.instagram.com/sweetjoync/ |
| Web3Forms key | PLACEHOLDER — register at web3forms.com |
| Behold.so | PLACEHOLDER — register at behold.so, connect @sweetjoync |

## Current Status
- [x] Brand brief complete
- [x] Product data complete (cakes + docinhos)
- [x] Reference assets in `/References/`
- [x] Build spec: `SWEET_JOY_SITE_PROMPT.md`
- [ ] Site implementation — not started
