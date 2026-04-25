# Sweet & Joy Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Sweet & Joy bilingual single-page bakery site per `docs/superpowers/specs/2026-04-24-sweet-joy-site-design.md` — static, premium, conversion-optimized, $0 hosting/backend.

**Architecture:** Single static page. `index.html` carries semantic HTML for 8 sections with `data-en`/`data-pt` attributes on every text node. `style.css` uses CSS custom properties for the full token system. `script.js` is one file organized into five logical modules (i18n, scrollReveal, orderBuilder, formHandler, utils). Web3Forms submits the order email; on success we open a prefilled `wa.me/...` URL so the customer can tap Send and WhatsApp Vanessa directly. Behold.so widget is inserted as a placeholder div. Deploy: drag-drop to Cloudflare Pages.

**Tech Stack:** HTML5, CSS3 (custom props, `@media`, `@supports`), ES2020+ JS (IntersectionObserver, fetch, URL, localStorage). Google Fonts: Cormorant Garamond, Outfit, Style Script. No build tools, no framework, no npm.

**Testing posture:** Per project CLAUDE.md, no automated tests. Verification after each task = open `index.html` in a browser (or `python3 -m http.server 8080` for module-safe loads), check the specific behaviors listed in that task at 375px mobile and 1280px desktop, confirm the browser console is clean (zero errors, zero warnings other than Behold/Web3Forms placeholders).

**Commit posture:** Project is not yet a git repo. Task 0 initializes it. Every subsequent task ends with a local commit. No push unless the user requests it.

---

## File Structure

| File | Responsibility | Created in |
|---|---|---|
| `.gitignore` | Exclude OS/editor cruft | Task 0 |
| `index.html` | Full semantic markup, all sections, bilingual attrs, form | Task 1 |
| `style.css` | Design tokens + every rule in the site | Tasks 2–7 (additive) |
| `script.js` | All JS modules (i18n, scrollReveal, orderBuilder, formHandler, utils) | Tasks 4, 6, 8, 9, 10 (additive) |
| `assets/` | Logos + product photo placeholders | Pre-existing |
| `docs/superpowers/specs/2026-04-24-sweet-joy-site-design.md` | Design spec (reference) | Pre-existing |

Every code block in this plan is the literal code to paste/write. Preserve CSS variable names, element IDs, class names, and JS function names exactly — later tasks depend on them.

---

## Task 0: Project Setup

**Files:**
- Create: `/Volumes/SecondBrain/Claude/Sweet & Joy/.gitignore`

- [ ] **Step 1: Initialize git**

```bash
cd "/Volumes/SecondBrain/Claude/Sweet & Joy"
git init
git symbolic-ref HEAD refs/heads/main
```

- [ ] **Step 2: Create `.gitignore`**

Write to `/Volumes/SecondBrain/Claude/Sweet & Joy/.gitignore`:

```
.DS_Store
Thumbs.db
node_modules/
.vscode/
.idea/
*.log
.env
.env.local
```

- [ ] **Step 3: Confirm asset folders exist**

```bash
ls assets/ References/
mkdir -p assets/images
```

Expected: `logo-full.jpeg`, `logo-simplified.jpeg`, `business-card.jpeg` present in `assets/`.

- [ ] **Step 4: Initial commit**

```bash
git add .gitignore CLAUDE.md SWEET_JOY_SITE_PROMPT.md docs/ assets/ References/
git commit -m "Initial project state with spec and brand assets"
```

**Verification:** `git log --oneline` shows one commit; `git status` clean.

---

## Task 1: HTML Scaffold

**Files:**
- Create: `/Volumes/SecondBrain/Claude/Sweet & Joy/index.html`

Produces the complete HTML shell with every section, every field, every text node carrying `data-en`/`data-pt`. No styling. No JS yet (empty `script.js` referenced). Later tasks add styling/behavior without touching markup structure.

- [ ] **Step 1: Write `index.html`**

