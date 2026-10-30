/* ============================================================
   Le Stère Français – logique du site (en-tête, panier, WhatsApp, pages)
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const findProduct = id => PRODUCTS.find(p => p.id === id);
const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || "";

/* ---------- Illustrations par catégorie ---------- */
const ART = {
  bois: `<svg viewBox="0 0 200 150" aria-hidden="true"><rect width="200" height="150" fill="#efe2cf"/>
    ${[[60,95],[100,95],[140,95],[80,60],[120,60],[100,28]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="20" fill="#b97a45"/><circle cx="${x}" cy="${y}" r="14" fill="#e3b77f"/><circle cx="${x}" cy="${y}" r="8" fill="none" stroke="#b97a45" stroke-width="2"/><circle cx="${x}" cy="${y}" r="2.5" fill="#8a5428"/>`).join("")}
    <rect x="30" y="115" width="140" height="8" rx="2" fill="#6b4a2f"/></svg>`,
  granules: `<svg viewBox="0 0 200 150" aria-hidden="true"><rect width="200" height="150" fill="#e8ecdf"/>
    <path d="M65 30h70l8 95H57z" fill="#3f6b4a"/><rect x="65" y="22" width="70" height="12" rx="3" fill="#2f5238"/>
    <rect x="75" y="58" width="50" height="30" rx="4" fill="#f4efe4"/><path d="M92 66c6 4 10 9 8 16-3-3-7-3-10 0-3-6-2-11 2-16z" fill="#d9622b"/>
    ${Array.from({length:18},(_,i)=>`<rect x="${40+((i*37)%120)}" y="${128+((i*7)%12)}" width="9" height="4" rx="2" fill="#c49a6c" transform="rotate(${(i*29)%60-30} ${44+((i*37)%120)} ${130+((i*7)%12)})"/>`).join("")}</svg>`,
  densifie: `<svg viewBox="0 0 200 150" aria-hidden="true"><rect width="200" height="150" fill="#f0e6da"/>
    ${[[45,92],[100,92],[72,58],[127,58],[155,92]].map(([x,y]) =>
      `<rect x="${x-26}" y="${y-16}" width="52" height="32" rx="5" fill="#a8703f"/><rect x="${x-20}" y="${y-10}" width="40" height="20" rx="3" fill="#d4a26b"/><circle cx="${x}" cy="${y}" r="4" fill="#8a5428"/>`).join("")}
    <rect x="15" y="112" width="170" height="8" rx="2" fill="#6b4a2f"/></svg>`,
  allumage: `<svg viewBox="0 0 200 150" aria-hidden="true"><rect width="200" height="150" fill="#f6e7d8"/>
    ${[0,1,2,3,4,5,6].map(i=>`<rect x="${50+i*14}" y="${70-(i%2)*6}" width="8" height="${55+(i%2)*6}" rx="2" fill="${i%2?'#d8b07c':'#c4925a'}"/>`).join("")}
    <path d="M100 18c18 14 28 30 20 48-4-8-10-10-14-8 2 8-2 14-8 16-8-4-12-14-6-26 2 6 6 8 8 6-6-10-4-22 0-36z" fill="#d9622b"/>
    <path d="M100 44c8 8 10 16 6 22-4-4-8-4-10 0-4-6-2-14 4-22z" fill="#f2a541"/></svg>`,
  accessoires: `<svg viewBox="0 0 200 150" aria-hidden="true"><rect width="200" height="150" fill="#e9e6e1"/>
    <path d="M70 52h60l-6 72H76z" fill="#5b5f63"/><rect x="64" y="44" width="72" height="10" rx="4" fill="#3e4245"/>
    <path d="M80 44c0-16 40-16 40 0" fill="none" stroke="#3e4245" stroke-width="4"/>
    <rect x="80" y="70" width="40" height="4" rx="2" fill="#7a7f84"/><rect x="80" y="92" width="40" height="4" rx="2" fill="#7a7f84"/>
    <rect x="146" y="40" width="6" height="84" rx="3" fill="#3e4245"/><path d="M140 118h18l-4 10h-10z" fill="#3e4245"/>
    <rect x="30" y="122" width="140" height="6" rx="2" fill="#b8b2a8"/></svg>`
};
const art = cat => ART[cat] || ART.bois;

/* ---------- Photos (repli sur l'illustration si aucune photo) ---------- */
const imgTag = (src, alt) => `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" width="800" height="600">`;
function catImg(c) {
  return c.imgs?.length ? imgTag(c.imgs[0], c.name) : art(c.id);
}
function productImg(p) {
  if (p.img) return imgTag(p.img, p.name);
  const c = CATEGORIES.find(x => x.id === p.cat);
  if (!c?.imgs?.length) return art(p.cat);
  const i = PRODUCTS.filter(x => x.cat === p.cat).indexOf(p);
  return imgTag(c.imgs[i % c.imgs.length], p.name);
}

