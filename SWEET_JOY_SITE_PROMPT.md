# Sweet & Joy — Bakery Website Prompt
## Claude Code Build Spec

---

## ⚙️ Skills & Tools — Read Before Starting

### 1. Superpowers Plugin
This project uses the **Superpowers plugin** for Claude Code.
- Use **Opus** for architecture planning, design decisions, and any ambiguous requirement
- Use **Sonnet** for implementation, code generation, and iteration
- Workflow: think with Opus first → implement with Sonnet

### 2. Frontend Design Skill
Before writing any code, read and apply the frontend-design skill located at:
`/mnt/skills/public/frontend-design/SKILL.md`

Key directives from that skill:
- Commit to a **BOLD, intentional aesthetic direction** before coding
- Choose **distinctive typography** — NO Inter, NO Roboto, NO Arial
- Use **CSS variables** for all colors and design tokens
- Apply **scroll-triggered animations** via IntersectionObserver
- Create **atmospheric backgrounds** — gradient mesh, noise textures, or grain overlays
- Make it **UNFORGETTABLE** — one signature detail that defines the design
- Aesthetic target for this project: **Soft Luxury Editorial** — high-end patisserie magazine feel

---

## Project Goal

> This is NOT a branding site. Primary goal is **SALES CONVERSION** and business growth.

- Expand from the Brazilian/Latino community to the **local American audience** in Kernersville, NC
- Function as a **dual-channel lead capture platform** — WhatsApp for Brazilians, Order Form for Americans
- The site must look and feel premium enough to justify ordering custom cakes at $40–$140+

---

## Brand Identity

| Property | Value |
|---|---|
| Business Name | Sweet & Joy by Vanessa Sulevis |
| Tagline | "Crafted with Love" |
| Location | Kernersville, NC |
| Instagram | @SweetJoyNC |
| Facebook | Sweet & Joy |
| WhatsApp | (336) 989-1342 |
| Email | vanessa.sulevis@gmail.com |

**Color Palette:**
```css
--color-bg:       #FFF0EE;  /* blush background */
--color-primary:  #C4867A;  /* mauve / terracota */
--color-accent:   #3D2B2B;  /* dark brown — text, borders */
--color-white:    #FFFFFF;
```

