(() => {
  "use strict";

  // ---------- DOCINHOS DATA ----------
  const DOCINHOS = [
    { en: "Chocolate Brigadeiro w/ Vermicelli",    pt: "Brigadeiro de chocolate com Vermicelli", price: 80,  img: "assets/images/gourmet sweets/chocolate-brigadeiro-vermicelli.jpg" },
    { en: "Chocolate Brigadeiro w/ Granulé",       pt: "Brigadeiro de chocolate com Granulé",    price: 100, img: "assets/images/gourmet sweets/chocolate-brigadeiro-granule.jpg" },
    { en: "Coconut Brigadeiro",                    pt: "Brigadeiro de coco",                     price: 80,  img: "assets/images/gourmet sweets/coconut.jpg" },
    { en: "Two-Flavor Brigadeiro",                 pt: "Brigadeiro dois amores",                 price: 80,  img: "assets/images/gourmet sweets/two-flavor.jpg" },
    { en: "Peanut Brigadeiro",                     pt: "Brigadeiro de amendoim",                 price: 80,  img: "assets/images/gourmet sweets/peanut.jpg" },
    { en: "Ninho Milk Brigadeiro",                 pt: "Brigadeiro de ninho",                    price: 80,  img: "assets/images/gourmet sweets/ninho.jpg" },
    { en: "Strawberry Brigadeiro",                 pt: "Brigadeiro de morango (Nesquik)",        price: 80,  img: "assets/images/gourmet sweets/strawberry.jpg" },
    { en: "Sicilian Lemon Brigadeiro",             pt: "Brigadeiro de limão siciliano",          price: 80,  img: "assets/images/gourmet sweets/sicilian-lemon.jpg" },
    { en: "Oreo Brigadeiro",                       pt: "Brigadeiro de Oreo",                     price: 90,  img: "assets/images/gourmet sweets/oreo.jpg" },
    { en: "Churros Brigadeiro",                    pt: "Brigadeiro de churros",                  price: 90,  img: "assets/images/gourmet sweets/churros.jpg" },
    { en: "Passion Fruit Brigadeiro",              pt: "Brigadeiro de maracujá",                 price: 90,  img: "assets/images/gourmet sweets/passion-fruit.jpg" },
    { en: "Salted Caramel Brigadeiro",             pt: "Brigadeiro de caramelo salgado",         price: 90,  img: "assets/images/gourmet sweets/salted-caramel.jpg" },
    { en: "Walnut Brigadeiro",                     pt: "Brigadeiro de nozes",                    price: 100, img: "assets/images/gourmet sweets/wallnut.jpg" },
    { en: "Pistachio Brigadeiro",                  pt: "Brigadeiro de Pistache",                 price: 100, img: "assets/images/gourmet sweets/pistachio.jpg" },
    { en: "Grape Surprise",                        pt: "Surpresa de uva",                        price: 100, img: "assets/images/gourmet sweets/grape-surprise.jpg" },
    { en: "Alcoholic Brigadeiro",                  pt: "Brigadeiro alcoólico",                   price: 100, img: "assets/images/gourmet sweets/alcoholic-brigadeiro.jpg" },
    { en: "Chocolate Cups w/ Filling",             pt: "Copinhos de chocolate com recheio",      price: 100, img: "assets/images/gourmet sweets/chocolate-cups.jpg" }
  ];

  // ---------- ORDER BUILDER ----------
  const orderBuilder = (() => {
    const state = { size: null, batter: null, fillings: [] };

    function updateSummary() {
      const lang = document.documentElement.lang;
      const sz = document.getElementById("sumSize");
      const bt = document.getElementById("sumBatter");
      const fl = document.getElementById("sumFillings");
      if (sz) sz.textContent = state.size ? state.size : "—";
      if (bt) {
        if (state.batter) {
          bt.textContent = lang === "pt" && state.batter === "Vanilla" ? "Baunilha" : state.batter;
        } else {
          bt.textContent = "—";
        }
      }
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
          if (!pill || (pill.disabled && !pill.classList.contains("is-selected"))) return;

          if (multi > 0) {
            const isSelected = pill.classList.toggle("is-selected");
            const val = pill.dataset.value;
            if (isSelected) {
              state.fillings.push(val);
            } else {
              state.fillings = state.fillings.filter(v => v !== val);
            }
            grid.querySelectorAll(".pill").forEach(p => {
              if (!p.classList.contains("is-selected")) {
                p.disabled = state.fillings.length >= multi;
              }
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
          window.dispatchEvent(new CustomEvent("order:prefill", {
            detail: {
              source: "builder",
              size: state.size || "",
              batter: state.batter,
              fillings: [...state.fillings],
              product: "Custom Cake"
            }
          }));
          const form = document.getElementById("order-form");
          if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }

    return { bind, state };
  })();

  // ---------- DOCINHOS GRID ----------
  const docinhosGrid = (() => {
    function escapeHtml(s) {
      return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    }
    function escapeAttr(s) {
      return String(s).replace(/"/g, "&quot;");
    }

    function render() {
      const grid = document.getElementById("docinhosGrid");
      if (!grid) return;
      grid.innerHTML = DOCINHOS.map(d => `
        <article class="product-card">
          <div class="product-thumb"${d.img ? "" : ' aria-hidden="true"'}>
            ${d.img ? `<img src="${escapeAttr(d.img)}" alt="${escapeAttr(d.en)} — Sweet &amp; Joy" loading="lazy">` : "Photo"}
          </div>
          <div class="product-body">
            <h3 class="product-name" data-en="${escapeHtml(d.en)}" data-pt="${escapeHtml(d.pt)}">${escapeHtml(d.en)}</h3>
            <span class="price-badge">$${d.price} / 100</span>
            <button type="button" class="btn btn-ghost" data-action="order-sweet" data-name="${escapeAttr(d.en)}" data-en="Order This" data-pt="Pedir">Order This</button>
          </div>
        </article>
      `).join("");
      if (document.documentElement.lang === "pt") {
        grid.querySelectorAll("[data-en]").forEach(el => { if (el.dataset.pt) el.textContent = el.dataset.pt; });
      }

      grid.addEventListener("click", e => {
        const btn = e.target.closest("[data-action='order-sweet']");
        if (!btn) return;
        window.dispatchEvent(new CustomEvent("order:prefill", {
          detail: { source: "card", product: "Gourmet Sweets", note: btn.dataset.name }
        }));
        const form = document.getElementById("order-form");
        if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    return { render };
  })();

  // ---------- FORM HANDLER ----------
  const formHandler = (() => {
    function getForm() { return document.getElementById("orderForm"); }
    function getStatus() { return document.getElementById("formStatus"); }
    function tr(en, pt) { return document.documentElement.lang === "pt" ? pt : en; }

    function showConditionals() {
      const select = document.getElementById("f-interest");
      if (!select) return;
      const current = select.value;
      document.querySelectorAll(".conditional").forEach(el => {
        const showWhen = (el.dataset.showWhen || "").split(",");
        el.hidden = !showWhen.includes(current);
      });
    }

    function enforceFillingsMax() {
      const grid = getForm().querySelector(".checkbox-grid[data-max]");
      if (!grid) return;
      const max = parseInt(grid.dataset.max, 10);
      grid.addEventListener("change", () => {
        const boxes = grid.querySelectorAll("input[type=checkbox]");
        const count = grid.querySelectorAll("input[type=checkbox]:checked").length;
        boxes.forEach(b => { if (!b.checked) b.disabled = count >= max; });
      });
    }

    function validate() {
      const f = getForm();
      let ok = true;
      f.querySelectorAll(".field").forEach(field => field.classList.remove("field--error"));

      const name = f.elements["name"];
      if (!name || !name.value.trim()) { name && name.closest(".field").classList.add("field--error"); ok = false; }

      const email = f.elements["email"];
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email && email.closest(".field").classList.add("field--error"); ok = false; }

      const date = f.elements["event_date"];
      if (date) {
        if (!date.value) {
          date.closest(".field").classList.add("field--error"); ok = false;
        } else {
          const picked = new Date(date.value + "T00:00:00");
          const minDate = new Date(); minDate.setHours(0, 0, 0, 0); minDate.setDate(minDate.getDate() + 5);
          if (picked < minDate) { date.closest(".field").classList.add("field--error"); ok = false; }
        }
      }

      const interest = f.elements["product_interest"];
      if (!interest || !interest.value) { interest && interest.closest(".field").classList.add("field--error"); ok = false; }

      return ok;
    }

    function serializeForm() {
      const fd = new FormData(getForm());
      const obj = {};
      for (const [k, v] of fd.entries()) {
        if (k === "fillings") { obj.fillings = obj.fillings || []; obj.fillings.push(v); }
        else { obj[k] = v; }
      }
      return obj;
    }

    function buildWhatsAppUrl(data) {
      const lang = document.documentElement.lang;
      const lines = lang === "pt" ? [
        "Olá Vanessa! Novo pedido pelo site Sweet & Joy:",
        "",
        `Nome: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Telefone: ${data.phone}` : null,
        `Data do evento: ${data.event_date}`,
        `Produto: ${data.product_interest}`,
        data.cake_size ? `Tamanho: ${data.cake_size}` : null,
        data.batter_flavor ? `Massa: ${data.batter_flavor}` : null,
        data.fillings && data.fillings.length ? `Recheios: ${data.fillings.join(", ")}` : null,
        data.docinhos_qty ? `Quantidade de docinhos: ${data.docinhos_qty}` : null,
        data.special_requests ? `Observações: ${data.special_requests}` : null,
      ] : [
        "Hi Vanessa! New order from the Sweet & Joy website:",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        `Event date: ${data.event_date}`,
        `Interested in: ${data.product_interest}`,
        data.cake_size ? `Cake size: ${data.cake_size}` : null,
        data.batter_flavor ? `Batter: ${data.batter_flavor}` : null,
        data.fillings && data.fillings.length ? `Fillings: ${data.fillings.join(", ")}` : null,
        data.docinhos_qty ? `Docinhos quantity: ${data.docinhos_qty}` : null,
        data.special_requests ? `Notes: ${data.special_requests}` : null,
      ];
      const msg = lines.filter(Boolean).join("\n");
      return `https://wa.me/13369891342?text=${encodeURIComponent(msg)}`;
    }

    function applyPrefill(detail) {
      const f = getForm();
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
      if (detail.fillings && detail.fillings.length) {
        f.querySelectorAll("input[name=fillings]").forEach(b => { b.checked = detail.fillings.includes(b.value); });
        const grid = f.querySelector(".checkbox-grid");
        if (grid) grid.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (detail.note) {
        const notes = f.elements["special_requests"];
        if (notes) {
          const prefix = detail.source === "card" ? `Interested in: ${detail.note}\n` : "";
          notes.value = prefix + (notes.value || "");
        }
      }
    }

    async function handleSubmit(e) {
      e.preventDefault();
      const statusEl = getStatus();
      if (!validate()) {
        statusEl.hidden = false;
        statusEl.className = "form-status is-error";
        statusEl.textContent = tr(
          "Please fix the highlighted fields and try again.",
          "Corrija os campos destacados e tente novamente."
        );
        statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      const submitBtn = document.getElementById("submitOrderBtn");
      submitBtn.disabled = true;
      submitBtn.textContent = tr("Sending…", "Enviando…");

      const data = serializeForm();
      const fd = new FormData(getForm());

      try {
        const resp = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
        const json = await resp.json().catch(() => ({}));
        if (!resp.ok || json.success === false) throw new Error(json.message || "Submission failed");

        const waUrl = buildWhatsAppUrl(data);
        statusEl.hidden = false;
        statusEl.className = "form-status is-success";
        statusEl.innerHTML = tr(
          `Thank you! Your order request is in Vanessa's inbox. <a class="wa-confirm-btn" href="${waUrl}" target="_blank" rel="noopener">💬 Confirm on WhatsApp</a>`,
          `Obrigada! Seu pedido já está na caixa da Vanessa. <a class="wa-confirm-btn" href="${waUrl}" target="_blank" rel="noopener">💬 Confirmar pelo WhatsApp</a>`
        );
        getForm().reset();
        showConditionals();
        statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (err) {
        console.error("Order form submission error:", err);
        statusEl.hidden = false;
        statusEl.className = "form-status is-error";
        statusEl.textContent = tr(
          "Something went wrong. Please try again or message us on WhatsApp at (336) 989-1342.",
          "Algo deu errado. Tente novamente ou fale com a gente no WhatsApp: (336) 989-1342."
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = tr("Send Order Request", "Enviar Pedido");
      }
    }

    function bind() {
      const f = getForm();
      if (!f) return;
      f.addEventListener("submit", handleSubmit);
      const interestSelect = document.getElementById("f-interest");
      if (interestSelect) interestSelect.addEventListener("change", showConditionals);
      enforceFillingsMax();
      showConditionals();
      window.addEventListener("order:prefill", e => applyPrefill(e.detail));
    }

    return { bind };
  })();

  // ---------- DRIP DIVIDER ----------
  const dripDivider = (() => {
    const DRIP_PATH = "M0,4 C80,4 120,38 200,38 C280,38 320,4 400,4 C480,4 520,34 600,34 C680,34 720,8 800,8 C880,8 920,42 1000,42 C1080,42 1120,6 1200,6 C1280,6 1320,32 1400,32";

    function inject() {
      document.querySelectorAll("[data-drip]").forEach(el => {
        el.innerHTML = `<svg viewBox="0 0 1400 48" preserveAspectRatio="none" aria-hidden="true"><path d="${DRIP_PATH}"/></svg>`;
      });
    }

    return { inject };
  })();

  // ---------- SCROLL REVEAL ----------
  const scrollReveal = (() => {
    function init() {
      document.querySelectorAll("section > .container, .drip-divider, .product-card, .builder-step").forEach(el => {
        el.classList.add("reveal");
      });

      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.05 });

      document.querySelectorAll(".reveal").forEach(el => io.observe(el));

      // Fallback: force-reveal anything still hidden after 1.5s (iOS Safari safety net)
      setTimeout(() => {
        document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => el.classList.add("is-visible"));
      }, 1500);
    }

    return { init };
  })();

  // ---------- I18N ----------
  const i18n = (() => {
    const STORAGE_KEY = "sj.lang";

    function applyLang(lang) {
      document.documentElement.lang = lang;

      document.querySelectorAll("[data-en]").forEach(el => {
        const text = lang === "pt" ? el.dataset.pt : el.dataset.en;
        if (text === undefined) return;

        if (el.tagName === "TITLE") {
          document.title = text;
        } else if (el.tagName === "META") {
          el.setAttribute("content", text);
        } else if (el.tagName === "OPTION") {
          el.textContent = text;
        } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          if (el.hasAttribute("placeholder")) el.setAttribute("placeholder", text);
        } else {
          el.textContent = text;
        }
      });

      document.querySelectorAll(".lang-toggle").forEach(btn => {
        const flag = btn.querySelector(".lang-flag");
        const label = btn.querySelector(".lang-label");
        if (flag) flag.textContent = lang === "pt" ? "🇧🇷" : "🇺🇸";
        if (label) label.textContent = lang === "pt" ? "PT" : "EN";
      });
    }

    function toggle() {
      const next = document.documentElement.lang === "pt" ? "en" : "pt";
      localStorage.setItem(STORAGE_KEY, next);
      applyLang(next);
    }

    function init() {
      const saved = localStorage.getItem(STORAGE_KEY) || "en";
      applyLang(saved);
      document.querySelectorAll(".lang-toggle").forEach(btn => btn.addEventListener("click", toggle));
    }

    return { init, applyLang };
  })();

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

  // ---------- HERO CAROUSEL ----------
  const heroCarousel = (() => {
    const INTERVAL = 2500;
    let timer = null;
    let current = 0;
    let slides = [];
    let dots = [];

    function goTo(idx) {
      slides[current].classList.remove("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      if (dots[current]) dots[current].classList.add("is-active");
    }

    function next() { goTo(current + 1); }

    function start() {
      clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }

    function pause() { clearInterval(timer); }

    function buildDots(container) {
      const dotsEl = container.querySelector(".hero-carousel-dots");
      if (!dotsEl) return;
      slides.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "hero-dot" + (i === 0 ? " is-active" : "");
        btn.setAttribute("aria-label", "Slide " + (i + 1));
        btn.addEventListener("click", () => { pause(); goTo(i); start(); });
        dotsEl.appendChild(btn);
      });
      dots = Array.from(dotsEl.querySelectorAll(".hero-dot"));
    }

    function init() {
      const container = document.getElementById("heroCarousel");
      if (!container) return;
      slides = Array.from(container.querySelectorAll(".hero-slide"));
      if (slides.length < 2) return;
      buildDots(container);
      container.addEventListener("mouseenter", pause);
      container.addEventListener("mouseleave", start);
      container.addEventListener("touchstart", pause, { passive: true });
      container.addEventListener("touchend", () => { start(); }, { passive: true });
      start();
    }

    return { init };
  })();

  // ---------- VACATION MODE ----------
  const vacationMode = (() => {
    function fmtDate(dateStr) {
      return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" });
    }

    async function init() {
      try {
        const res = await fetch("/api/vacation");
        const data = await res.json();
        if (!data.vacationMode) return;

        const today = new Date().toISOString().split("T")[0];
        if (today < data.startDate || today > data.endDate) return;

        const lang = document.documentElement.lang;
        const endFmt = fmtDate(data.endDate);

        const banner = document.getElementById("vacation-banner");
        const bannerMsg = document.getElementById("vacation-banner-msg");
        if (banner && bannerMsg) {
          bannerMsg.textContent = lang === "pt"
            ? `Estou de férias e volto em ${endFmt}. ${data.message || ""}`
            : `I'm on vacation and back ${endFmt}. ${data.message || ""}`;
          banner.hidden = false;
        }

        const form = document.querySelector("#order-form form");
        if (form) {
          const notice = document.createElement("div");
          notice.className = "vacation-form-notice";
          notice.textContent = lang === "pt"
            ? `Estou de férias até ${endFmt}. Você ainda pode enviar sua mensagem — retornarei assim que voltar!`
            : `I'm on vacation until ${endFmt}. You can still send your request — I'll reply as soon as I'm back!`;
          form.prepend(notice);
        }
      } catch {
        // Fail silently — don't break the site if the API is unavailable
      }
    }

    return { init };
  })();

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", () => {
    i18n.init();
    dripDivider.inject();
    orderBuilder.bind();
    docinhosGrid.render();
    formHandler.bind();
    heroCarousel.init();
    scrollReveal.init();
    utils.init();
    vacationMode.init();
  });
})();