Write the full content below to `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" data-en="Custom cakes and gourmet Brazilian sweets crafted with love in Kernersville, NC." data-pt="Bolos personalizados e doces gourmet brasileiros feitos com amor em Kernersville, NC." content="Custom cakes and gourmet Brazilian sweets crafted with love in Kernersville, NC." />
  <title data-en="Sweet & Joy — Custom Cakes & Gourmet Sweets | Kernersville, NC" data-pt="Sweet & Joy — Bolos Personalizados e Doces Gourmet | Kernersville, NC">Sweet & Joy — Custom Cakes & Gourmet Sweets | Kernersville, NC</title>

  <link rel="icon" type="image/jpeg" href="assets/logo-simplified.jpeg" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&family=Style+Script&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- ============ HEADER ============ -->
  <header class="site-header" id="siteHeader">
    <div class="container header-inner">
      <a href="#hero" class="brand" aria-label="Sweet & Joy home">
        <img src="assets/logo-simplified.jpeg" alt="Sweet & Joy" class="brand-logo" />
        <span class="brand-wordmark">Sweet &amp; Joy</span>
      </a>

      <nav class="site-nav" aria-label="Primary">
        <a href="#about" data-en="About" data-pt="Sobre">About</a>
        <a href="#how-to-order" data-en="How to Order" data-pt="Como Pedir">How to Order</a>
        <a href="#docinhos" data-en="Sweets" data-pt="Docinhos">Sweets</a>
        <a href="#order-form" data-en="Order" data-pt="Encomendar">Order</a>
        <a href="#contact" data-en="Contact" data-pt="Contato">Contact</a>
      </nav>

      <button type="button" class="lang-toggle" id="langToggle" aria-label="Switch language">
        <span class="lang-flag" aria-hidden="true">🇺🇸</span>
        <span class="lang-label">EN</span>
      </button>

      <button type="button" class="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- ============ HERO ============ -->
  <section class="hero" id="hero">
    <div class="hero-grain" aria-hidden="true"></div>
    <svg class="hero-blob" aria-hidden="true" viewBox="0 0 600 600" preserveAspectRatio="none">
      <path d="M430,90 C520,140 560,250 530,360 C500,470 400,540 290,520 C180,500 90,420 80,310 C70,200 160,100 270,80 C340,65 370,55 430,90 Z" fill="#F6D7D1"/>
    </svg>

    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="hero-eyebrow" data-en="Kernersville, NC" data-pt="Kernersville, NC">Kernersville, NC</p>
        <h1 class="hero-title" data-en="Crafted with Love" data-pt="Feito com Amor">Crafted with Love</h1>
        <p class="hero-sub" data-en="Exclusive cakes and gourmet desserts that delight the eyes and the palate." data-pt="Bolos e doces exclusivos que encantam aos olhos e ao paladar.">Exclusive cakes and gourmet desserts that delight the eyes and the palate.</p>
        <div class="hero-cta">
          <a href="#order-form" class="btn btn-primary" data-en="Order Now" data-pt="Encomendar">Order Now</a>
          <a href="#instagram" class="btn btn-ghost" data-en="See Our Work" data-pt="Ver Nossos Bolos">See Our Work</a>
        </div>
      </div>

      <div class="hero-seal">
        <img src="assets/logo-full.jpeg" alt="Sweet &amp; Joy by Vanessa Sulevis — Crafted with Love" />
      </div>
    </div>
  </section>

  <!-- drip divider -->
  <div class="drip-divider" aria-hidden="true" data-drip></div>

  <!-- ============ ABOUT ============ -->
  <section class="about" id="about">
    <div class="container about-inner">
      <div class="about-photo">
        <img src="assets/images/founder.jpg" alt="Vanessa Sulevis - Sweet & Joy Bakery" class="founder-photo" onerror="this.classList.add('is-placeholder'); this.removeAttribute('src');" />
      </div>
      <div class="about-copy">
        <p class="eyebrow" data-en="Our Story" data-pt="Nossa História">Our Story</p>
        <h2 class="section-title" data-en="Every sweet, made from scratch" data-pt="Cada doce, feito do zero">Every sweet, made from scratch</h2>
        <p class="about-body" data-en="Every cake and sweet is made from scratch with premium ingredients and love. Vanessa Sulevis brings authentic Brazilian confectionery traditions to Kernersville, NC — from buttery brigadeiros to show-stopping custom cakes for your most special moments." data-pt="Cada bolo e docinho é feito do zero com ingredientes de qualidade e muito amor. Vanessa Sulevis traz a tradição da confeitaria brasileira para Kernersville, NC — dos brigadeiros irresistíveis aos bolos personalizados para os seus momentos mais especiais.">Every cake and sweet is made from scratch with premium ingredients and love. Vanessa Sulevis brings authentic Brazilian confectionery traditions to Kernersville, NC — from buttery brigadeiros to show-stopping custom cakes for your most special moments.</p>
      </div>
    </div>
  </section>

  <div class="drip-divider" aria-hidden="true" data-drip></div>

  <!-- ============ HOW TO ORDER ============ -->
  <section class="how-to-order" id="how-to-order">
    <div class="container">
      <header class="section-head">
        <p class="eyebrow" data-en="Custom Cakes" data-pt="Bolos Personalizados">Custom Cakes</p>
        <h2 class="section-title" data-en="Build Your Cake" data-pt="Monte seu Bolo">Build Your Cake</h2>
        <p class="section-sub" data-en="Pick a size, a batter and two fillings — we'll handle the magic." data-pt="Escolha o tamanho, a massa e dois recheios — a mágica é com a gente.">Pick a size, a batter and two fillings — we'll handle the magic.</p>
      </header>

      <div class="builder">
        <div class="builder-steps">
          <!-- Step 1 -->
          <div class="builder-step" data-step="1">
            <div class="builder-step-head">
              <span class="step-num">1</span>
              <h3 data-en="Choose your size" data-pt="Escolha o tamanho">Choose your size</h3>
            </div>
            <div class="pill-grid" data-field="size">
              <button type="button" class="pill" data-value="4" data-label-en='4" · 6–8 slices · $40' data-label-pt='4" · 6–8 fatias · US$40'><strong>4"</strong><span data-en="6–8 slices · $40" data-pt="6–8 fatias · US$40">6–8 slices · $40</span></button>
              <button type="button" class="pill" data-value="6" data-label-en='6" · 12–15 slices · $60' data-label-pt='6" · 12–15 fatias · US$60'><strong>6"</strong><span data-en="12–15 slices · $60" data-pt="12–15 fatias · US$60">12–15 slices · $60</span></button>
              <button type="button" class="pill" data-value="10" data-label-en='10" · 30–35 slices · $100' data-label-pt='10" · 30–35 fatias · US$100'><strong>10"</strong><span data-en="30–35 slices · $100" data-pt="30–35 fatias · US$100">30–35 slices · $100</span></button>
              <button type="button" class="pill" data-value="12" data-label-en='12" · 45–50 slices · $140' data-label-pt='12" · 45–50 fatias · US$140'><strong>12"</strong><span data-en="45–50 slices · $140" data-pt="45–50 fatias · US$140">45–50 slices · $140</span></button>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="builder-step" data-step="2">
            <div class="builder-step-head">
              <span class="step-num">2</span>
              <h3 data-en="Choose your batter" data-pt="Escolha a massa">Choose your batter</h3>
            </div>
            <div class="pill-grid" data-field="batter">
              <button type="button" class="pill" data-value="Vanilla" data-label-en="Vanilla" data-label-pt="Baunilha"><strong data-en="Vanilla" data-pt="Baunilha">Vanilla</strong></button>
              <button type="button" class="pill" data-value="Chocolate" data-label-en="Chocolate" data-label-pt="Chocolate"><strong data-en="Chocolate" data-pt="Chocolate">Chocolate</strong></button>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="builder-step" data-step="3">
            <div class="builder-step-head">
              <span class="step-num">3</span>
              <h3 data-en="Choose 2 fillings" data-pt="Escolha 2 recheios">Choose 2 fillings</h3>
            </div>
            <div class="pill-grid pill-grid--dense" data-field="fillings" data-multi="2">
              <button type="button" class="pill" data-value="Chocolate" data-label-en="Chocolate" data-label-pt="Chocolate"><span data-en="Chocolate" data-pt="Chocolate">Chocolate</span></button>
              <button type="button" class="pill" data-value="Coconut" data-label-en="Coconut" data-label-pt="Coco"><span data-en="Coconut" data-pt="Coco">Coconut</span></button>
              <button type="button" class="pill" data-value="Three-milk" data-label-en="Three-milk" data-label-pt="Três leites"><span data-en="Three-milk" data-pt="Três leites">Three-milk</span></button>
              <button type="button" class="pill" data-value="White Chocolate" data-label-en="White Chocolate" data-label-pt="Chocolate branco"><span data-en="White Chocolate" data-pt="Chocolate branco">White Chocolate</span></button>
              <button type="button" class="pill" data-value="Strawberry & White Chocolate" data-label-en="Strawberry &amp; White Chocolate" data-label-pt="Morango &amp; Chocolate branco"><span data-en="Strawberry &amp; White Chocolate" data-pt="Morango &amp; Chocolate branco">Strawberry &amp; White Chocolate</span></button>
              <button type="button" class="pill" data-value="Pineapple & Coconut" data-label-en="Pineapple &amp; Coconut" data-label-pt="Abacaxi &amp; Coco"><span data-en="Pineapple &amp; Coconut" data-pt="Abacaxi &amp; Coco">Pineapple &amp; Coconut</span></button>
              <button type="button" class="pill" data-value="Caramel" data-label-en="Caramel" data-label-pt="Caramelo"><span data-en="Caramel" data-pt="Caramelo">Caramel</span></button>
              <button type="button" class="pill" data-value="Strawberry & Dark Chocolate Mousse" data-label-en="Strawberry &amp; Dark Chocolate Mousse" data-label-pt="Morango &amp; Mousse de chocolate"><span data-en="Strawberry &amp; Dark Chocolate Mousse" data-pt="Morango &amp; Mousse de chocolate">Strawberry &amp; Dark Chocolate Mousse</span></button>
              <button type="button" class="pill" data-value="Walnut & Praline" data-label-en="Walnut &amp; Praline" data-label-pt="Nozes &amp; Praliné"><span data-en="Walnut &amp; Praline" data-pt="Nozes &amp; Praliné">Walnut &amp; Praline</span></button>
              <button type="button" class="pill" data-value="Red Velvet & Cream Cheese" data-label-en="Red Velvet &amp; Cream Cheese" data-label-pt="Red Velvet &amp; Cream Cheese"><span data-en="Red Velvet &amp; Cream Cheese" data-pt="Red Velvet &amp; Cream Cheese">Red Velvet &amp; Cream Cheese</span></button>
              <button type="button" class="pill" data-value="Powdered Ninho Milk & Nutella" data-label-en="Ninho Milk &amp; Nutella" data-label-pt="Leite Ninho &amp; Nutella"><span data-en="Ninho Milk &amp; Nutella" data-pt="Leite Ninho &amp; Nutella">Ninho Milk &amp; Nutella</span></button>
              <button type="button" class="pill" data-value="Customize your own" data-label-en="Customize your own" data-label-pt="Personalizar"><span data-en="Customize your own" data-pt="Personalizar">Customize your own</span></button>
            </div>
          </div>
        </div>

        <aside class="builder-summary" aria-live="polite">
          <p class="eyebrow" data-en="Your Cake" data-pt="Seu Bolo">Your Cake</p>
          <dl class="summary-list">
            <div><dt data-en="Size" data-pt="Tamanho">Size</dt><dd id="sumSize" data-en="—" data-pt="—">—</dd></div>
            <div><dt data-en="Batter" data-pt="Massa">Batter</dt><dd id="sumBatter" data-en="—" data-pt="—">—</dd></div>
            <div><dt data-en="Fillings" data-pt="Recheios">Fillings</dt><dd id="sumFillings" data-en="—" data-pt="—">—</dd></div>
          </dl>
          <button type="button" class="btn btn-primary" id="buildMyOrderBtn" disabled data-en="Build My Order →" data-pt="Fazer meu Pedido →">Build My Order →</button>
          <p class="summary-hint" data-en="Complete all 3 steps to continue." data-pt="Complete as 3 etapas para continuar.">Complete all 3 steps to continue.</p>
        </aside>
      </div>
    </div>
  </section>

  <div class="drip-divider" aria-hidden="true" data-drip></div>

  <!-- ============ DOCINHOS ============ -->
  <section class="docinhos" id="docinhos">
    <div class="container">
      <header class="section-head">
        <p class="eyebrow" data-en="Gourmet Sweets" data-pt="Docinhos Gourmet">Gourmet Sweets</p>
        <h2 class="section-title" data-en="Docinhos Gourmet" data-pt="Docinhos Gourmet">Docinhos Gourmet</h2>
        <p class="section-sub" data-en="Priced per 100 units · minimum order 100" data-pt="Preço por 100 unidades · mínimo 100">Priced per 100 units · minimum order 100</p>
      </header>

      <div class="card-grid" id="docinhosGrid">
        <!-- 17 cards generated by JS from the product list to keep HTML DRY; see script.js docinhos module -->
      </div>
    </div>
  </section>

  <div class="drip-divider" aria-hidden="true" data-drip></div>

  <!-- ============ INSTAGRAM ============ -->
  <section class="instagram" id="instagram">
    <div class="container">
      <header class="section-head">
        <p class="eyebrow" data-en="@sweetjoync" data-pt="@sweetjoync">@sweetjoync</p>
        <h2 class="section-title" data-en="Fresh from Our Kitchen" data-pt="Fresquinho da nossa cozinha">Fresh from Our Kitchen</h2>
      </header>

      <!-- BEHOLD.SO: Register at behold.so, connect @sweetjoync, paste embed code here -->
      <div class="behold-widget" id="behold-placeholder">
        <p data-en="Instagram feed loads here after Behold.so setup." data-pt="O feed do Instagram aparecerá aqui após a configuração do Behold.so.">Instagram feed loads here after Behold.so setup.</p>
      </div>

      <p class="follow-cta">
        <a href="https://www.instagram.com/sweetjoync/" target="_blank" rel="noopener" class="btn btn-ghost" data-en="Follow @SweetJoyNC →" data-pt="Siga @SweetJoyNC →">Follow @SweetJoyNC →</a>
      </p>
    </div>
  </section>

  <div class="drip-divider" aria-hidden="true" data-drip></div>

  <!-- ============ ORDER FORM ============ -->
  <section class="order-form-section" id="order-form">
    <div class="container">
      <header class="section-head">
        <p class="eyebrow" data-en="Place Your Order" data-pt="Faça seu Pedido">Place Your Order</p>
        <h2 class="section-title" data-en="Tell us about your event" data-pt="Conte-nos sobre seu evento">Tell us about your event</h2>
        <p class="section-sub" data-en="We'll reply within 24 hours. Minimum lead time: 7 days." data-pt="Respondemos em até 24 horas. Prazo mínimo: 7 dias.">We'll reply within 24 hours. Minimum lead time: 7 days.</p>
      </header>

      <form class="order-form" id="orderForm" action="https://api.web3forms.com/submit" method="POST" novalidate>
        <input type="hidden" name="access_key" value="PLACEHOLDER_WEB3FORMS_KEY" />
        <input type="hidden" name="subject" value="New Order Request — Sweet & Joy" />
        <input type="hidden" name="from_name" value="Sweet & Joy Website" />
        <input type="hidden" name="redirect" value="false" />

        <div class="field">
          <label for="f-name" data-en="Full Name *" data-pt="Nome Completo *">Full Name *</label>
          <input id="f-name" name="name" type="text" required autocomplete="name" />
          <p class="field-error" data-en="Please enter your name." data-pt="Por favor, informe seu nome.">Please enter your name.</p>
        </div>

        <div class="field">
          <label for="f-email" data-en="Email *" data-pt="E-mail *">Email *</label>
          <input id="f-email" name="email" type="email" required autocomplete="email" />
          <p class="field-error" data-en="Please enter a valid email." data-pt="Informe um e-mail válido.">Please enter a valid email.</p>
        </div>

        <div class="field">
          <label for="f-phone" data-en="Phone / WhatsApp" data-pt="Telefone / WhatsApp">Phone / WhatsApp</label>
          <input id="f-phone" name="phone" type="tel" autocomplete="tel" />
        </div>

        <div class="field">
          <label for="f-date" data-en="Event Date *" data-pt="Data do Evento *">Event Date *</label>
          <input id="f-date" name="event_date" type="date" required />
          <p class="field-error" data-en="Please pick a date at least 7 days from today." data-pt="Escolha uma data com pelo menos 7 dias de antecedência.">Please pick a date at least 7 days from today.</p>
        </div>

        <div class="field field--full">
          <label for="f-interest" data-en="What are you interested in? *" data-pt="O que você quer pedir? *">What are you interested in? *</label>
          <select id="f-interest" name="product_interest" required>
            <option value="" data-en="Please choose…" data-pt="Escolha…">Please choose…</option>
            <option value="Custom Cake" data-en="Custom Cake" data-pt="Bolo Personalizado">Custom Cake</option>
            <option value="Gourmet Sweets" data-en="Gourmet Sweets" data-pt="Docinhos Gourmet">Gourmet Sweets</option>
            <option value="Both" data-en="Both" data-pt="Ambos">Both</option>
            <option value="Other" data-en="Other" data-pt="Outro">Other</option>
          </select>
        </div>

        <!-- Conditional: Cake fields -->
        <fieldset class="field field--full conditional" data-show-when="Custom Cake,Both" hidden>
          <legend data-en="Cake Details" data-pt="Detalhes do Bolo">Cake Details</legend>

          <div class="sub-field">
            <label data-en="Cake Size" data-pt="Tamanho">Cake Size</label>
            <div class="radio-row">
              <label><input type="radio" name="cake_size" value='4"' /> <span>4" · $40</span></label>
              <label><input type="radio" name="cake_size" value='6"' /> <span>6" · $60</span></label>
              <label><input type="radio" name="cake_size" value='10"' /> <span>10" · $100</span></label>
              <label><input type="radio" name="cake_size" value='12"' /> <span>12" · $140</span></label>
            </div>
          </div>

          <div class="sub-field">
            <label data-en="Batter Flavor" data-pt="Sabor da Massa">Batter Flavor</label>
            <div class="radio-row">
              <label><input type="radio" name="batter_flavor" value="Vanilla" /> <span data-en="Vanilla" data-pt="Baunilha">Vanilla</span></label>
              <label><input type="radio" name="batter_flavor" value="Chocolate" /> <span data-en="Chocolate" data-pt="Chocolate">Chocolate</span></label>
            </div>
          </div>

          <div class="sub-field">
            <label data-en="Fillings (choose up to 2)" data-pt="Recheios (até 2)">Fillings (choose up to 2)</label>
            <div class="checkbox-grid" data-max="2">
              <label><input type="checkbox" name="fillings" value="Chocolate" /> <span data-en="Chocolate" data-pt="Chocolate">Chocolate</span></label>
              <label><input type="checkbox" name="fillings" value="Coconut" /> <span data-en="Coconut" data-pt="Coco">Coconut</span></label>
              <label><input type="checkbox" name="fillings" value="Three-milk" /> <span data-en="Three-milk" data-pt="Três leites">Three-milk</span></label>
              <label><input type="checkbox" name="fillings" value="White Chocolate" /> <span data-en="White Chocolate" data-pt="Chocolate branco">White Chocolate</span></label>
              <label><input type="checkbox" name="fillings" value="Strawberry & White Chocolate" /> <span data-en="Strawberry &amp; White Chocolate" data-pt="Morango &amp; Chocolate branco">Strawberry &amp; White Chocolate</span></label>
              <label><input type="checkbox" name="fillings" value="Pineapple & Coconut" /> <span data-en="Pineapple &amp; Coconut" data-pt="Abacaxi &amp; Coco">Pineapple &amp; Coconut</span></label>
              <label><input type="checkbox" name="fillings" value="Caramel" /> <span data-en="Caramel" data-pt="Caramelo">Caramel</span></label>
              <label><input type="checkbox" name="fillings" value="Strawberry & Dark Chocolate Mousse" /> <span data-en="Strawberry &amp; Dark Chocolate Mousse" data-pt="Morango &amp; Mousse">Strawberry &amp; Dark Chocolate Mousse</span></label>
              <label><input type="checkbox" name="fillings" value="Walnut & Praline" /> <span data-en="Walnut &amp; Praline" data-pt="Nozes &amp; Praliné">Walnut &amp; Praline</span></label>
              <label><input type="checkbox" name="fillings" value="Red Velvet & Cream Cheese" /> <span>Red Velvet &amp; Cream Cheese</span></label>
              <label><input type="checkbox" name="fillings" value="Powdered Ninho Milk & Nutella" /> <span data-en="Ninho Milk &amp; Nutella" data-pt="Leite Ninho &amp; Nutella">Ninho Milk &amp; Nutella</span></label>
              <label><input type="checkbox" name="fillings" value="Customize your own" /> <span data-en="Customize your own" data-pt="Personalizar">Customize your own</span></label>
            </div>
          </div>
        </fieldset>

        <!-- Conditional: Docinhos quantity -->
        <div class="field conditional" data-show-when="Gourmet Sweets,Both" hidden>
          <label for="f-qty" data-en="Docinhos Quantity (min 100)" data-pt="Quantidade de Docinhos (mín 100)">Docinhos Quantity (min 100)</label>
          <input id="f-qty" name="docinhos_qty" type="number" min="100" step="10" placeholder="100" />
        </div>

        <div class="field field--full">
          <label for="f-notes" data-en="Special Requests" data-pt="Pedidos Especiais">Special Requests</label>
          <textarea id="f-notes" name="special_requests" rows="4" placeholder=""></textarea>
        </div>

        <div class="field field--full">
          <label for="f-source" data-en="How did you find us?" data-pt="Como nos encontrou?">How did you find us?</label>
          <select id="f-source" name="source">
            <option value="" data-en="(optional)" data-pt="(opcional)">(optional)</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Friend or Family" data-en="Friend or Family" data-pt="Amigo ou Familiar">Friend or Family</option>
            <option value="Google">Google</option>
            <option value="Other" data-en="Other" data-pt="Outro">Other</option>
          </select>
        </div>

        <!-- Honeypot -->
        <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" />

        <div class="form-actions field--full">
          <button type="submit" class="btn btn-primary" id="submitOrderBtn" data-en="Send Order Request" data-pt="Enviar Pedido">Send Order Request</button>
        </div>

        <div class="form-status" id="formStatus" hidden></div>
      </form>
    </div>
  </section>

  <div class="drip-divider" aria-hidden="true" data-drip></div>

  <!-- ============ CONTACT ============ -->
  <section class="contact" id="contact">
    <div class="container contact-inner">
      <div class="contact-copy">
        <p class="eyebrow" data-en="Say Hello" data-pt="Fale com a gente">Say Hello</p>
        <h2 class="section-title" data-en="Kernersville, NC" data-pt="Kernersville, NC">Kernersville, NC</h2>
        <p class="section-sub" data-en="Home bakery — we deliver love, not a street address." data-pt="Confeitaria caseira — entregamos amor, não um endereço fixo.">Home bakery — we deliver love, not a street address.</p>

        <ul class="contact-list">
          <li><a href="https://wa.me/13369891342?text=Hi!%20I'd%20like%20to%20place%20an%20order%20with%20Sweet%20%26%20Joy" target="_blank" rel="noopener">WhatsApp · (336) 989-1342</a></li>
          <li><a href="mailto:vanessa.sulevis@gmail.com">vanessa.sulevis@gmail.com</a></li>
          <li><a href="https://www.instagram.com/sweetjoync/" target="_blank" rel="noopener">Instagram · @SweetJoyNC</a></li>
          <li><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook · Sweet &amp; Joy</a></li>
        </ul>
      </div>

      <div class="contact-map">
        <iframe
          title="Map of Kernersville, NC"
          src="https://www.google.com/maps?q=Kernersville,NC&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen></iframe>
      </div>
    </div>
  </section>

  <!-- ============ FOOTER ============ -->
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <img src="assets/logo-simplified.jpeg" alt="Sweet & Joy" />
        <p class="script" data-en="Crafted with Love" data-pt="Feito com Amor">Crafted with Love</p>
      </div>

      <ul class="footer-social">
        <li><a href="https://www.instagram.com/sweetjoync/" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="https://wa.me/13369891342" target="_blank" rel="noopener">WhatsApp</a></li>
      </ul>

      <button type="button" class="lang-toggle" id="langToggleFooter" aria-label="Switch language">
        <span class="lang-flag" aria-hidden="true">🇺🇸</span>
        <span class="lang-label">EN</span>
      </button>

      <p class="footer-copy">© 2026 Sweet &amp; Joy by Vanessa Sulevis · Kernersville, NC</p>
    </div>
  </footer>

  <!-- ============ FLOATING ============ -->
  <a href="https://wa.me/13369891342?text=Hi!%20I'd%20like%20to%20place%20an%20order%20with%20Sweet%20%26%20Joy" class="whatsapp-fab" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true" width="28" height="28"><path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 3.7 17.3L2 22l4.8-1.7a11 11 0 0 0 5.2 1.4h.1A11 11 0 0 0 20.5 3.5Zm-8.4 16.9a9 9 0 0 1-4.6-1.3l-.3-.2-2.9 1 .9-2.8-.2-.3A9 9 0 1 1 21 12a9 9 0 0 1-8.9 8.4Zm5.2-6.7c-.3-.1-1.7-.8-1.9-.9s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1a7.3 7.3 0 0 1-3.6-3.2c-.3-.5.3-.5.8-1.5.1-.2.1-.4 0-.5s-.6-1.4-.8-1.9-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7a10 10 0 0 0 3.9 3.5c1.9.7 2 .5 2.4.5a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.1c0-.2-.2-.2-.5-.4Z"/></svg>
  </a>

  <button type="button" class="back-to-top" id="backToTop" aria-label="Back to top">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 5l-7 7 1.4 1.4L11 8.8V19h2V8.8l4.6 4.6L19 12z"/></svg>
  </button>

  <script src="script.js" defer></script>

  <!--
  POST-LAUNCH TODO:
  1. Web3Forms: register at web3forms.com → replace PLACEHOLDER_WEB3FORMS_KEY in this file (search for that string).
  2. Behold.so: register → connect @sweetjoync → paste embed code in place of the #behold-placeholder div.
  3. Add real product photos to /assets/images/ (founder.jpg, cake-custom-01.jpg, cake-custom-02.jpg, docinhos-01.jpg, docinhos-02.jpg).
  4. Set up Google Business Profile: "Sweet & Joy Kernersville NC".
  5. Submit sitemap to Google Search Console.
  6. Point domain to Cloudflare Pages (if custom domain desired).
  -->
</body>
</html>
```

