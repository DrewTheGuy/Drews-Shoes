const SUPABASE_URL = "https://jnxobqrlpdtpsumnwvde.supabase.co";
const SUPABASE_KEY = "sb_publishable_UK_x5tuLJIntL4-EFqCqKA_bx-3QXdT";
// ================================
//  SNEAKERS — add items here
// ================================
const shoes = [
  {
    "name": "Nike Mind 001 Flyknit \"Bronze Eclipse / Total Orange\"",
    "size": 7,
    "price": "$155",
    "status": "in-stock",
    "image": "images/products/mind-001-IR2175-200.jpg",
    "images": [
      "images/products/mind-001-IR2175-200.jpg"
    ],
    "stripeLink": "https://buy.stripe.com/00w5kF8ToeWfcou5007IY00"
  },
  {
    "name": "Nike Mind 001 Flyknit \"Bronze Eclipse / Total Orange\"",
    "size": 15,
    "price": "$280",
    "status": "in-stock",
    "image": "images/products/mind-001-IR2175-200.jpg",
    "images": [
      "images/products/mind-001-IR2175-200.jpg"
    ],
    "stripeLink": "https://buy.stripe.com/fZu6oJ8To01lfAG9gg7IY01"
  },
  {
    "name": "Air Jordan 3 PRM \"BIN23\"",
    "size": 9,
    "price": "$650",
    "status": "in-stock",
    "image": "images/products/jordan-3-bin23-IO7744-600.jpg",
    "images": [
      "images/products/jordan-3-bin23-IO7744-600.jpg"
    ],
    "stripeLink": "https://buy.stripe.com/5kQ9AV8To29tgEK1NO7IY02"
  },
  {
    "name": "Nike Kobe 5 Protro \"Caitlin Clark Rookie of the Year\"",
    "size": 9.5,
    "price": "$240",
    "status": "in-stock",
    "image": "images/products/kobe-5-IV2712-001.jpg",
    "images": [
      "images/products/kobe-5-IV2712-001.jpg"
    ],
    "stripeLink": "https://buy.stripe.com/7sY00l6Lg9BVagm3VW7IY03"
  },
  {
    "name": "Nike Kobe 5 Protro \"Caitlin Clark Rookie of the Year\"",
    "size": 11.5,
    "price": "$240",
    "status": "in-stock",
    "image": "images/products/kobe-5-IV2712-001.jpg",
    "images": [
      "images/products/kobe-5-IV2712-001.jpg"
    ],
    "stripeLink": "https://buy.stripe.com/eVq6oJ6LgcO71JQgII7IY04"
  },
  {
    "name": "Nike Air Jordan 17 \"Doernbecher Freestyle\"",
    "size": 10,
    "price": "$295",
    "status": "in-stock",
    "image": "images/products/aj17-dorenbecher-IO7684-921.jpg",
    "images": [
      "images/products/aj17-dorenbecher-IO7684-921.jpg"
    ],
    "stripeLink": "https://buy.stripe.com/cNi7sNfhM15p3RYeAA7IY05"
  }
];

// ================================
//  STREETWEAR — add items here
// ================================
const streetwear = [
  {
    "name": "Supreme Ushanka Hat",
    "meta": "S/M",
    "price": "$100",
    "status": "in-stock",
    "image": "images/products/supreme-ushanka.jpg",
    "images": [
      "images/products/supreme-ushanka.jpg"
    ],
    "stripeLink": "https://buy.stripe.com/bJeeVf6Lg6pJgEK2RS7IY06"
  }
];

// ================================
//  TRADING CARDS — add items here
// ================================
const cards = [
  {
    "name": "Topps 2025-26 NBA Hoops",
    "meta": "Hobby Box",
    "price": "$230",
    "status": "in-stock",
    "image": "images/products/topps-hoops-hobby.jpg",
    "images": [
      "images/products/topps-hoops-hobby.jpg"
    ],
    "stripeLink": "https://buy.stripe.com/5kQ14p0mS15pbkqboo7IY07"
  }
];