/* ---------- Panier (localStorage avec repli en mémoire) ---------- */
const CART_KEY = "stere_francais_cart";
let cart = (() => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } })()
  .filter(i => findProduct(i.id));

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* stockage indisponible */ }
  updateCartCount();
}
function addToCart(id, qty = 1) {
  const line = cart.find(i => i.id === id);
  if (line) line.qty += qty; else cart.push({ id, qty });
  saveCart();
  toast(`${findProduct(id).name} ajouté au panier`);
}
function setQty(id, qty) {
  cart = qty > 0 ? cart.map(i => i.id === id ? { ...i, qty } : i) : cart.filter(i => i.id !== id);
  saveCart();
}
const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
const cartTotal = () => cart.reduce((t, i) => t + findProduct(i.id).price * i.qty, 0);
function updateCartCount() {
  $$(".cart-count").forEach(el => { el.textContent = cartCount(); el.hidden = cartCount() === 0; });
}

/* ---------- WhatsApp ---------- */
const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

function orderMessage(items, client = {}) {
  const lines = items.map(({ id, qty }) => {
    const p = findProduct(id);
    return `• ${qty} × ${p.name} (${p.unit}) – ${fmt(p.price * qty)}`;
  });
  const total = items.reduce((t, { id, qty }) => t + findProduct(id).price * qty, 0);
  let msg = `Bonjour ${CONFIG.brand}, je souhaite commander :\n\n${lines.join("\n")}\n\nTotal estimé : ${fmt(total)} (hors livraison)`;
  const info = [
    client.name && `Nom : ${client.name}`,
    client.phone && `Téléphone : ${client.phone}`,
    client.address && `Adresse : ${client.address}`,
    (client.zip || client.city) && `Code postal / Ville : ${[client.zip, client.city].filter(Boolean).join(" ")}`,
    client.note && `Remarque : ${client.note}`
  ].filter(Boolean);
  if (info.length) msg += `\n\n${info.join("\n")}`;
  return msg + "\n\nMerci de me confirmer la disponibilité et les frais de livraison.";
}

