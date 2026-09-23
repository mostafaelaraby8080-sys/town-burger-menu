/* =========================================================
   Town Burger — التفاعل: عرض المنيو + السلة + الطلب واتساب
   ========================================================= */

(function () {
  const WHATSAPP_NUMBER = "201270513377"; // رقم واتساب بصيغة دولية بدون +

  const tabsEl = document.getElementById("categoryTabs");
  const panelsEl = document.getElementById("menuPanels");

  /* ---------------- Cart state ---------------- */
  let cart = []; // { key, name, size, price, qty }

  function money(n) {
    return n.toLocaleString("ar-EG");
  }

  function findCartEntry(key) {
    return cart.find((c) => c.key === key);
  }

  function addToCart(key, name, size, price) {
    const existing = findCartEntry(key);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ key, name, size, price, qty: 1 });
    }
    renderCart();
    openCart();
    pulseCartButton();
  }

  function changeQty(key, delta) {
    const entry = findCartEntry(key);
    if (!entry) return;
    entry.qty += delta;
    if (entry.qty <= 0) {
      cart = cart.filter((c) => c.key !== key);
    }
    renderCart();
  }

  function cartCount() {
    return cart.reduce((sum, c) => sum + c.qty, 0);
  }

  function cartTotal() {
    return cart.reduce((sum, c) => sum + c.qty * c.price, 0);
  }

  /* ---------------- Menu rendering ---------------- */

  function renderPriceControl(item, categoryId) {
    if (item.sizes) {
      return `
        <div class="size-buttons">
          ${item.sizes
            .map((s) => {
              const key = `${categoryId}__${item.name}__${s.label}`;
              return `
                <button class="size-btn"
                  data-key="${key}"
                  data-name="${item.name}"
                  data-size="${s.label}"
                  data-price="${s.price}">
                  ${s.label} · ${money(s.price)} <span class="size-btn__unit">ج.م</span>
                </button>`;
            })
            .join("")}
        </div>`;
    }

    const key = `${categoryId}__${item.name}`;
    return `
      <div class="single-price">
        <span class="item-row__price">${money(item.price)}</span>
        <button class="order-btn"
          data-key="${key}"
          data-name="${item.name}"
          data-size=""
          data-price="${item.price}">
          اطلب الآن
        </button>
      </div>`;
  }

  function renderItem(item, categoryId) {
    const featuredClass = item.featured ? " is-featured" : "";
    const desc = item.desc
      ? `<span class="item-row__desc">${item.desc}</span>`
      : "";
    return `
      <div class="item-row${featuredClass}">
        <div class="item-row__info">
          <span class="item-row__name">${item.name}${desc}</span>
        </div>
        ${renderPriceControl(item, categoryId)}
      </div>`;
  }

  function renderPanel(category, index) {
    const note = category.note
      ? `<p class="panel-note">${category.note}</p>`
      : "";

    let body = "";
    if (category.groups) {
      body = category.groups
        .map(
          (group) => `
          <div class="subgroup">
            <p class="subgroup__label">${group.label}</p>
            <div class="item-list">
              ${group.items.map((it) => renderItem(it, category.id)).join("")}
            </div>
          </div>`
        )
        .join("");
    } else {
      body = `<div class="item-list">${category.items
        .map((it) => renderItem(it, category.id))
        .join("")}</div>`;
    }

    return `
      <div class="menu-panel${index === 0 ? " is-active" : ""}" id="panel-${category.id}" role="tabpanel">
        <div class="panel-head">
          <h3><span>${category.icon || ""}</span>${category.title}</h3>
        </div>
        ${note}
        ${body}
      </div>`;
  }

  function renderTab(category, index) {
    return `
      <button class="tab-btn${index === 0 ? " is-active" : ""}"
              data-target="panel-${category.id}"
              role="tab"
              aria-selected="${index === 0}">
        <span>${category.icon || ""}</span> ${category.title}
      </button>`;
  }

  function initMenu() {
    tabsEl.innerHTML = MENU_DATA.map(renderTab).join("");
    panelsEl.innerHTML = MENU_DATA.map(renderPanel).join("");

    // Tabs
    const tabButtons = tabsEl.querySelectorAll(".tab-btn");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        tabButtons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        panelsEl.querySelectorAll(".menu-panel").forEach((p) => {
          p.classList.toggle("is-active", p.id === targetId);
        });
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });

    // Order buttons (single price + size variants), delegated
    panelsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".order-btn, .size-btn");
      if (!btn) return;
      const { key, name, size, price } = btn.dataset;
      addToCart(key, name, size, Number(price));
    });
  }

  /* ---------------- Cart UI ---------------- */
  const cartPanel = document.getElementById("cartPanel");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountEls = document.querySelectorAll(".cart-count");
  const cartEmptyEl = document.getElementById("cartEmpty");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const floatingCart = document.getElementById("floatingCart");

  function renderCart() {
    if (cart.length === 0) {
      cartItemsEl.innerHTML = "";
      cartEmptyEl.style.display = "block";
      checkoutBtn.disabled = true;
    } else {
      cartEmptyEl.style.display = "none";
      checkoutBtn.disabled = false;
      cartItemsEl.innerHTML = cart
        .map(
          (c) => `
        <li class="cart-item">
          <div class="cart-item__info">
            <strong>${c.name}</strong>
            ${c.size ? `<span class="cart-item__size">${c.size}</span>` : ""}
            <span class="cart-item__price">${money(c.price)} ج.م</span>
          </div>
          <div class="cart-item__qty">
            <button class="qty-btn" data-key="${c.key}" data-delta="-1" aria-label="تقليل الكمية">−</button>
            <span>${c.qty}</span>
            <button class="qty-btn" data-key="${c.key}" data-delta="1" aria-label="زيادة الكمية">+</button>
          </div>
        </li>`
        )
        .join("");
    }

    cartTotalEl.textContent = `${money(cartTotal())} ج.م`;
    cartCountEls.forEach((el) => (el.textContent = cartCount()));
    floatingCart.classList.toggle("has-items", cartCount() > 0);
  }

  cartItemsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;
    changeQty(btn.dataset.key, Number(btn.dataset.delta));
  });

  function openCart() {
    cartPanel.classList.add("is-open");
    cartOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartPanel.classList.remove("is-open");
    cartOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function pulseCartButton() {
    floatingCart.classList.remove("pulse");
    // force reflow so the animation can restart
    void floatingCart.offsetWidth;
    floatingCart.classList.add("pulse");
  }

  floatingCart.addEventListener("click", openCart);
  cartOverlay.addEventListener("click", closeCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    const lines = cart.map(
      (c) =>
        `• ${c.name}${c.size ? ` (${c.size})` : ""} × ${c.qty} = ${money(c.qty * c.price)} ج.م`
    );
    const message =
      "أهلاً تاون برجر، عايز أطلب:\n\n" +
      lines.join("\n") +
      `\n\nالإجمالي: ${money(cartTotal())} ج.م` +
      "\n\nالعنوان: ";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  });

  /* ---------------- Mobile nav ---------------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- Scroll polish ---------------- */
  const revealElements = document.querySelectorAll(
    ".section-head, .menu-section, .contact__inner, .site-footer"
  );
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal-on-scroll");
    revealObserver.observe(element);
  });

  const sectionLinks = [...mainNav.querySelectorAll(".nav-link")];
  const trackedSections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          link.classList.toggle(
            "is-current",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  trackedSections.forEach((section) => navObserver.observe(section));

  /* ---------------- Init ---------------- */
  initMenu();
  renderCart();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