// ##PRODUCT_DATA_END##

// ================================
//  LIGHTBOX
// ================================
let lbImages = [];
let lbIndex = 0;

function buildLightbox() {
  const lb = document.createElement("div");
  lb.className = "lightbox-overlay";
  lb.id = "lightbox";
  lb.innerHTML = `
    <button class="lightbox-close" id="lbClose">&#x2715;</button>
    <div class="lightbox-inner">
      <div class="lightbox-img-wrap">
        <button class="lightbox-arrow prev" id="lbPrev">&#8249;</button>
        <img class="lightbox-img" id="lbImg" src="" alt="">
        <button class="lightbox-arrow next" id="lbNext">&#8250;</button>
      </div>
      <div class="lightbox-info">
        <p class="lightbox-name" id="lbName"></p>
        <p class="lightbox-meta" id="lbMeta"></p>
      </div>
      <div class="lightbox-dots" id="lbDots"></div>
    </div>
  `;
  document.body.appendChild(lb);
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.getElementById("lbPrev").addEventListener("click", (e) => { e.stopPropagation(); lbGo(lbIndex - 1); });
  document.getElementById("lbNext").addEventListener("click", (e) => { e.stopPropagation(); lbGo(lbIndex + 1); });
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lightbox").classList.contains("active")) return;
    if (e.key === "ArrowLeft") lbGo(lbIndex - 1);
    if (e.key === "ArrowRight") lbGo(lbIndex + 1);
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(item, startIndex) {
  lbImages = item.images && item.images.length ? item.images : [item.image];
  lbIndex = startIndex || 0;
  const displayMeta = item.meta || (item.size ? "Size US " + item.size : "");
  document.getElementById("lbName").textContent = item.name;
  document.getElementById("lbMeta").textContent = displayMeta + "  ·  " + item.price;
  const dotsEl = document.getElementById("lbDots");
  dotsEl.innerHTML = "";
  if (lbImages.length > 1) {
    lbImages.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "lightbox-dot" + (i === lbIndex ? " active" : "");
      dot.addEventListener("click", () => lbGo(i));
      dotsEl.appendChild(dot);
    });
  }
  lbGo(lbIndex);
  document.getElementById("lightbox").classList.add("active");
  document.body.style.overflow = "hidden";
}