function orderNow(id, qty = 1) {
  window.open(waLink(orderMessage([{ id, qty }])), "_blank", "noopener");
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(text) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.innerHTML = `${esc(text)} <a href="panier.html">Voir le panier</a>`;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

/* ---------- En-tête / pied de page ---------- */
const ICON = {
  flame: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c3 3.5 6 7 6 11a6 6 0 0 1-12 0c0-2.5 1.2-4.4 2.6-5.8.2 1.9 1 3.1 2.1 3.6C10.4 8 11 5 12 2z" fill="currentColor"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.5" fill="currentColor"/><circle cx="17" cy="20" r="1.5" fill="currentColor"/></svg>`,
  wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
};

function renderChrome() {
  const page = document.body.dataset.page;
  const links = [["index.html", "Accueil", "home"], ["boutique.html", "Boutique", "shop"], ["livraison.html", "Livraison", "livraison"], ["faq.html", "FAQ", "faq"], ["contact.html", "Contact", "contact"]];
  const header = $("#site-header");
  if (header) header.innerHTML = `
    <div class="topbar">Commande simple et rapide sur WhatsApp · ${esc(CONFIG.phoneDisplay)}</div>
    <div class="container nav">
      <a href="index.html" class="logo"><img src="assets/img/logo-mark.svg" alt="" width="40" height="40"><span>${esc(CONFIG.brand)}</span></a>
      <nav class="nav-links" id="nav-links">
        ${links.map(([href, label, id]) => `<a href="${href}"${page === id ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <a href="panier.html" class="cart-btn" aria-label="Panier">${ICON.cart}<span class="cart-count" hidden>0</span></a>
        <button class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">${ICON.menu}</button>
      </div>
    </div>`;

  const footer = $("#site-footer");
  if (footer) footer.innerHTML = `
    <div class="container footer-grid">
      <div>
        <a href="index.html" class="logo logo-light"><img src="assets/img/logo-mark.svg" alt="" width="40" height="40"><span>${esc(CONFIG.brand)}</span></a>
        <p>${esc(CONFIG.tagline)}. Bois sec, granulés certifiés et conseils pour bien vous chauffer.</p>
      </div>
      <div>
        <h4>Boutique</h4>
        ${CATEGORIES.map(c => `<a href="boutique.html?cat=${c.id}">${esc(c.name)}</a>`).join("")}
      </div>
      <div>
        <h4>Informations</h4>
        <a href="livraison.html">Livraison</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a>
        <a href="legal.html">Mentions légales</a><a href="legal.html#cgv">CGV</a><a href="legal.html#confidentialite">Confidentialité</a><a href="legal.html#credits">Crédits photos</a>
      </div>
      <div>
        <h4>Nous joindre</h4>
        <a href="${waLink(`Bonjour ${CONFIG.brand}, j'ai une question.`)}" target="_blank" rel="noopener">WhatsApp : ${esc(CONFIG.phoneDisplay)}</a>
        ${CONFIG.email ? `<a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>` : ""}
        <span>${esc(CONFIG.hours)}</span>
      </div>
    </div>
    <div class="container footer-bottom">© ${new Date().getFullYear()} ${esc(CONFIG.brand)} · Tous droits réservés</div>`;

  const fab = document.createElement("a");
  fab.className = "wa-fab";
  fab.href = waLink(`Bonjour ${CONFIG.brand}, j'ai une question.`);
  fab.target = "_blank"; fab.rel = "noopener";
  fab.setAttribute("aria-label", "Nous écrire sur WhatsApp");
  fab.innerHTML = ICON.wa;
  document.body.appendChild(fab);

  const menuBtn = $(".menu-btn");
  menuBtn?.addEventListener("click", () => {
    const open = $("#nav-links").classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa || `Bonjour ${CONFIG.brand}, j'ai une question.`); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-phone]").forEach(el => el.textContent = CONFIG.phoneDisplay);
  updateCartCount();
}

/* ---------- Cartes produit ---------- */
function productCard(p) {
  return `
    <article class="card">
      <a href="produit.html?id=${p.id}" class="card-media">${productImg(p)}${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}</a>
      <div class="card-body">
        <span class="card-cat">${esc(catName(p.cat))}</span>
        <h3><a href="produit.html?id=${p.id}">${esc(p.name)}</a></h3>
        <p class="card-unit">${esc(p.unit)}</p>
        <div class="card-foot">
          <strong class="price">${fmt(p.price)}</strong>
          <div class="card-actions">
            <button class="btn btn-icon" data-add="${p.id}" aria-label="Ajouter au panier">${ICON.cart}</button>
            <button class="btn btn-wa btn-sm" data-order="${p.id}">${ICON.wa}Commander</button>
          </div>
        </div>
      </div>
    </article>`;
}

document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) { addToCart(add.dataset.add, Number(add.dataset.qty || 1)); return; }
  const order = e.target.closest("[data-order]");
  if (order) orderNow(order.dataset.order, Number(order.dataset.qty || 1));
});

