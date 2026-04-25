(() => {
  "use strict";

  // ---------- DOCINHOS DATA ----------
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

  // Expose DOCINHOS for other modules
  window.__SJ__ = { DOCINHOS };

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", () => {
    orderBuilder.bind();
  });
})();