**Typography:**
- Display/headings: elegant script or high-contrast serif (Cormorant Garamond, Playfair Display Italic, or similar)
- Body: refined sans-serif that complements — NOT a generic system font
- Source: Google Fonts (load only what's needed)

**Brand Assets (available in `/assets/`):**
- `logo-simplified.jpeg` — line art logo on blush background
- `logo-full.jpeg` — full circular seal "by Vanessa Sulevis"
- `business-card.jpeg` — reference for brand identity

---

## Bilingual Toggle

- **Default language: English**
- Toggle button in top-right header: 🇺🇸 EN | 🇧🇷 PT
- Switches ALL visible text via JS — no page reload
- Implementation: `data-en="..."` and `data-pt="..."` attributes on all text nodes
- Persist user preference in `localStorage`
- Purpose: serves American locals (EN) and Brazilian/Latino community (PT-BR)

---

## Dual-Channel Contact Strategy

| Audience | Preferred Channel | Primary CTA |
|---|---|---|
| Brazilian / Latino | WhatsApp | Floating WhatsApp button (always visible) |
| American local | Email / Form | Order Form → Web3Forms → email |

Both channels must coexist. The WhatsApp button floats on every section.

---

## Site Structure
### Single Page App — smooth scroll between sections

---

### Section 1: HERO

- Full-width atmospheric section
- Centered logo + tagline "Crafted with Love"
- Two CTAs side by side:
  - **[Order Now]** → scrolls to Order Form section
  - **[See Our Work]** → scrolls to Instagram Feed section
- Background: subtle blush gradient mesh or soft grain texture overlay
- Staggered fade-in animation on page load (logo → tagline → CTAs)

---

### Section 2: ABOUT

- Short brand story — handcrafted, made with love, Brazilian baker bringing authentic flavors to NC
- Warm and personal tone — builds trust with American audience
- Photo placeholder: `<img class="founder-photo" alt="Vanessa Sulevis - Sweet & Joy Bakery">`
- Keep it concise — 3–4 sentences max

**EN:** "Every cake and sweet is made from scratch with premium ingredients and love. Vanessa Sulevis brings authentic Brazilian confectionery traditions to Kernersville, NC — from buttery brigadeiros to show-stopping custom cakes for your most special moments."

**PT:** "Cada bolo e docinho é feito do zero com ingredientes de qualidade e muito amor. Vanessa Sulevis traz a tradição da confeitaria brasileira para Kernersville, NC — dos brigadeiros irresistíveis aos bolos personalizados para os seus momentos mais especiais."

---

### Section 3: HOW TO ORDER YOUR CUSTOM CAKE

**Purpose:** Interactive conversion funnel — selections auto-populate the Order Form.

Design as an elegant 3-step interactive selector. Selected options highlight visually (filled card, color change). Store selections in JS state and inject into the Order Form fields when user clicks "Build My Order →".

**Step 1 — Choose Your Cake Size:**

| Size | Servings | Price |
|---|---|---|
| 4" | 6–8 slices | $40 |
| 6" | 12–15 slices | $60 |
| 10" | 30–35 slices | $100 |
| 12" | 45–50 slices | $140 |

Add-ons available: cake topper & flowers

**Step 2 — Choose Your Batter Flavor:**
- Vanilla
- Chocolate

**Step 3 — Choose 2 Fillings:**
- Chocolate
- Coconut
- Three-milk
- White Chocolate
- Strawberry & White Chocolate
- Pineapple & Coconut
- Caramel
- Strawberry & Dark Chocolate Mousse
- Walnut & Praline
- Red Velvet & Cream Cheese
- Powdered Ninho Milk & Nutella
- Customize your own

CTA at bottom: **[Build My Order →]** → scrolls to Order Form with pre-populated fields

---

### Section 4: GOURMET SWEETS (Docinhos Gourmet)

Display as elegant product cards with hover lift effect.
Pricing: per 100 units.

| English Name | Portuguese Name | Price/100 |
|---|---|---|
| Chocolate Brigadeiro w/ Vermicelli | Brigadeiro de chocolate com Vermicelli | $80 |
| Chocolate Brigadeiro w/ Granulé | Brigadeiro de chocolate com Granulé | $100 |
| Coconut Brigadeiro | Brigadeiro de coco | $80 |
| Two-Flavor Brigadeiro | Brigadeiro dois amores | $80 |
| Peanut Brigadeiro | Brigadeiro de amendoim | $80 |
| Ninho Milk Brigadeiro | Brigadeiro de ninho | $80 |
| Strawberry Brigadeiro | Brigadeiro de morango (Nesquik) | $80 |
| Sicilian Lemon Brigadeiro | Brigadeiro de limão siciliano | $80 |
| Oreo Brigadeiro | Brigadeiro de Oreo | $90 |
| Churros Brigadeiro | Brigadeiro de churros | $90 |
| Passion Fruit Brigadeiro | Brigadeiro de maracujá | $90 |
| Salted Caramel Brigadeiro | Brigadeiro de caramelo salgado | $90 |
| Walnut Brigadeiro | Brigadeiro de nozes | $100 |
| Pistachio Brigadeiro | Brigadeiro de Pistache | $100 |
| Grape Surprise | Surpresa de uva | $100 |
| Alcoholic Brigadeiro | Brigadeiro alcoólico | $100 |
| Chocolate Cups w/ Filling* | Copinhos de chocolate com recheio* | $100 |

*Cup fillings: coconut cream, pistachio, brigadeiro with cherry, passion fruit

Each card: product name (bilingual toggle), price badge, placeholder image slot, "Order This" button that pre-fills the Order Form.

---

### Section 5: INSTAGRAM FEED

- Section title: **"Fresh from Our Kitchen"** / **"Fresquinho da nossa cozinha"**
- Behold.so widget embed for **@sweetjoync**
- Place a clearly labeled placeholder in the code:
```html
<!-- BEHOLD.SO: Register at behold.so, connect @sweetjoync, paste embed code here -->
<div class="behold-widget" id="behold-placeholder">
  [Instagram feed loads here after Behold.so setup]
</div>
```
- CTA below feed: **"Follow us @SweetJoyNC"** → https://www.instagram.com/sweetjoync/

---

### Section 6: ORDER FORM ⭐ Most Important Section

> This is the primary conversion tool for the American audience. Design it beautifully — wide layout, generous padding, elegant inputs, premium feel.

**Form submission via Web3Forms (free, no backend):**
```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="PLACEHOLDER_WEB3FORMS_KEY">
  <input type="hidden" name="subject" value="New Order Request — Sweet & Joy">
  <input type="hidden" name="redirect" value="false">
  ...
</form>
```

**Fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | text | ✅ | |
| Email | email | ✅ | Primary for American audience |
| Phone / WhatsApp | tel | ❌ | Optional — primary for Brazilian audience |
| Event Date | date | ✅ | Date picker |
| Product Interest | select | ✅ | Custom Cake / Gourmet Sweets / Both / Other |
| Cake Size | radio | conditional | Show if Custom Cake selected |
| Batter Flavor | radio | conditional | Vanilla / Chocolate |
| Filling Choices | checkbox | conditional | Multi-select, max 2, from filling list |
| Docinhos Quantity | number | conditional | Show if Gourmet Sweets selected, min 100 |
| Special Requests | textarea | ❌ | |
| How did you find us? | select | ❌ | Instagram / Facebook / Friend or Family / Google / Other |

**Behavior:**
- If user came from Section 3 selector → pre-populate size, batter, fillings
- If user clicked "Order This" on a product card → pre-populate Product Interest
- On success: show inline thank-you message — do NOT redirect
- On error: show friendly inline error message
- Validate required fields before submit with clear inline error states

---

### Section 7: CONTACT

- WhatsApp link: https://wa.me/13369891342
- Email: vanessa.sulevis@gmail.com
- Instagram: @SweetJoyNC → https://www.instagram.com/sweetjoync/
- Facebook: Sweet & Joy
- Location: Kernersville, NC *(home bakery — no street address)*
- Google Maps embed placeholder for Kernersville, NC area

---

### Section 8: FOOTER

- Logo + "Crafted with Love"
- Social icon links (Instagram, Facebook, WhatsApp)
- Language toggle (repeat)
- `© 2025 Sweet & Joy by Vanessa Sulevis · Kernersville, NC`

---

## Floating / Persistent Elements

**WhatsApp Floating Button — fixed bottom-right, always visible:**
```
Link: https://wa.me/13369891342?text=Hi!%20I'd%20like%20to%20place%20an%20order%20with%20Sweet%20%26%20Joy
Style: blush/pink background, WhatsApp icon, subtle pulse animation
```

**Back to Top button** — appears after 400px scroll

---

## Technical Requirements

| Requirement | Spec |
|---|---|
| Stack | Static HTML + CSS + Vanilla JS |
| Deployment target | Cloudflare Pages (no build step) |
| Responsive | Mobile-first, fully responsive |
| Fonts | Google Fonts — load only what's used |
| Animations | IntersectionObserver + CSS transitions for scroll reveal |
| Form backend | Web3Forms (free tier — 250 submissions/month) |
| Instagram feed | Behold.so widget (placeholder in code) |
| Frameworks | None required — keep it lightweight |

---

## File Structure

```
/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── logo-simplified.jpeg
    ├── logo-full.jpeg
    ├── business-card.jpeg
    └── images/
        ├── hero-bg.jpg          <!-- placeholder: hero atmospheric photo -->
        ├── founder.jpg          <!-- placeholder: Vanessa photo -->
        ├── cake-custom-01.jpg   <!-- placeholder: custom cake photo -->
        ├── cake-custom-02.jpg   <!-- placeholder: custom cake photo -->
        ├── docinhos-01.jpg      <!-- placeholder: brigadeiros photo -->
        └── docinhos-02.jpg      <!-- placeholder: brigadeiros closeup -->
```

---

## Design Execution Notes

Apply the **frontend-design skill** with these project-specific directives:

- **Aesthetic:** Soft luxury editorial — think high-end patisserie magazine, not Canva template
- **Signature detail:** Subtle grain/noise texture overlay on hero section + hand-drawn style SVG dividers between sections
- **Hero:** Asymmetric composition — logo slightly off-center, text overlapping a soft blush shape
- **Product cards:** Hover = lift shadow + slight scale, elegant border reveal
- **Order Form:** Wide single-column on mobile, two-column on desktop, generous spacing, inputs with bottom-border-only style
- **How to Order:** Step cards should feel interactive and tactile — selected state is clear and satisfying
- **Animations:** Staggered fade-up on scroll for all section entries; no jarring transitions
- **AVOID:** Cookie-cutter bakery pink, clipart, generic stock photo layouts, any purple

---

## Post-Launch Checklist
> Include this as an HTML comment at the bottom of `index.html`

```html
<!--
POST-LAUNCH TODO:
1. Web3Forms: register at web3forms.com → replace PLACEHOLDER_WEB3FORMS_KEY
2. Behold.so: register → connect @sweetjoync → replace placeholder with embed code
3. Add real product photos to /assets/images/
4. Add founder photo (Vanessa) to /assets/
5. Set up Google Business Profile: "Sweet & Joy Kernersville NC"
6. Submit sitemap to Google Search Console
7. Point domain to Cloudflare Pages (if custom domain desired)
-->
```