/* ---------- Pages ---------- */
const pages = {
  home() {
    $("#cat-grid").innerHTML = CATEGORIES.map(c => `
      <a class="cat-card" href="boutique.html?cat=${c.id}">
        <div class="cat-art">${catImg(c)}</div>
        <div><h3>${esc(c.name)}</h3><p>${esc(c.desc)}</p><span class="link-arrow">Voir les produits →</span></div>
      </a>`).join("");
    $("#featured").innerHTML = PRODUCTS.filter(p => p.featured).map(productCard).join("");
  },

  shop() {
    const params = new URLSearchParams(location.search);
    let state = { cat: CATEGORIES.some(c => c.id === params.get("cat")) ? params.get("cat") : "all", q: "", sort: "default" };
    const chips = $("#chips"), grid = $("#grid"), count = $("#count");

    chips.innerHTML = [{ id: "all", name: "Tout" }, ...CATEGORIES].map(c =>
      `<button class="chip" data-cat="${c.id}">${esc(c.name)}</button>`).join("");

    function render() {
      $$(".chip", chips).forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === state.cat));
      const q = state.q.trim().toLowerCase();
      let list = PRODUCTS.filter(p => (state.cat === "all" || p.cat === state.cat) &&
        (!q || `${p.name} ${p.unit} ${p.desc}`.toLowerCase().includes(q)));
      if (state.sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
      if (state.sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
      count.textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;
      grid.innerHTML = list.length ? list.map(productCard).join("") : `<p class="empty">Aucun produit ne correspond à votre recherche.</p>`;
      $("#shop-title").textContent = state.cat === "all" ? "Tous nos produits" : catName(state.cat);
    }
    chips.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      state.cat = b.dataset.cat;
      history.replaceState(null, "", state.cat === "all" ? "boutique.html" : `boutique.html?cat=${state.cat}`);
      render();
    });
    $("#search").addEventListener("input", e => { state.q = e.target.value; render(); });
    $("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
    render();
  },

  product() {
    const p = findProduct(new URLSearchParams(location.search).get("id"));
    const root = $("#product");
    if (!p) { root.innerHTML = `<div class="empty"><h1>Produit introuvable</h1><p><a class="btn" href="boutique.html">Retour à la boutique</a></p></div>`; return; }
    document.title = `${p.name} – ${CONFIG.brand}`;
    root.innerHTML = `
      <nav class="crumbs"><a href="index.html">Accueil</a> / <a href="boutique.html?cat=${p.cat}">${esc(catName(p.cat))}</a> / <span>${esc(p.name)}</span></nav>
      <div class="product-grid">
        <div class="product-media">${productImg(p)}${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}</div>
        <div class="product-info">
          <span class="card-cat">${esc(catName(p.cat))}</span>
          <h1>${esc(p.name)}</h1>
          <p class="card-unit">${esc(p.unit)}</p>
          <p class="price price-lg">${fmt(p.price)} <small>TTC</small></p>
          <p>${esc(p.desc)}</p>
          <ul class="specs">${p.specs.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
          <div class="buy-row">
            <div class="qty"><button type="button" data-step="-1" aria-label="Diminuer">−</button><input id="qty" type="number" min="1" value="1" aria-label="Quantité"><button type="button" data-step="1" aria-label="Augmenter">+</button></div>
            <button class="btn btn-outline" id="add-btn">${ICON.cart}Ajouter au panier</button>
          </div>
          <button class="btn btn-wa btn-block" id="order-btn">${ICON.wa}Commander sur WhatsApp</button>
          <p class="note">Les frais de livraison dépendent de votre code postal et vous sont confirmés sur WhatsApp avant toute commande.</p>
        </div>
      </div>
      <section class="section-sm"><h2>Vous aimerez aussi</h2><div class="grid">${PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4).map(productCard).join("")}</div></section>`;

    const qty = $("#qty");
    const getQty = () => Math.max(1, parseInt(qty.value, 10) || 1);
    $$("[data-step]", root).forEach(b => b.addEventListener("click", () => { qty.value = Math.max(1, getQty() + Number(b.dataset.step)); }));
    $("#add-btn").addEventListener("click", () => addToCart(p.id, getQty()));
    $("#order-btn").addEventListener("click", () => orderNow(p.id, getQty()));
  },

  cart() {
    const list = $("#cart-list"), summary = $("#cart-summary"), form = $("#order-form");
    function render() {
      if (!cart.length) {
        list.innerHTML = `<div class="empty"><p>Votre panier est vide.</p><a class="btn" href="boutique.html">Découvrir la boutique</a></div>`;
        summary.hidden = true; return;
      }
      summary.hidden = false;
      list.innerHTML = cart.map(({ id, qty }) => {
        const p = findProduct(id);
        return `<div class="cart-line">
          <a href="produit.html?id=${p.id}" class="cart-thumb">${productImg(p)}</a>
          <div class="cart-info"><a href="produit.html?id=${p.id}"><strong>${esc(p.name)}</strong></a><span>${esc(p.unit)} · ${fmt(p.price)}</span></div>
          <div class="qty qty-sm"><button data-dec="${p.id}" aria-label="Diminuer">−</button><span>${qty}</span><button data-inc="${p.id}" aria-label="Augmenter">+</button></div>
          <strong class="cart-sub">${fmt(p.price * qty)}</strong>
          <button class="remove" data-remove="${p.id}" aria-label="Retirer">×</button>
        </div>`;
      }).join("");
      $("#total").textContent = fmt(cartTotal());
    }
    list.addEventListener("click", e => {
      const t = e.target.closest("button"); if (!t) return;
      const line = id => cart.find(i => i.id === id);
      if (t.dataset.inc) setQty(t.dataset.inc, line(t.dataset.inc).qty + 1);
      if (t.dataset.dec) setQty(t.dataset.dec, line(t.dataset.dec).qty - 1);
      if (t.dataset.remove) setQty(t.dataset.remove, 0);
      render();
    });
    $("#clear-cart").addEventListener("click", () => { cart = []; saveCart(); render(); });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const client = Object.fromEntries(new FormData(form).entries());
      window.open(waLink(orderMessage(cart, client)), "_blank", "noopener");
    });
    render();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  pages[document.body.dataset.page]?.();
});