- [ ] **Step 2: Create empty `style.css` and `script.js` so the page loads without 404s**

Write to `/Volumes/SecondBrain/Claude/Sweet & Joy/style.css`:

```css
/* Styles added in Task 2 */
```

Write to `/Volumes/SecondBrain/Claude/Sweet & Joy/script.js`:

```javascript
/* Scripts added in Tasks 4, 6, 8, 9, 10 */
```

- [ ] **Step 3: Start a local server and verify**

```bash
cd "/Volumes/SecondBrain/Claude/Sweet & Joy"
python3 -m http.server 8080
```

Open `http://localhost:8080`.

Expected:
- All 8 sections visible (unstyled)
- English text shown everywhere (default `lang="en"`)
- Console clean (0 errors, 0 warnings)
- The Docinhos grid is empty — that's intentional, it's generated in Task 5

- [ ] **Step 4: Commit**

```bash
git add index.html style.css script.js
git commit -m "HTML scaffold with bilingual attributes for all 8 sections"
```

---

## Task 2: CSS Foundation — Tokens, Fonts, Reset, Base Typography

**Files:**
- Modify: `style.css` (replace contents)

Establishes every design token and base rule so every later task only needs to add component rules.

- [ ] **Step 1: Replace `style.css` contents**

```css
/* ===== DESIGN TOKENS ===== */
:root {
  --color-bg:      #FFF0EE;
  --color-cream:   #FFF8F5;
  --color-primary: #C4867A;
  --color-coral:   #E89380;
  --color-accent:  #3D2B2B;
  --color-white:   #FFFFFF;
  --color-error:   #B4463C;

  --font-display:  "Cormorant Garamond", "Times New Roman", serif;
  --font-body:     "Outfit", system-ui, sans-serif;
  --font-script:   "Style Script", cursive;

  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
  --space-6: 6rem;

  --max-width: 1200px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-pill: 999px;

  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 200ms;
  --dur-med:  450ms;
  --dur-slow: 800ms;

  --shadow-sm: 0 2px 8px rgba(61,43,43,0.06);
  --shadow-md: 0 12px 32px rgba(61,43,43,0.10);
  --shadow-lg: 0 24px 48px rgba(61,43,43,0.14);
}

/* ===== RESET ===== */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
body { min-height: 100vh; background: var(--color-bg); color: var(--color-accent); font-family: var(--font-body); font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
img, svg { display: block; max-width: 100%; height: auto; }
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
input, select, textarea { font: inherit; color: inherit; }
a { color: var(--color-accent); text-decoration: none; transition: color var(--dur-fast) var(--ease); }
a:hover { color: var(--color-coral); }
ul { list-style: none; }

/* ===== TYPOGRAPHY ===== */
h1, h2, h3 { font-family: var(--font-display); font-weight: 400; font-style: italic; line-height: 1.1; color: var(--color-accent); letter-spacing: -0.01em; }
h1 { font-size: clamp(2.5rem, 6vw + 1rem, 5rem); }
h2 { font-size: clamp(2rem, 3vw + 1rem, 3.25rem); }
h3 { font-size: clamp(1.25rem, 1vw + 1rem, 1.75rem); }
.script { font-family: var(--font-script); font-size: 1.75rem; color: var(--color-primary); font-style: normal; }
.eyebrow { font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-primary); margin-bottom: var(--space-2); }
.section-title { margin-bottom: var(--space-2); }
.section-sub { color: color-mix(in srgb, var(--color-accent) 70%, transparent); max-width: 52ch; margin: 0 auto; }

/* ===== LAYOUT ===== */
.container { width: 100%; max-width: var(--max-width); margin-inline: auto; padding-inline: var(--space-3); }
@media (min-width: 768px) { .container { padding-inline: var(--space-5); } }

section { padding-block: var(--space-5); }
@media (min-width: 768px) { section { padding-block: var(--space-6); } }

.section-head { text-align: center; max-width: 680px; margin: 0 auto var(--space-5); }

/* Alternate section backgrounds */
.about, .docinhos, .contact { background: var(--color-cream); }
.how-to-order, .instagram, .order-form-section { background: var(--color-bg); }

/* ===== BUTTONS ===== */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5ch; padding: 0.9rem 1.75rem; border-radius: var(--radius-pill); font-family: var(--font-body); font-weight: 500; font-size: 0.95rem; letter-spacing: 0.02em; transition: transform var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease); cursor: pointer; border: 1px solid transparent; text-decoration: none; }
.btn-primary { background: var(--color-accent); color: var(--color-white); }
.btn-primary:hover { background: var(--color-coral); color: var(--color-white); transform: translateY(-2px); box-shadow: var(--shadow-md); }
.btn-primary:disabled { background: color-mix(in srgb, var(--color-accent) 25%, transparent); color: color-mix(in srgb, var(--color-white) 70%, transparent); cursor: not-allowed; transform: none; box-shadow: none; }
.btn-ghost { background: transparent; color: var(--color-accent); border-color: var(--color-accent); }
.btn-ghost:hover { background: var(--color-accent); color: var(--color-white); }

/* ===== FORM BASE ===== */
.field { display: flex; flex-direction: column; gap: 0.35rem; }
.field label { font-size: 0.88rem; color: color-mix(in srgb, var(--color-accent) 85%, transparent); letter-spacing: 0.04em; }
.field input[type="text"], .field input[type="email"], .field input[type="tel"], .field input[type="date"], .field input[type="number"], .field select, .field textarea {
  border: 0; border-bottom: 1px solid color-mix(in srgb, var(--color-accent) 30%, transparent); background: transparent; padding: 0.5rem 0; color: var(--color-accent); font-size: 1rem; outline: none; transition: border-color var(--dur-fast) var(--ease);
}
.field input:focus, .field select:focus, .field textarea:focus { border-color: var(--color-coral); }
.field--error input, .field--error select, .field--error textarea { border-color: var(--color-error); }
.field-error { display: none; font-size: 0.82rem; color: var(--color-error); margin-top: 0.1rem; }
.field--error .field-error { display: block; }

/* Honeypot */
.hp { position: absolute; left: -10000px; opacity: 0; height: 0; width: 0; }

/* Accessibility */
:focus-visible { outline: 2px solid var(--color-coral); outline-offset: 3px; border-radius: var(--radius-sm); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 2: Reload browser**

Expected: fonts now load (italic serif headings, sans body). Sections have padding. Backgrounds alternate blush/cream. Buttons are pill-shaped. Console clean.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "CSS foundation: design tokens, fonts, reset, typography scale, buttons, form base"
```