function lbGo(index) {
  if (index < 0 || index >= lbImages.length) return;
  lbIndex = index;
  document.getElementById("lbImg").src = lbImages[lbIndex];
  document.getElementById("lbPrev").classList.toggle("hidden", lbIndex === 0);
  document.getElementById("lbNext").classList.toggle("hidden", lbIndex === lbImages.length - 1);
  document.querySelectorAll(".lightbox-dot").forEach((d, i) => {
    d.classList.toggle("active", i === lbIndex);
  });
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

// ================================
//  PURCHASE MODAL
// ================================
const EMAIL = "drewssshoes@definiteim.com";
const IG_URL = "https://ig.me/m/drewsshoes_";

function buildModal() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "purchaseModal";
  overlay.innerHTML = `
    <div class="modal">
      <p class="modal-title">Purchase</p>
      <p class="modal-product" id="modalProduct"></p>
      <p class="modal-meta" id="modalMeta"></p>
      <p class="modal-prompt" id="modalPrompt">Please select a contact method to purchase this product.</p>
      <div class="modal-buttons">
        <a id="modalStripe" href="#" target="_blank" class="modal-btn modal-btn-stripe" style="display:none;">
          <svg viewBox="0 0 24 24"><path d="M21 4H3C1.9 4 1 4.9 1 6v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"/><path d="M5 10h3v4H5z"/></svg>
          Buy Now — Secure Checkout
        </a>
        <div id="modalContactDivider" class="modal-divider" style="display:none;"><span>or contact us here</span></div>
        <div class="modal-socials">
          <a id="modalIG" href="${IG_URL}" target="_blank" class="modal-social-btn" aria-label="Instagram DM">
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2"/></svg>
            Instagram DM
          </a>
          <a id="modalEmail" href="#" class="modal-social-btn" aria-label="Email">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
        </div>
      </div>
      <button class="modal-close" id="modalClose">Cancel</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

function openModal(btn) {
  const name = btn.dataset.name;
  const meta = btn.dataset.meta;
  const price = btn.dataset.price;
  const stripeLink = btn.dataset.stripe;
  document.getElementById("modalProduct").textContent = name;
  document.getElementById("modalMeta").textContent = meta + "  ·  " + price;
  const subject = encodeURIComponent("Inquiry: " + name + (meta ? " - " + meta : ""));
  const body = encodeURIComponent("Hey Drew, is this still available?\n\n" + name + (meta ? "\n" + meta : "") + "\n\nAsking price: " + price);
  document.getElementById("modalEmail").href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
  const stripeBtn = document.getElementById("modalStripe");
  const divider = document.getElementById("modalContactDivider");
  const prompt = document.getElementById("modalPrompt");
  if (stripeLink) {
    stripeBtn.href = stripeLink;
    stripeBtn.style.display = "flex";
    divider.style.display = "flex";
    prompt.style.display = "none";
  } else {
    stripeBtn.style.display = "none";
    divider.style.display = "none";
    prompt.style.display = "block";
  }
  document.getElementById("purchaseModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("purchaseModal").classList.remove("active");
  document.body.style.overflow = "";
}

// ================================
//  RENDER FUNCTION
// ================================
function renderGrid(gridId, items, countId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const countEl = document.getElementById(countId);
  const available = items.filter(i => i.status !== "sold").length;
  if (countEl) countEl.textContent = available + " available";
  if (items.length === 0) {
    grid.innerHTML = '<p style="color:#888; font-size:14px; grid-column:1/-1; padding: 40px 0;">No listings yet — check back soon.</p>';
    return;
  }
  items.forEach(item => {
    const isSold = item.status === "sold";
    const displayMeta = item.meta || (item.size ? "Size US " + item.size : "");
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      '<div class="img-wrap">' +
        '<img src="' + item.image + '" alt="' + item.name + '" loading="lazy">' +
        '<div class="badge ' + (isSold ? "sold" : "available") + '">' + (isSold ? "Sold" : "Available") + '</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<p class="card-name">' + item.name + '</p>' +
        '<div class="card-meta-row"><span class="card-meta">' + displayMeta + '</span></div>' +
      '</div>' +
      '<div class="card-footer">' +
        '<span class="price">' + item.price + '</span>' +
        (isSold ? '<button class="btn disabled" disabled>Sold Out</button>' : '<button class="btn available purchase-btn">Purchase</button>') +
      '</div>';
    const imgWrap = card.querySelector(".img-wrap");
    imgWrap.addEventListener("click", function() { openLightbox(item, 0); });
    if (!isSold) {
      const btn = card.querySelector(".purchase-btn");
      btn.dataset.name = item.name;
      btn.dataset.meta = displayMeta;
      btn.dataset.price = item.price;
      btn.dataset.stripe = item.stripeLink || "";
      btn.addEventListener("click", function(e) { e.stopPropagation(); openModal(this); });
    }
    grid.appendChild(card);
  });
}

// ================================
//  INIT
// ================================
document.addEventListener("DOMContentLoaded", function() {
  buildLightbox();
  buildModal();
  const seenShoes = [];
  const uniqueShoes = shoes.filter(s => {
    if (seenShoes.includes(s.name)) return false;
    seenShoes.push(s.name);
    return true;
  }).slice(0, 4);
  renderGrid("shoeGrid", uniqueShoes, null);
  renderGrid("streetwearGridHome", streetwear.slice(0, 4), null);
  renderGrid("cardsGridHome", cards.slice(0, 4), null);
  renderGrid("sneakerGrid", shoes, "sneakerCount");
  renderGrid("streetwearGrid", streetwear, "streetwearCount");
  renderGrid("cardsGrid", cards, "cardsCount");
});