---

## Task 3: Header, Hero, About — Styling

**Files:**
- Modify: `style.css` (append)

- [ ] **Step 1: Append to `style.css`**

```css
/* ===== HEADER ===== */
.site-header { position: sticky; top: 0; z-index: 40; background: color-mix(in srgb, var(--color-bg) 88%, transparent); backdrop-filter: saturate(180%) blur(14px); -webkit-backdrop-filter: saturate(180%) blur(14px); border-bottom: 1px solid color-mix(in srgb, var(--color-accent) 8%, transparent); }
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); padding-block: 0.85rem; }
.brand { display: inline-flex; align-items: center; gap: 0.6rem; text-decoration: none; }
.brand-logo { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
.brand-wordmark { font-family: var(--font-script); font-size: 1.5rem; color: var(--color-accent); }
.site-nav { display: none; gap: var(--space-3); }
.site-nav a { font-size: 0.92rem; letter-spacing: 0.05em; color: var(--color-accent); padding: 0.5rem 0; position: relative; }
.site-nav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--color-coral); transform: scaleX(0); transform-origin: left; transition: transform var(--dur-med) var(--ease); }
.site-nav a:hover::after { transform: scaleX(1); }
.lang-toggle { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent); border-radius: var(--radius-pill); font-size: 0.85rem; letter-spacing: 0.05em; background: transparent; transition: border-color var(--dur-fast) var(--ease); }
.lang-toggle:hover { border-color: var(--color-coral); }
.lang-flag { font-size: 1rem; }
.nav-burger { display: inline-flex; flex-direction: column; justify-content: center; gap: 5px; width: 40px; height: 40px; padding: 0.4rem; }
.nav-burger span { display: block; height: 2px; width: 100%; background: var(--color-accent); transition: transform var(--dur-fast) var(--ease); }
@media (min-width: 768px) {
  .site-nav { display: inline-flex; }
  .nav-burger { display: none; }
}
/* Mobile menu open state */
.site-nav.is-open { display: flex; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--color-bg); padding: var(--space-3); border-bottom: 1px solid color-mix(in srgb, var(--color-accent) 10%, transparent); }

/* ===== HERO ===== */
.hero { position: relative; overflow: hidden; padding-block: var(--space-5) var(--space-6); min-height: 70vh; display: flex; align-items: center; }
.hero-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.18; mix-blend-mode: multiply; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0.24 0 0 0 0 0.17 0 0 0 0 0.17 0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
.hero-blob { position: absolute; top: 50%; right: -8%; width: 70%; max-width: 640px; transform: translateY(-52%); z-index: 0; }
.hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: var(--space-4); align-items: center; }
.hero-eyebrow { font-family: var(--font-body); font-size: 0.82rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--color-primary); margin-bottom: var(--space-2); }
.hero-title { font-size: clamp(3rem, 7vw + 1rem, 6rem); font-style: italic; margin-bottom: var(--space-2); }
.hero-sub { font-size: 1.15rem; max-width: 40ch; color: color-mix(in srgb, var(--color-accent) 75%, transparent); margin-bottom: var(--space-3); }
.hero-cta { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.hero-seal { display: flex; justify-content: center; }
.hero-seal img { width: min(360px, 80%); border-radius: 50%; box-shadow: var(--shadow-lg); }
@media (min-width: 768px) {
  .hero-inner { grid-template-columns: 1.1fr 0.9fr; gap: var(--space-5); }
  .hero-copy { padding-right: var(--space-3); }
  .hero-seal img { width: 100%; max-width: 440px; }
}

/* ===== ABOUT ===== */
.about-inner { display: grid; grid-template-columns: 1fr; gap: var(--space-4); align-items: center; }
.about-photo { aspect-ratio: 4/5; border-radius: var(--radius-md); overflow: hidden; background: color-mix(in srgb, var(--color-primary) 20%, var(--color-cream)); position: relative; }
.about-photo img { width: 100%; height: 100%; object-fit: cover; }
.about-photo img.is-placeholder { display: none; }
.about-photo::after { content: "Founder photo"; position: absolute; inset: 0; display: grid; place-items: center; font-size: 0.85rem; color: color-mix(in srgb, var(--color-accent) 50%, transparent); letter-spacing: 0.1em; text-transform: uppercase; z-index: -1; }
.about-body { font-size: 1.08rem; max-width: 58ch; }
@media (min-width: 768px) {
  .about-inner { grid-template-columns: 0.85fr 1.15fr; gap: var(--space-5); }
}
```

- [ ] **Step 2: Reload and verify**

At 1280px: header sticks on scroll, nav visible inline, hero shows copy left + seal right with blush blob behind, grain visible subtly.
At 375px: header shows burger + logo + lang-toggle, hero stacks vertically, seal centered.
Console clean.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "Header, hero (asymmetric + grain + blob), about section styling"
```

---

## Task 4: How to Order — Interactive Selector (CSS + JS)

**Files:**
- Modify: `style.css` (append)
- Modify: `script.js` (replace)

- [ ] **Step 1: Append to `style.css`**

```css
/* ===== BUILDER ===== */
.builder { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
.builder-steps { display: flex; flex-direction: column; gap: var(--space-4); }
.builder-step-head { display: flex; align-items: center; gap: 0.9rem; margin-bottom: var(--space-2); }
.step-num { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: var(--color-primary); color: var(--color-white); font-family: var(--font-display); font-style: italic; font-size: 1.1rem; }
.pill-grid { display: grid; gap: 0.6rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.pill-grid--dense { grid-template-columns: repeat(2, minmax(0, 1fr)); }
@media (min-width: 520px) {
  .pill-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .pill-grid--dense { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
.pill { padding: 0.9rem 1rem; border: 1px solid color-mix(in srgb, var(--color-accent) 18%, transparent); border-radius: var(--radius-pill); background: var(--color-white); display: flex; flex-direction: column; gap: 0.15rem; text-align: center; transition: all var(--dur-fast) var(--ease); position: relative; }
.pill strong { font-size: 1rem; }
.pill span { font-size: 0.78rem; color: color-mix(in srgb, var(--color-accent) 60%, transparent); }
.pill:hover { border-color: var(--color-coral); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
.pill.is-selected { background: var(--color-coral); border-color: var(--color-coral); color: var(--color-white); }
.pill.is-selected span { color: color-mix(in srgb, var(--color-white) 85%, transparent); }
.pill.is-selected::after { content: "✓"; position: absolute; top: 0.4rem; right: 0.7rem; font-size: 0.85rem; }
.pill:disabled:not(.is-selected) { opacity: 0.4; cursor: not-allowed; }
.pill:disabled:not(.is-selected):hover { transform: none; border-color: color-mix(in srgb, var(--color-accent) 18%, transparent); box-shadow: none; }

.builder-summary { background: var(--color-white); border: 1px solid color-mix(in srgb, var(--color-accent) 10%, transparent); border-radius: var(--radius-md); padding: var(--space-3); display: flex; flex-direction: column; gap: 0.8rem; position: sticky; top: 88px; }
.summary-list { display: flex; flex-direction: column; gap: 0.7rem; }
.summary-list > div { display: grid; grid-template-columns: auto 1fr; gap: 0.8rem; border-bottom: 1px solid color-mix(in srgb, var(--color-accent) 8%, transparent); padding-bottom: 0.4rem; }
.summary-list dt { font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-primary); }
.summary-list dd { text-align: right; font-size: 0.95rem; }
.summary-hint { font-size: 0.8rem; color: color-mix(in srgb, var(--color-accent) 55%, transparent); text-align: center; }

@media (min-width: 900px) {
  .builder { grid-template-columns: 1.6fr 1fr; align-items: start; }
}
```

- [ ] **Step 2: Replace `script.js` contents**

```javascript
/* ==================================================
 * Sweet & Joy — script.js
 * Modules added progressively across tasks.
 * ================================================== */

(() => {
  "use strict";

  // ---------- DOCINHOS DATA (used by docinhos + form hints) ----------
  const DOCINHOS = [
    { en: "Chocolate Brigadeiro w/ Vermicelli",    pt: "Brigadeiro de chocolate com Vermicelli", price: 80 },
    { en: "Chocolate Brigadeiro w/ Granulé",       pt: "Brigadeiro de chocolate com Granulé",    price: 100 },
    { en: "Coconut Brigadeiro",                    pt: "Brigadeiro de coco",                     price: 80 },
    { en: "Two-Flavor Brigadeiro",                 pt: "Brigadeiro dois amores",                 price: 80 },
    { en: "Peanut Brigadeiro",                     pt: "Brigadeiro de amendoim",                 price: 80 },
    { en: "Ninho Milk Brigadeiro",                 pt: "Brigadeiro de ninho",                    price: 80 },
    { en: "Strawberry Brigadeiro",                 pt: "Brigadeiro de morango (Nesquik)",        price: 80 },
    { en: "Sicilian Lemon Brigadeiro",             pt: "Brigadeiro de limão siciliano",          price: 80 },
    { en: "Oreo Brigadeiro",                       pt: "Brigadeiro de Oreo",                     price: 90 },
    { en: "Churros Brigadeiro",                    pt: "Brigadeiro de churros",                  price: 90 },
    { en: "Passion Fruit Brigadeiro",              pt: "Brigadeiro de maracujá",                 price: 90 },
    { en: "Salted Caramel Brigadeiro",             pt: "Brigadeiro de caramelo salgado",         price: 90 },
    { en: "Walnut Brigadeiro",                     pt: "Brigadeiro de nozes",                    price: 100 },
    { en: "Pistachio Brigadeiro",                  pt: "Brigadeiro de Pistache",                 price: 100 },
    { en: "Grape Surprise",                        pt: "Surpresa de uva",                        price: 100 },
    { en: "Alcoholic Brigadeiro",                  pt: "Brigadeiro alcoólico",                   price: 100 },
    { en: "Chocolate Cups w/ Filling",             pt: "Copinhos de chocolate com recheio",      price: 100 }
  ];

  // ---------- ORDER BUILDER ----------
  const orderBuilder = (() => {
    const state = { size: null, batter: null, fillings: [] };

    function updateSummary() {
      const tr = (en, pt) => (document.documentElement.lang === "pt" ? pt : en);
      const sz = document.getElementById("sumSize");
      const bt = document.getElementById("sumBatter");
      const fl = document.getElementById("sumFillings");
      if (sz) sz.textContent = state.size ? state.size + '"' : "—";
      if (bt) bt.textContent = state.batter || "—";
      if (fl) fl.textContent = state.fillings.length ? state.fillings.join(", ") : "—";
      const btn = document.getElementById("buildMyOrderBtn");
      if (btn) btn.disabled = !(state.size && state.batter && state.fillings.length === 2);
    }

    function bind() {
      document.querySelectorAll(".pill-grid").forEach(grid => {
        const field = grid.dataset.field;
        const multi = parseInt(grid.dataset.multi || "0", 10);
        grid.addEventListener("click", e => {
          const pill = e.target.closest(".pill");
          if (!pill || pill.disabled && !pill.classList.contains("is-selected")) return;

          if (multi > 0) {
            const isSelected = pill.classList.toggle("is-selected");
            const val = pill.dataset.value;
            if (isSelected) {
              state.fillings.push(val);
            } else {
              state.fillings = state.fillings.filter(v => v !== val);
            }
            // Disable remaining pills if we hit max
            grid.querySelectorAll(".pill").forEach(p => {
              if (!p.classList.contains("is-selected")) p.disabled = state.fillings.length >= multi;
            });
          } else {
            grid.querySelectorAll(".pill").forEach(p => p.classList.remove("is-selected"));
            pill.classList.add("is-selected");
            state[field] = pill.dataset.value;
          }
          updateSummary();
        });
      });

      const buildBtn = document.getElementById("buildMyOrderBtn");
      if (buildBtn) {
        buildBtn.addEventListener("click", () => {
          // Dispatch selections to the order form (handled by formHandler in Task 6)
          window.dispatchEvent(new CustomEvent("order:prefill", {
            detail: { source: "builder", size: state.size ? state.size + '"' : "", batter: state.batter, fillings: [...state.fillings], product: "Custom Cake" }
          }));
          const form = document.getElementById("order-form");
          if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }

    return { bind, state };
  })();

  // Expose data for other modules
  window.__SJ__ = { DOCINHOS };

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", () => {
    orderBuilder.bind();
  });
})();
```

- [ ] **Step 3: Reload and verify**

- Tap step 1: one size selects (coral fill + check).
- Tap a different size: previous deselects.
- Step 2: one batter selects.
- Step 3: tap 2 fillings — both highlight. Tap a 3rd: nothing happens (remaining pills disabled).
- Summary panel updates live.
- "Build My Order →" enables only when all 3 are set; clicking scrolls to order form.
- Console clean.

- [ ] **Step 4: Commit**

```bash
git add style.css script.js
git commit -m "How to Order: pill selector + live summary + prefill dispatch"
```

---

## Task 5: Docinhos Grid (CSS + JS render)

**Files:**
- Modify: `style.css` (append)
- Modify: `script.js` (append new module)

- [ ] **Step 1: Append to `style.css`**

```css
/* ===== DOCINHOS GRID ===== */
.card-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 560px) { .card-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 900px) { .card-grid { grid-template-columns: repeat(3, 1fr); } }

.product-card { background: var(--color-white); border-radius: var(--radius-md); overflow: hidden; display: flex; flex-direction: column; border: 1px solid color-mix(in srgb, var(--color-accent) 6%, transparent); transition: transform var(--dur-med) var(--ease), box-shadow var(--dur-med) var(--ease); }
.product-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: var(--shadow-md); }
.product-thumb { aspect-ratio: 4/3; background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 20%, var(--color-cream)) 0%, var(--color-cream) 100%); display: grid; place-items: center; color: color-mix(in srgb, var(--color-accent) 30%, transparent); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; }
.product-body { padding: var(--space-2) var(--space-3) var(--space-3); display: flex; flex-direction: column; gap: 0.7rem; flex: 1; }
.product-name { font-family: var(--font-display); font-style: italic; font-size: 1.2rem; line-height: 1.25; color: var(--color-accent); }
.price-badge { align-self: flex-start; background: var(--color-coral); color: var(--color-white); padding: 0.25rem 0.75rem; border-radius: var(--radius-pill); font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 500; }
.product-card .btn { margin-top: auto; align-self: flex-start; padding: 0.6rem 1.2rem; font-size: 0.85rem; }
```

- [ ] **Step 2: Append to `script.js`** (inside the same IIFE, before the final `document.addEventListener`). Keep the existing code; insert this new module after `orderBuilder`:

```javascript
  // ---------- DOCINHOS GRID ----------
  const docinhosGrid = (() => {
    function render() {
      const grid = document.getElementById("docinhosGrid");
      if (!grid) return;
      grid.innerHTML = DOCINHOS.map(d => `
        <article class="product-card">
          <div class="product-thumb" aria-hidden="true">Photo</div>
          <div class="product-body">
            <h3 class="product-name" data-en="${escapeHtml(d.en)}" data-pt="${escapeHtml(d.pt)}">${escapeHtml(d.en)}</h3>
            <span class="price-badge">$${d.price} / 100</span>
            <button type="button" class="btn btn-ghost" data-action="order-sweet" data-name="${escapeAttr(d.en)}" data-en="Order This" data-pt="Pedir">Order This</button>
          </div>
        </article>
      `).join("");

      grid.addEventListener("click", e => {
        const btn = e.target.closest("[data-action=order-sweet]");
        if (!btn) return;
        window.dispatchEvent(new CustomEvent("order:prefill", {
          detail: { source: "card", product: "Gourmet Sweets", note: btn.dataset.name }
        }));
        const form = document.getElementById("order-form");
        if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    function escapeHtml(s) { return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
    function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }
    return { render };
  })();
```

And update the DOMContentLoaded block to call it:

```javascript
  document.addEventListener("DOMContentLoaded", () => {
    orderBuilder.bind();
    docinhosGrid.render();
  });
```

- [ ] **Step 3: Reload and verify**

- Docinhos section now shows 17 product cards in 3-col grid (desktop), 2-col (tablet), 1-col (mobile).
- Each card: gradient "Photo" placeholder, italic product name, coral price badge, "Order This" button.
- Hover: card lifts and gets shadow.
- Click "Order This": scrolls to order form (prefill wiring comes in Task 6).
- Console clean.

- [ ] **Step 4: Commit**

```bash
git add style.css script.js
git commit -m "Docinhos grid: 17 product cards with hover lift, price badges, Order This prefill dispatch"
```

---

## Task 6: Order Form — Styling, Validation, Web3Forms Submit, WhatsApp Redirect

**Files:**
- Modify: `style.css` (append)
- Modify: `script.js` (append new module + init call)

- [ ] **Step 1: Append to `style.css`**

```css
/* ===== ORDER FORM ===== */
.order-form { max-width: 920px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: var(--space-3); background: var(--color-white); padding: var(--space-4); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
@media (min-width: 720px) {
  .order-form { grid-template-columns: 1fr 1fr; padding: var(--space-5); gap: var(--space-3) var(--space-4); }
  .field--full, .form-actions, .conditional, .form-status { grid-column: 1 / -1; }
}

.conditional { background: var(--color-cream); border-radius: var(--radius-md); padding: var(--space-3); border: 1px solid color-mix(in srgb, var(--color-primary) 15%, transparent); }
.conditional legend { padding: 0 0.5rem; font-family: var(--font-display); font-style: italic; font-size: 1.25rem; color: var(--color-primary); }
.sub-field { display: flex; flex-direction: column; gap: 0.5rem; margin-top: var(--space-2); }
.sub-field > label { font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-primary); }
.radio-row { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.radio-row label { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.5rem 1rem; border: 1px solid color-mix(in srgb, var(--color-accent) 18%, transparent); border-radius: var(--radius-pill); cursor: pointer; transition: border-color var(--dur-fast) var(--ease); }
.radio-row label:has(input:checked), .checkbox-grid label:has(input:checked) { border-color: var(--color-coral); background: color-mix(in srgb, var(--color-coral) 15%, transparent); }
.radio-row input, .checkbox-grid input { accent-color: var(--color-coral); }
.checkbox-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; }
.checkbox-grid label { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.5rem 0.85rem; border: 1px solid color-mix(in srgb, var(--color-accent) 18%, transparent); border-radius: var(--radius-sm); cursor: pointer; font-size: 0.92rem; transition: border-color var(--dur-fast) var(--ease); }

.form-status { padding: var(--space-3); border-radius: var(--radius-md); font-size: 0.95rem; }
.form-status.is-success { background: color-mix(in srgb, var(--color-coral) 18%, transparent); color: var(--color-accent); border: 1px solid var(--color-coral); }
.form-status.is-error { background: color-mix(in srgb, var(--color-error) 12%, transparent); color: var(--color-error); border: 1px solid color-mix(in srgb, var(--color-error) 50%, transparent); }
.form-status a { color: inherit; text-decoration: underline; }
```

- [ ] **Step 2: Append to `script.js` inside the IIFE, after `docinhosGrid`:**

```javascript
  // ---------- FORM HANDLER ----------
  const formHandler = (() => {
    const form = () => document.getElementById("orderForm");
    const statusEl = () => document.getElementById("formStatus");

    function tr(en, pt) { return document.documentElement.lang === "pt" ? pt : en; }

    function showConditionals() {
      const select = document.getElementById("f-interest");
      if (!select) return;
      const current = select.value;
      document.querySelectorAll(".conditional").forEach(el => {
        const showWhen = (el.dataset.showWhen || "").split(",");
        const shouldShow = showWhen.includes(current);
        el.hidden = !shouldShow;
      });
    }

    function validate() {
      const f = form();
      let ok = true;
      f.querySelectorAll(".field").forEach(field => field.classList.remove("field--error"));

      const name = f.elements["name"];
      if (!name.value.trim()) { name.closest(".field").classList.add("field--error"); ok = false; }

      const email = f.elements["email"];
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.closest(".field").classList.add("field--error"); ok = false; }

      const date = f.elements["event_date"];
      if (date.value) {
        const picked = new Date(date.value + "T00:00:00");
        const minDate = new Date(); minDate.setHours(0,0,0,0); minDate.setDate(minDate.getDate() + 7);
        if (picked < minDate) { date.closest(".field").classList.add("field--error"); ok = false; }
      } else {
        date.closest(".field").classList.add("field--error"); ok = false;
      }

      const interest = f.elements["product_interest"];
      if (!interest.value) { interest.closest(".field").classList.add("field--error"); ok = false; }

      // Fillings max 2 enforcement
      const checkedFillings = f.querySelectorAll("input[name=fillings]:checked");
      if (checkedFillings.length > 2) { ok = false; }

      return ok;
    }

    function enforceFillingsMax() {
      const grid = form().querySelector('.checkbox-grid[data-max]');
      if (!grid) return;
      const max = parseInt(grid.dataset.max, 10);
      grid.addEventListener("change", () => {
        const boxes = grid.querySelectorAll("input[type=checkbox]");
        const checkedCount = grid.querySelectorAll("input[type=checkbox]:checked").length;
        boxes.forEach(b => { if (!b.checked) b.disabled = checkedCount >= max; });
      });
    }

    function buildWhatsAppUrl(data) {
      const lang = document.documentElement.lang;
      const lines = [];
      if (lang === "pt") {
        lines.push("Olá Vanessa! Novo pedido pelo site Sweet & Joy:");
        lines.push("");
        lines.push(`Nome: ${data.name}`);
        lines.push(`Email: ${data.email}`);
        if (data.phone) lines.push(`Telefone: ${data.phone}`);
        lines.push(`Data do evento: ${data.event_date}`);
        lines.push(`Produto: ${data.product_interest}`);
        if (data.cake_size) lines.push(`Tamanho: ${data.cake_size}`);
        if (data.batter_flavor) lines.push(`Massa: ${data.batter_flavor}`);
        if (data.fillings && data.fillings.length) lines.push(`Recheios: ${data.fillings.join(", ")}`);
        if (data.docinhos_qty) lines.push(`Quantidade de docinhos: ${data.docinhos_qty}`);
        if (data.special_requests) lines.push(`Observações: ${data.special_requests}`);
      } else {
        lines.push("Hi Vanessa! New order from the Sweet & Joy site:");
        lines.push("");
        lines.push(`Name: ${data.name}`);
        lines.push(`Email: ${data.email}`);
        if (data.phone) lines.push(`Phone: ${data.phone}`);
        lines.push(`Event date: ${data.event_date}`);
        lines.push(`Interested in: ${data.product_interest}`);
        if (data.cake_size) lines.push(`Cake size: ${data.cake_size}`);
        if (data.batter_flavor) lines.push(`Batter: ${data.batter_flavor}`);
        if (data.fillings && data.fillings.length) lines.push(`Fillings: ${data.fillings.join(", ")}`);
        if (data.docinhos_qty) lines.push(`Docinhos quantity: ${data.docinhos_qty}`);
        if (data.special_requests) lines.push(`Notes: ${data.special_requests}`);
      }
      return `https://wa.me/13369891342?text=${encodeURIComponent(lines.join("\n"))}`;
    }

    function serializeForm() {
      const f = form();
      const fd = new FormData(f);
      const obj = {};
      for (const [k, v] of fd.entries()) {
        if (k === "fillings") {
          obj.fillings = obj.fillings || [];
          obj.fillings.push(v);
        } else {
          obj[k] = v;
        }
      }
      return obj;
    }

    async function submit(e) {
      e.preventDefault();
      if (!validate()) {
        statusEl().hidden = false;
        statusEl().className = "form-status is-error";
        statusEl().textContent = tr("Please fix the highlighted fields and try again.", "Corrija os campos destacados e tente novamente.");
        statusEl().scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      const f = form();
      const submitBtn = document.getElementById("submitOrderBtn");
      submitBtn.disabled = true;
      submitBtn.textContent = tr("Sending…", "Enviando…");

      const fd = new FormData(f);
      const data = serializeForm();

      try {
        const resp = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
        const json = await resp.json().catch(() => ({}));
        if (!resp.ok || json.success === false) throw new Error(json.message || "Submission failed");

        const waUrl = buildWhatsAppUrl(data);
        statusEl().hidden = false;
        statusEl().className = "form-status is-success";
        statusEl().innerHTML = tr(
          `Thank you! Your order request is in Vanessa's inbox. We've also opened WhatsApp so you can confirm directly — just tap Send. <a href="${waUrl}" target="_blank" rel="noopener">Open WhatsApp</a>`,
          `Obrigada! Seu pedido já está na caixa da Vanessa. Também abrimos o WhatsApp para você confirmar direto — é só tocar em Enviar. <a href="${waUrl}" target="_blank" rel="noopener">Abrir WhatsApp</a>`
        );
        window.open(waUrl, "_blank", "noopener");
        f.reset();
        showConditionals();
        statusEl().scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (err) {
        statusEl().hidden = false;
        statusEl().className = "form-status is-error";
        statusEl().textContent = tr(
          "Something went wrong. Please try again, or message us on WhatsApp at (336) 989-1342.",
          "Algo deu errado. Tente novamente ou fale com a gente no WhatsApp: (336) 989-1342."
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = tr("Send Order Request", "Enviar Pedido");
      }
    }

    function applyPrefill(detail) {
      const f = form();
      if (!f) return;
      if (detail.product) {
        f.elements["product_interest"].value = detail.product;
        showConditionals();
      }
      if (detail.size) {
        const r = f.querySelector(`input[name=cake_size][value='${detail.size}']`);
        if (r) r.checked = true;
      }
      if (detail.batter) {
        const r = f.querySelector(`input[name=batter_flavor][value='${detail.batter}']`);
        if (r) r.checked = true;
      }
      if (detail.fillings) {
        f.querySelectorAll("input[name=fillings]").forEach(b => { b.checked = detail.fillings.includes(b.value); });
        // re-run enforcement
        const evt = new Event("change", { bubbles: true });
        const grid = f.querySelector(".checkbox-grid");
        if (grid) grid.dispatchEvent(evt);
      }
      if (detail.note) {
        const notes = f.elements["special_requests"];
        const prev = notes.value ? notes.value + "\n" : "";
        notes.value = prev + (detail.source === "card" ? `Interested in: ${detail.note}` : detail.note);
      }
    }

    function bind() {
      const f = form();
      if (!f) return;
      f.addEventListener("submit", submit);
      document.getElementById("f-interest").addEventListener("change", showConditionals);
      enforceFillingsMax();
      showConditionals();
      window.addEventListener("order:prefill", e => applyPrefill(e.detail));
    }

    return { bind };
  })();
```

Update `DOMContentLoaded`:

```javascript
  document.addEventListener("DOMContentLoaded", () => {
    orderBuilder.bind();
    docinhosGrid.render();
    formHandler.bind();
  });
```

- [ ] **Step 2: Reload and verify**

1. Select "Custom Cake" in dropdown → cake fields appear. Select "Gourmet Sweets" → docinhos qty appears. "Both" → both. "Other" → neither.
2. Check 3 fillings: the 3rd checkbox stays blocked (disabled after 2 checks).
3. Submit empty form → errors highlight on required fields.
4. Submit with date < 7 days out → date field shows error.
5. Submit with valid data (you can keep `PLACEHOLDER_WEB3FORMS_KEY` — Web3Forms will respond with success=false which the UI will surface as the error state; that's expected).
6. Build a cake in Task 4 section → click "Build My Order →" → scrolls to form, size/batter/fillings pre-populate, dropdown set to "Custom Cake".
7. Click "Order This" on a docinho card → scrolls to form, dropdown set to "Gourmet Sweets", notes contain the product name.

- [ ] **Step 3: Commit**

```bash
git add style.css script.js
git commit -m "Order form: validation, conditional fields, Web3Forms submit, WhatsApp redirect, prefill wiring"
```

---

## Task 7: Instagram, Contact, Footer, Floating Elements — Styling

**Files:**
- Modify: `style.css` (append)

- [ ] **Step 1: Append to `style.css`**

```css
/* ===== INSTAGRAM ===== */
.behold-widget { min-height: 280px; display: grid; place-items: center; background: var(--color-cream); border: 1px dashed color-mix(in srgb, var(--color-primary) 35%, transparent); border-radius: var(--radius-md); padding: var(--space-4); color: color-mix(in srgb, var(--color-accent) 55%, transparent); font-size: 0.95rem; text-align: center; margin-bottom: var(--space-4); }
.follow-cta { text-align: center; }

/* ===== CONTACT ===== */
.contact-inner { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
.contact-list { display: flex; flex-direction: column; gap: 0.6rem; margin-top: var(--space-3); }
.contact-list a { font-size: 1.05rem; padding: 0.5rem 0; border-bottom: 1px solid color-mix(in srgb, var(--color-accent) 10%, transparent); display: inline-block; }
.contact-map { aspect-ratio: 4/3; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); background: var(--color-cream); }
.contact-map iframe { width: 100%; height: 100%; border: 0; }
@media (min-width: 768px) {
  .contact-inner { grid-template-columns: 1fr 1.1fr; gap: var(--space-5); align-items: center; }
}

/* ===== FOOTER ===== */
.site-footer { background: var(--color-accent); color: color-mix(in srgb, var(--color-white) 85%, transparent); padding-block: var(--space-5) var(--space-3); }
.footer-inner { display: grid; grid-template-columns: 1fr; gap: var(--space-3); text-align: center; }
.footer-brand { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; }
.footer-brand img { width: 64px; height: 64px; border-radius: 50%; }
.footer-brand .script { color: var(--color-coral); font-size: 1.8rem; }
.footer-social { display: flex; justify-content: center; gap: var(--space-3); flex-wrap: wrap; }
.footer-social a { color: color-mix(in srgb, var(--color-white) 80%, transparent); font-size: 0.9rem; letter-spacing: 0.1em; }
.footer-social a:hover { color: var(--color-coral); }
.footer-copy { font-size: 0.82rem; color: color-mix(in srgb, var(--color-white) 55%, transparent); margin-top: var(--space-2); }
.site-footer .lang-toggle { color: var(--color-white); border-color: color-mix(in srgb, var(--color-white) 30%, transparent); justify-self: center; }

/* ===== FLOATING ELEMENTS ===== */
.whatsapp-fab { position: fixed; right: var(--space-2); bottom: var(--space-2); width: 58px; height: 58px; border-radius: 50%; background: #25D366; color: var(--color-white); display: grid; place-items: center; box-shadow: var(--shadow-md); z-index: 50; transition: transform var(--dur-fast) var(--ease); animation: pulse 2.4s ease-in-out infinite; }
.whatsapp-fab:hover { transform: scale(1.08); }
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4), var(--shadow-md); }
  50%      { box-shadow: 0 0 0 14px rgba(37,211,102,0.0), var(--shadow-md); }
}

.back-to-top { position: fixed; right: var(--space-2); bottom: calc(var(--space-2) + 72px); width: 46px; height: 46px; border-radius: 50%; background: var(--color-white); color: var(--color-accent); box-shadow: var(--shadow-md); display: grid; place-items: center; z-index: 49; opacity: 0; transform: translateY(10px); pointer-events: none; transition: opacity var(--dur-med) var(--ease), transform var(--dur-med) var(--ease); }
.back-to-top.is-visible { opacity: 1; transform: none; pointer-events: auto; }
.back-to-top:hover { background: var(--color-coral); color: var(--color-white); }

@media (min-width: 768px) {
  .whatsapp-fab { right: var(--space-3); bottom: var(--space-3); }
  .back-to-top { right: var(--space-3); bottom: calc(var(--space-3) + 72px); }
}
```

- [ ] **Step 2: Reload and verify**

- Instagram placeholder shows dashed-border card with message.
- Contact: address-style list on the left (or top on mobile), Google Maps iframe on right.
- Footer: dark brown bg, centered logo + "Crafted with Love" script, social list, language toggle, copyright.
- WhatsApp FAB visible bottom-right with pulsing green ring.
- Back-to-top NOT yet visible (JS wiring comes in Task 10).

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "Instagram placeholder, contact + map, footer, floating WhatsApp FAB + back-to-top styling"
```

---

## Task 8: Frosting-Drip Dividers + Scroll Reveal + Hero Stagger

**Files:**
- Modify: `style.css` (append)
- Modify: `script.js` (append new module + init call)

- [ ] **Step 1: Append to `style.css`**

```css
/* ===== DRIP DIVIDER ===== */
.drip-divider { position: relative; width: 100%; height: 48px; overflow: visible; }
.drip-divider svg { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
.drip-divider path { stroke: var(--color-primary); stroke-width: 1.5; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1400; stroke-dashoffset: 1400; transition: stroke-dashoffset var(--dur-slow) var(--ease); }
.drip-divider.is-visible path { stroke-dashoffset: 0; }

/* ===== SCROLL REVEAL ===== */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity var(--dur-med) var(--ease), transform var(--dur-med) var(--ease); will-change: opacity, transform; }
.reveal.is-visible { opacity: 1; transform: none; }

/* ===== HERO STAGGER ===== */
.hero .hero-blob,
.hero .hero-eyebrow,
.hero .hero-title,
.hero .hero-sub,
.hero .hero-cta,
.hero .hero-seal { opacity: 0; transform: translateY(16px); animation: heroFade var(--dur-slow) var(--ease) forwards; }
.hero .hero-blob  { animation-delay: 0ms; }
.hero .hero-seal  { animation-delay: 150ms; }
.hero .hero-eyebrow { animation-delay: 300ms; }
.hero .hero-title { animation-delay: 450ms; }
.hero .hero-sub   { animation-delay: 600ms; }
.hero .hero-cta   { animation-delay: 750ms; }
@keyframes heroFade {
  to { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Append to `script.js`** inside IIFE, after `formHandler`:

```javascript
  // ---------- DRIP DIVIDER SVG INJECTION ----------
  const dripDivider = (() => {
    // Hand-drawn drip path — 5 scoop crests with drip tails
    const DRIP_SVG = `<svg viewBox="0 0 1400 48" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,4 C80,4 120,38 200,38 C280,38 320,4 400,4 C480,4 520,34 600,34 C680,34 720,8 800,8 C880,8 920,42 1000,42 C1080,42 1120,6 1200,6 C1280,6 1320,32 1400,32"/>
    </svg>`;
    function inject() {
      document.querySelectorAll("[data-drip]").forEach(el => { el.innerHTML = DRIP_SVG; });
    }
    return { inject };
  })();

  // ---------- SCROLL REVEAL ----------
  const scrollReveal = (() => {
    function markReveal() {
      const targets = document.querySelectorAll("section > .container, .drip-divider, .product-card, .builder-step");
      targets.forEach(el => el.classList.add("reveal"));
    }
    function observe() {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    }
    function init() {
      markReveal();
      observe();
    }
    return { init };
  })();
```

Update `DOMContentLoaded`:

```javascript
  document.addEventListener("DOMContentLoaded", () => {
    dripDivider.inject();
    orderBuilder.bind();
    docinhosGrid.render();
    formHandler.bind();
    scrollReveal.init();
  });
```

- [ ] **Step 3: Reload and verify**

- Hero elements fade up in sequence (blob → seal → eyebrow → title → sub → CTAs).
- Scrolling reveals: each section's container fades in + drip lines draw left-to-right as they hit viewport.
- With `prefers-reduced-motion: reduce` (DevTools → Rendering), animations instantly complete.

- [ ] **Step 4: Commit**

```bash
git add style.css script.js
git commit -m "Frosting-drip SVG dividers (draw on scroll), scroll-reveal IntersectionObserver, hero stagger animation"
```

---

## Task 9: Language Toggle (EN/PT) + localStorage

**Files:**
- Modify: `script.js` (append new module + init call)

- [ ] **Step 1: Append to `script.js`** inside IIFE, before the final DOMContentLoaded block, after `scrollReveal`:

```javascript
  // ---------- I18N ----------
  const i18n = (() => {
    const KEY = "sj.lang";
    function applyLang(lang) {
      document.documentElement.lang = lang;
      document.querySelectorAll("[data-en]").forEach(el => {
        const text = lang === "pt" ? el.dataset.pt : el.dataset.en;
        if (text === undefined) return;
        // Attributes: placeholder, title, content, value for options, alt
        if (el.tagName === "OPTION") {
          el.textContent = text;
        } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          if (el.hasAttribute("placeholder")) el.setAttribute("placeholder", text);
        } else if (el.tagName === "META") {
          el.setAttribute("content", text);
        } else if (el.tagName === "TITLE") {
          el.textContent = text;
          document.title = text;
        } else {
          el.textContent = text;
        }
      });
      // Update toggle buttons' visual label
      document.querySelectorAll(".lang-toggle").forEach(b => {
        const flag = b.querySelector(".lang-flag");
        const label = b.querySelector(".lang-label");
        if (lang === "pt") { flag.textContent = "🇧🇷"; label.textContent = "PT"; }
        else { flag.textContent = "🇺🇸"; label.textContent = "EN"; }
      });
    }
    function toggle() {
      const next = document.documentElement.lang === "pt" ? "en" : "pt";
      localStorage.setItem(KEY, next);
      applyLang(next);
    }
    function init() {
      const saved = localStorage.getItem(KEY) || "en";
      applyLang(saved);
      document.querySelectorAll(".lang-toggle").forEach(b => b.addEventListener("click", toggle));
    }
    return { init, applyLang };
  })();
```

Update `DOMContentLoaded`:

```javascript
  document.addEventListener("DOMContentLoaded", () => {
    dripDivider.inject();
    i18n.init();
    orderBuilder.bind();
    docinhosGrid.render();
    formHandler.bind();
    scrollReveal.init();
  });
```

- [ ] **Step 2: Reload and verify**

- Click EN/PT toggle (header or footer): all visible text swaps instantly.
- `<html lang>` attribute updates.
- Reload page → language persists from localStorage.
- Switch back: instant.
- Placeholders, select options, page title all update.
- Console clean.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Language toggle: EN/PT-BR swap with localStorage persistence"
```

---

## Task 10: Persistent UI — WhatsApp Pulse, Back to Top, Mobile Nav

**Files:**
- Modify: `script.js` (append new module + init call)

- [ ] **Step 1: Append to `script.js`** inside IIFE, after `i18n`:

```javascript
  // ---------- UTILS ----------
  const utils = (() => {
    function backToTop() {
      const btn = document.getElementById("backToTop");
      if (!btn) return;
      window.addEventListener("scroll", () => {
        btn.classList.toggle("is-visible", window.scrollY > 400);
      }, { passive: true });
      btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
    function mobileNav() {
      const burger = document.getElementById("navBurger");
      const nav = document.querySelector(".site-nav");
      if (!burger || !nav) return;
      burger.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", e => {
        if (e.target.tagName === "A") {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        }
      });
    }
    function init() {
      backToTop();
      mobileNav();
    }
    return { init };
  })();
```

Update `DOMContentLoaded`:

```javascript
  document.addEventListener("DOMContentLoaded", () => {
    dripDivider.inject();
    i18n.init();
    orderBuilder.bind();
    docinhosGrid.render();
    formHandler.bind();
    scrollReveal.init();
    utils.init();
  });
```

- [ ] **Step 2: Reload and verify**

- Scroll down 400px+ → back-to-top button fades in bottom-right (above WhatsApp FAB).
- Click back-to-top → smooth scroll to top, button fades out.
- On mobile viewport (<768px): tap burger icon → nav menu drops down. Tap a link → menu closes and scrolls to section.
- Console clean.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Utilities: back-to-top scroll behavior, mobile nav open/close"
```

---

## Task 11: QA Pass, Accessibility, Performance, Deploy

**Files:**
- Modify: `index.html` (minor adjustments if found)
- Modify: `style.css`, `script.js` (only if issues found)

- [ ] **Step 1: Cross-browser test**

Open `http://localhost:8080` in Chrome, Safari, Firefox. Check at viewports 360px, 768px, 1280px, 1920px. In each:
- Hero renders asymmetric on desktop / centered on mobile
- Header sticks on scroll
- How to Order: all 3 pill grids work; max 2 fillings enforced
- Docinhos: 3-col → 2-col → 1-col responsive
- Order Form: 2-col → 1-col, conditional fields toggle, validation triggers
- Drip dividers draw as they enter viewport
- Language toggle swaps all text; persists on reload
- WhatsApp FAB + Back-to-top positioned and functional

- [ ] **Step 2: Accessibility spot-check**

Run Chrome DevTools Lighthouse (Accessibility category). Fix any flagged issues:
- Color contrast on coral buttons / dark footer
- All interactive elements keyboard-focusable (`Tab` through the entire page — `:focus-visible` outline should be visible on every button/link/input)
- Labels present on all form fields (already in markup)
- `aria-label` on icon-only buttons (WhatsApp FAB, back-to-top, burger — already in markup)

- [ ] **Step 3: Performance spot-check**

Run Lighthouse Performance. Targets:
- LCP < 2.5s
- CLS < 0.1
- Total transfer < 500 KB

If bloated: check that Google Fonts `display=swap` is set (it is), confirm no extra network requests, check images. If the `logo-full.jpeg` is very large, suggest resizing (do not resize automatically — log a TODO note).

- [ ] **Step 4: Reduced-motion test**

DevTools → Rendering → Emulate CSS media feature → `prefers-reduced-motion: reduce`. Reload. Confirm: no hero stagger, no drip draw animation, no reveal fade-up — everything appears instantly.

- [ ] **Step 5: Submit one real test order** (optional — only if user has already registered Web3Forms and replaced the key)

Fill the form with valid data, submit. Verify:
- Success state appears
- WhatsApp tab opens with prefilled order summary
- Email arrives at `vanessa.sulevis@gmail.com`

If still on `PLACEHOLDER_WEB3FORMS_KEY`, submit will return an error — that's expected. The error state should display the WhatsApp fallback text.

- [ ] **Step 6: Deploy test to Cloudflare Pages**

Options:
- **Manual:** Go to https://dash.cloudflare.com → Workers & Pages → Create → Upload assets → drag the project folder (excluding `docs/`, `References/`, `.git/`, `node_modules/`).
- **Git-connected (preferred long-term):** Push to GitHub, connect in Cloudflare Pages UI. Build command: none. Output directory: `/`.

Verify the deployed URL renders identically to localhost.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "QA pass: accessibility, performance, reduced-motion, deploy prep" --allow-empty
```

---

## Post-Launch Handoff (user-driven)

Already documented in the HTML comment at the bottom of `index.html`. User to complete:
1. Register at web3forms.com → replace `PLACEHOLDER_WEB3FORMS_KEY` in `index.html`
2. Register at behold.so → connect `@sweetjoync` → replace the `#behold-placeholder` div with the Behold embed
3. Drop real photos into `assets/images/` (founder.jpg + product shots)
4. Set up Google Business Profile
5. Submit sitemap to Google Search Console
6. Point custom domain at Cloudflare Pages (optional)

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Section 1 (Hero) → Task 3 + 8 (animations)
- ✅ Section 2 (About) → Task 3
- ✅ Section 3 (How to Order) → Task 4
- ✅ Section 4 (Docinhos) → Task 5
- ✅ Section 5 (Instagram) → Task 7
- ✅ Section 6 (Order Form + Web3Forms + WhatsApp redirect) → Task 6
- ✅ Section 7 (Contact + map) → Task 7
- ✅ Section 8 (Footer) → Task 7
- ✅ Floating WhatsApp + Back to Top → Task 7 (CSS) + Task 10 (JS)
- ✅ Bilingual toggle + localStorage → Task 9
- ✅ Design tokens + typography → Task 2
- ✅ Frosting-drip signature detail → Task 8
- ✅ Scroll-reveal animations → Task 8
- ✅ Post-launch comment block → Task 1
- ✅ WhatsApp redirect notification flow → Task 6

**Type/name consistency:** `orderBuilder.state`, `DOCINHOS` array, `i18n.applyLang`, `formHandler.bind`, `scrollReveal.init`, `utils.init`, `dripDivider.inject`, `docinhosGrid.render` — all referenced consistently. CSS classes `.pill`, `.is-selected`, `.reveal`, `.is-visible`, `.drip-divider`, `.field`, `.field--error`, `.conditional` — consistent.

**Placeholders:** The only placeholders are the two intentional ones documented in the post-launch block (`PLACEHOLDER_WEB3FORMS_KEY` and Behold embed). No TBDs in task steps.

**Scope:** Single site, single plan. Not decomposed.
