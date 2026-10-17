/**
 * Shofi Frozen - E-commerce Landing Page Application Logic
 * Menangani keranjang belanja, pencarian & filter produk, modal detail,
 * checkout simulasi, dan format pemesanan WhatsApp otomatis.
 */

// Konfigurasi Bisnis (Mudah Diedit)
const SHOFI_CONFIG = {
  businessName: "Shofi Frozen",
  tagline: "Stok Frozen Food, Masak Jadi Lebih Mudah!",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp asli pemilik toko (format 62...)
  freeIceGelMinOrder: 100000,     // Belanja minimal Rp 100.000 gratis ice gel pendingin
  iceGelPrice: 3000,              // Harga ice gel jika order di bawah minimum
  sampleCoupons: {
    "SHOFIHEMAT": { type: "percent", value: 10, label: "Diskon 10% (Promo Khusus)" },
    "ANAKKOS": { type: "nominal", value: 8000, label: "Potongan Rp 8.000 Spesial Anak Kos" },
    "GRATISONGKIR": { type: "shipping", value: 10000, label: "Potongan Ongkir Rp 10.000" }
  }
};

// State Aplikasi
const AppState = {
  products: [],
  categories: [],
  bundles: [],
  cart: [],
  activeCategory: "all",
  searchQuery: "",
  sortBy: "default",
  appliedCoupon: null,
  includeIceGel: true,
  shippingMethod: "instant",
  paymentMethod: "qris"
};

// Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Ambil data produk dari file products.js
  if (window.SHOFI_DATA) {
    AppState.products = window.SHOFI_DATA.products || [];
    AppState.categories = window.SHOFI_DATA.categories || [];
    AppState.bundles = window.SHOFI_DATA.bundles || [];
  }

  // Muat keranjang dari LocalStorage jika ada
  loadCartFromStorage();

  // Render komponen utama
  renderCategories();
  renderProducts();
  renderBundles();
  renderReviews();
  renderFaqs();
  updateCartBadge();

  // Pasang Event Listeners
  initEventListeners();
});

// Format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// --------------------------------------------------------------------------
// 1. RENDER KATEGORI
// --------------------------------------------------------------------------
function renderCategories() {
  const container = document.getElementById("categories-grid");
  if (!container) return;

  container.innerHTML = AppState.categories.map(cat => `
    <div onclick="selectCategoryFilter('${cat.id}')" 
         class="category-card group cursor-pointer bg-white rounded-2xl p-4 border border-orange-100 hover:border-orange-500 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4">
      <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-orange-50">
        <img src="${cat.image}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <span class="absolute top-1 left-1 bg-white/90 backdrop-blur-sm text-sm px-1.5 py-0.5 rounded-md shadow-xs">
          ${cat.icon}
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <h3 class="font-heading font-bold text-slate-800 text-base sm:text-lg group-hover:text-orange-600 transition-colors truncate">
            ${cat.name}
          </h3>
          <span class="text-xs bg-orange-50 text-orange-600 font-semibold px-2 py-0.5 rounded-full shrink-0">
            ${cat.count} Menu
          </span>
        </div>
        <p class="text-xs text-slate-500 line-clamp-1 mt-1">
          ${cat.description}
        </p>
        <span class="inline-flex items-center text-xs font-semibold text-orange-500 group-hover:text-orange-600 mt-2 gap-1">
          Lihat Menu
          <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </span>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------------
// 2. RENDER PRODUK UNGGULAN & KATALOG
// --------------------------------------------------------------------------
function renderProducts() {
  const container = document.getElementById("products-grid");
  const countBadge = document.getElementById("products-count");
  if (!container) return;

  // Filter Kategori
  let filtered = AppState.products.filter(p => {
    const matchCategory = AppState.activeCategory === "all" || p.category === AppState.activeCategory;
    const matchSearch = AppState.searchQuery === "" || 
      p.name.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(AppState.searchQuery.toLowerCase())));
    return matchCategory && matchSearch;
  });

  // Urutkan Produk
  if (AppState.sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === "popular") {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  // Update total badge
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Produk`;
  }

  // Tampilan jika produk tidak ditemukan
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-orange-100 p-8">
        <div class="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          🔍
        </div>
        <h3 class="text-xl font-heading font-bold text-slate-800 mb-2">Produk Tidak Ditemukan</h3>
        <p class="text-slate-500 max-w-md mx-auto text-sm mb-6">
          Tidak ada frozen food yang sesuai dengan kata kunci "${AppState.searchQuery}". Coba kata kunci lain atau reset filter.
        </p>
        <button onclick="resetFilters()" class="btn-primary-shofi px-6 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
          <span>Tampilkan Semua Produk</span>
        </button>
      </div>
    `;
    return;
  }

  // Render Kartu Produk
  container.innerHTML = filtered.map(prod => {
    // Label badge styling
    let badgeClass = "bg-orange-500 text-white";
    if (prod.badge === "Favorit") badgeClass = "bg-emerald-600 text-white";
    if (prod.badge === "Hemat") badgeClass = "bg-amber-500 text-white";

    return `
      <div class="card-hover-effect bg-white rounded-2xl sm:rounded-3xl border border-orange-100 overflow-hidden shadow-xs flex flex-col justify-between group">
        <div>
          <!-- Foto Produk -->
          <div class="relative img-zoom-container aspect-4/3 bg-orange-50/50 cursor-pointer" onclick="openQuickView('${prod.id}')">
            <img src="${prod.image}" alt="${prod.name}" loading="lazy" class="w-full h-full object-cover">
            
            <!-- Badge Status -->
            <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${badgeClass}">
                ${prod.badge}
              </span>
            </div>

            <!-- Berat Kemasan Badge -->
            <div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg shadow-sm border border-slate-100 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
              </svg>
              ${prod.weight}
            </div>

            <!-- Tombol Quick View Hover -->
            <button class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-700 hover:text-orange-600 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" title="Lihat Cara Masak">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
          </div>

          <!-- Info Produk -->
          <div class="p-4 sm:p-5">
            <div class="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-1.5">
              <span>★ ${prod.rating}</span>
              <span class="text-slate-400">(${prod.reviewsCount} terjual)</span>
              <span class="mx-1 text-slate-300">•</span>
              <span class="text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">Tinggal Masak</span>
            </div>

            <h3 class="font-heading font-bold text-slate-800 text-base sm:text-lg group-hover:text-orange-600 transition-colors line-clamp-1 cursor-pointer" onclick="openQuickView('${prod.id}')">
              ${prod.name}
            </h3>

            <p class="text-xs text-slate-500 line-clamp-2 mt-1 mb-3">
              ${prod.description}
            </p>

            <!-- Label Contoh Data -->
            <div class="text-[10px] text-slate-400 italic mb-2">
              *Contoh data & harga — siap disesuaikan
            </div>

            <!-- Harga -->
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-lg sm:text-xl font-heading font-extrabold text-orange-600">
                ${formatRupiah(prod.price)}
              </span>
              ${prod.originalPrice ? `
                <span class="text-xs text-slate-400 line-through">
                  ${formatRupiah(prod.originalPrice)}
                </span>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Bawah -->
        <div class="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
          <div class="grid grid-cols-5 gap-2">
            <button onclick="openQuickView('${prod.id}')" 
                    class="col-span-2 py-2 px-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                    title="Petunjuk Masak & Detail">
              <span>Detail</span>
            </button>
            <button onclick="addToCart('${prod.id}', 1)" 
                    class="col-span-3 btn-primary-shofi py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>+ Keranjang</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// --------------------------------------------------------------------------
// 3. RENDER PROMO & PAKET HEMAT
// --------------------------------------------------------------------------
function renderBundles() {
  const container = document.getElementById("bundles-grid");
  if (!container) return;

  container.innerHTML = AppState.bundles.map(bundle => `
    <div class="card-hover-effect bg-white rounded-3xl border-2 border-orange-200/80 p-5 sm:p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
      <!-- Badge Penghematan -->
      <div class="absolute -right-12 top-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-extrabold px-12 py-1 rotate-45 shadow-sm">
        Hemat ${formatRupiah(bundle.savings)}
      </div>

      <div>
        <!-- Foto & Header Bundling -->
        <div class="flex gap-4 items-center mb-4">
          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-orange-50 border border-orange-100">
            <img src="${bundle.image}" alt="${bundle.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          </div>
          <div>
            <span class="inline-block text-[11px] font-bold bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full mb-1">
              ${bundle.badge}
            </span>
            <h3 class="font-heading font-extrabold text-slate-800 text-lg sm:text-xl">
              ${bundle.name}
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">
              ${bundle.tagline}
            </p>
          </div>
        </div>

        <!-- Daftar Isi Paket -->
        <div class="bg-orange-50/60 rounded-2xl p-3.5 mb-4 border border-orange-100/60">
          <span class="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Isi Paket Hemat:
          </span>
          <ul class="text-xs text-slate-600 space-y-1.5">
            ${bundle.items.map(it => `
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>${it}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Estimasi Masak:</span>
          <span class="font-semibold text-slate-700 flex items-center gap-1">
            ⏱️ ${bundle.cookingTime}
          </span>
        </div>
      </div>

      <!-- Harga & Tombol Order Paket -->
      <div class="pt-4 border-t border-slate-100">
        <div class="flex items-baseline justify-between mb-3">
          <div>
            <span class="text-xs text-slate-400 line-through block">
              ${formatRupiah(bundle.originalPrice)}
            </span>
            <span class="text-2xl font-heading font-extrabold text-orange-600">
              ${formatRupiah(bundle.price)}
            </span>
          </div>
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Terhemat
          </span>
        </div>

        <button onclick="addBundleToCart('${bundle.id}')" 
                class="w-full btn-primary-shofi py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <span>Pesan Paket Ini</span>
        </button>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------------
// 4. RENDER TESTIMONI & FAQ
// --------------------------------------------------------------------------
function renderReviews() {
  const container = document.getElementById("reviews-grid");
  if (!container || !window.SHOFI_DATA?.reviews) return;

  container.innerHTML = window.SHOFI_DATA.reviews.map(rev => `
    <div class="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <!-- Rating Star -->
        <div class="flex items-center gap-1 text-amber-400 mb-4">
          ${"★".repeat(rev.rating)}
        </div>
        
        <!-- Kutipan Ulasan -->
        <p class="text-slate-600 text-sm italic mb-6 leading-relaxed">
          "${rev.text}"
        </p>
      </div>

      <!-- Profil & Produk -->
      <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
        <img src="${rev.avatar}" alt="${rev.name}" class="w-11 h-11 rounded-full object-cover border-2 border-orange-200">
        <div>
          <h4 class="font-bold text-slate-800 text-sm font-heading">${rev.name}</h4>
          <p class="text-[11px] text-slate-400">${rev.role}</p>
        </div>
      </div>
    </div>
  `).join("");
}

function renderFaqs() {
  const container = document.getElementById("faqs-container");
  if (!container || !window.SHOFI_DATA?.faqs) return;

  container.innerHTML = window.SHOFI_DATA.faqs.map((faq, index) => `
    <div class="faq-item bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-xs transition-all ${index === 0 ? 'active' : ''}">
      <button onclick="toggleFaq(this)" class="w-full text-left p-5 flex items-center justify-between gap-4 font-heading font-bold text-slate-800 hover:text-orange-600 transition-colors">
        <span class="text-base sm:text-lg">${faq.question}</span>
        <span class="faq-chevron w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 transition-transform duration-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </button>
      <div class="faq-answer px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-orange-50/50 pt-2">
        ${faq.answer}
      </div>
    </div>
  `).join("");
}

function toggleFaq(buttonElement) {
  const faqItem = buttonElement.closest(".faq-item");
  const wasActive = faqItem.classList.contains("active");

  // Tutup semua faq lainnya
  document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));

  if (!wasActive) {
    faqItem.classList.add("active");
  }
}

// --------------------------------------------------------------------------
// 5. KERANJANG BELANJA (CART MANAGEMENT)
// --------------------------------------------------------------------------
function addToCart(productId, quantity = 1) {
  const prod = AppState.products.find(p => p.id === productId);
  if (!prod) return;

  const existing = AppState.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    AppState.cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      originalPrice: prod.originalPrice,
      weight: prod.weight,
      image: prod.image,
      qty: quantity,
      isBundle: false
    });
  }

  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
  showToast(`✅ ${prod.name} ditambahkan ke keranjang!`);
}

function addBundleToCart(bundleId) {
  const bundle = AppState.bundles.find(b => b.id === bundleId);
  if (!bundle) return;

  const existing = AppState.cart.find(item => item.id === bundleId);
  if (existing) {
    existing.qty += 1;
  } else {
    AppState.cart.push({
      id: bundle.id,
      name: bundle.name,
      price: bundle.price,
      originalPrice: bundle.originalPrice,
      weight: "Paket Bundling",
      image: bundle.image,
      qty: 1,
      isBundle: true
    });
  }

  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
  openCartDrawer();
  showToast(`🎁 ${bundle.name} ditambahkan ke keranjang!`);
}

function updateCartItemQty(id, delta) {
  const item = AppState.cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
}

function removeFromCart(id) {
  const item = AppState.cart.find(i => i.id === id);
  const itemName = item ? item.name : "Item";
  AppState.cart = AppState.cart.filter(i => i.id !== id);
  
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
  showToast(`🗑️ ${itemName} dihapus dari keranjang.`, "info");
}

function clearCart() {
  AppState.cart = [];
  AppState.appliedCoupon = null;
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
}

function calculateCartTotals() {
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // Hitung Diskon Kupon
  let discount = 0;
  if (AppState.appliedCoupon) {
    if (AppState.appliedCoupon.type === "percent") {
      discount = Math.round(subtotal * (AppState.appliedCoupon.value / 100));
    } else if (AppState.appliedCoupon.type === "nominal") {
      discount = Math.min(subtotal, AppState.appliedCoupon.value);
    }
  }

  // Hitung Biaya Ice Gel
  let iceGelCost = 0;
  if (AppState.includeIceGel && subtotal > 0) {
    iceGelCost = (subtotal >= SHOFI_CONFIG.freeIceGelMinOrder) ? 0 : SHOFI_CONFIG.iceGelPrice;
  }

  // Estimasi Grand Total
  const grandTotal = Math.max(0, subtotal - discount + iceGelCost);

  return {
    subtotal,
    discount,
    iceGelCost,
    grandTotal,
    isIceGelFree: subtotal >= SHOFI_CONFIG.freeIceGelMinOrder
  };
}

function updateCartBadge() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.qty, 0);
  
  // Badge di Navbar Desktop & Mobile
  const badges = document.querySelectorAll(".cart-count-badge");
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? "inline-flex" : "none";
  });

  // Badge di Mobile Floating Bar
  const floatingCount = document.getElementById("mobile-cart-count");
  if (floatingCount) {
    floatingCount.textContent = `${totalCount} Item`;
  }

  const totals = calculateCartTotals();
  const floatingTotal = document.getElementById("mobile-cart-total");
  if (floatingTotal) {
    floatingTotal.textContent = formatRupiah(totals.grandTotal);
  }
}

function renderCartDrawer() {
  const container = document.getElementById("cart-items-list");
  const emptyView = document.getElementById("cart-empty-view");
  const activeView = document.getElementById("cart-active-view");
  if (!container || !emptyView || !activeView) return;

  if (AppState.cart.length === 0) {
    emptyView.classList.remove("hidden");
    activeView.classList.add("hidden");
    return;
  }

  emptyView.classList.add("hidden");
  activeView.classList.remove("hidden");

  // Render daftar item
  container.innerHTML = AppState.cart.map(item => `
    <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-orange-50/40 border border-orange-100/70">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover shrink-0 bg-white border border-slate-100">
      
      <div class="flex-1 min-w-0">
        <h4 class="font-heading font-bold text-slate-800 text-sm truncate">${item.name}</h4>
        <span class="text-[11px] text-slate-500 block">${item.weight}</span>
        <div class="font-extrabold text-orange-600 text-sm mt-0.5">${formatRupiah(item.price)}</div>
      </div>

      <!-- Quantity Controls -->
      <div class="flex items-center gap-1.5 shrink-0 bg-white rounded-lg p-1 border border-orange-200">
        <button onclick="updateCartItemQty('${item.id}', -1)" 
                class="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-orange-100 text-sm font-bold transition-colors">
          -
        </button>
        <span class="w-6 text-center text-xs font-bold text-slate-800">${item.qty}</span>
        <button onclick="updateCartItemQty('${item.id}', 1)" 
                class="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-orange-100 text-sm font-bold transition-colors">
          +
        </button>
      </div>

      <!-- Remove Button -->
      <button onclick="removeFromCart('${item.id}')" 
              class="text-slate-400 hover:text-red-500 transition-colors p-1" title="Hapus">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
  `).join("");

  // Update ringkasan perhitungan
  const totals = calculateCartTotals();
  
  const subtotalEl = document.getElementById("cart-subtotal");
  if (subtotalEl) subtotalEl.textContent = formatRupiah(totals.subtotal);

  const discountRow = document.getElementById("cart-discount-row");
  const discountEl = document.getElementById("cart-discount");
  if (discountRow && discountEl) {
    if (totals.discount > 0) {
      discountRow.classList.remove("hidden");
      discountEl.textContent = `-${formatRupiah(totals.discount)}`;
    } else {
      discountRow.classList.add("hidden");
    }
  }

  const iceGelEl = document.getElementById("cart-icegel-fee");
  if (iceGelEl) {
    if (totals.isIceGelFree) {
      iceGelEl.innerHTML = `<span class="text-emerald-600 font-bold">GRATIS</span> <span class="line-through text-slate-400 text-xs">Rp 3.000</span>`;
    } else {
      iceGelEl.textContent = formatRupiah(totals.iceGelCost);
    }
  }

  const grandTotalEl = document.getElementById("cart-grandtotal");
  if (grandTotalEl) grandTotalEl.textContent = formatRupiah(totals.grandTotal);
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  renderCartDrawer();
  drawer.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  drawer.classList.remove("active");
  document.body.style.overflow = "";
}

// --------------------------------------------------------------------------
// 6. KUPON PROMO
// --------------------------------------------------------------------------
function applyCoupon() {
  const input = document.getElementById("coupon-input");
  const messageEl = document.getElementById("coupon-message");
  if (!input || !messageEl) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    messageEl.textContent = "Masukkan kode kupon terlebih dahulu.";
    messageEl.className = "text-xs text-red-500 mt-1 block";
    return;
  }

  const coupon = SHOFI_CONFIG.sampleCoupons[code];
  if (coupon) {
    AppState.appliedCoupon = { code, ...coupon };
    messageEl.textContent = `Kupon berhasil digunakan: ${coupon.label}!`;
    messageEl.className = "text-xs text-emerald-600 font-semibold mt-1 block";
    renderCartDrawer();
    showToast(`🎉 Kupon ${code} berhasil dipasang!`);
  } else {
    messageEl.textContent = "Kupon tidak valid. Coba gunakan SHOFIHEMAT";
    messageEl.className = "text-xs text-red-500 mt-1 block";
  }
}

// --------------------------------------------------------------------------
// 7. MODAL DETAIL PRODUK (QUICK VIEW)
// --------------------------------------------------------------------------
function openQuickView(productId) {
  const prod = AppState.products.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById("quickview-modal");
  const modalContent = document.getElementById("quickview-content");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <!-- Gambar Produk -->
      <div class="rounded-2xl overflow-hidden bg-orange-50 aspect-square border border-orange-100">
        <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover">
      </div>

      <!-- Info Produk & Saran Masak -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-500 text-white">
              ${prod.badge}
            </span>
            <span class="text-xs text-slate-500 font-semibold">
              Kategori: ${prod.categoryName}
            </span>
          </div>

          <h3 class="font-heading font-extrabold text-2xl text-slate-800 mb-2">
            ${prod.name}
          </h3>

          <div class="flex items-baseline gap-3 mb-3">
            <span class="text-2xl font-heading font-extrabold text-orange-600">
              ${formatRupiah(prod.price)}
            </span>
            ${prod.originalPrice ? `<span class="text-sm text-slate-400 line-through">${formatRupiah(prod.originalPrice)}</span>` : ''}
            <span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-semibold">
              Berat: ${prod.weight}
            </span>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
            ${prod.description}
          </p>

          <!-- Panduan Cara Memasak -->
          <div class="bg-orange-50/70 rounded-2xl p-4 border border-orange-100 mb-4">
            <h5 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>👨‍🍳</span> Panduan Cara Memasak:
            </h5>
            <div class="space-y-2 text-xs text-slate-600">
              <div class="flex items-start gap-2">
                <span class="font-bold text-orange-600 shrink-0">Goreng:</span>
                <span>${prod.cookingMethods.fry}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-bold text-orange-600 shrink-0">Air Fryer:</span>
                <span>${prod.cookingMethods.airfryer}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-bold text-orange-600 shrink-0">Kukus/Rebus:</span>
                <span>${prod.cookingMethods.steam}</span>
              </div>
            </div>
          </div>

          <!-- Petunjuk Penyimpanan -->
          <div class="text-xs text-slate-500 flex items-center gap-1.5 mb-6">
            <span class="text-blue-500">❄️</span>
            <span>${prod.storage}</span>
          </div>
        </div>

        <!-- Tombol Aksi Tambah -->
        <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
          <div class="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-white">
            <button onclick="adjustQuickViewQty(-1)" class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-600 hover:bg-orange-100">-</button>
            <span id="quickview-qty" class="w-8 text-center font-bold text-sm">1</span>
            <button onclick="adjustQuickViewQty(1)" class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-600 hover:bg-orange-100">+</button>
          </div>
          <button onclick="addQuickViewToCart('${prod.id}')" class="flex-1 btn-primary-shofi py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
            <span>Tambah ke Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

let quickViewCurrentQty = 1;
function adjustQuickViewQty(delta) {
  quickViewCurrentQty = Math.max(1, quickViewCurrentQty + delta);
  const qtyEl = document.getElementById("quickview-qty");
  if (qtyEl) qtyEl.textContent = quickViewCurrentQty;
}

function addQuickViewToCart(productId) {
  addToCart(productId, quickViewCurrentQty);
  closeQuickView();
  quickViewCurrentQty = 1;
}

function closeQuickView() {
  const modal = document.getElementById("quickview-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// --------------------------------------------------------------------------
// 8. CHECKOUT SIMULASI & FORMAT PEMESANAN WHATSAPP
// --------------------------------------------------------------------------
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast("Keranjang Anda masih kosong. Silakan pilih produk terlebih dahulu.", "info");
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  // Render Rincian Singkat di Form Checkout
  const totals = calculateCartTotals();
  const summaryEl = document.getElementById("checkout-summary-list");
  if (summaryEl) {
    summaryEl.innerHTML = AppState.cart.map(i => `
      <div class="flex justify-between items-center text-xs py-1 border-b border-dashed border-orange-100">
        <span class="text-slate-700">${i.name} (x${i.qty})</span>
        <span class="font-bold text-slate-800">${formatRupiah(i.price * i.qty)}</span>
      </div>
    `).join("") + `
      <div class="pt-2 flex justify-between items-center text-sm font-bold text-orange-600">
        <span>Total Akhir:</span>
        <span>${formatRupiah(totals.grandTotal)}</span>
      </div>
    `;
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Format Pesan WhatsApp & Buka WhatsApp Langsung
function orderViaWhatsApp() {
  if (AppState.cart.length === 0) {
    showToast("Keranjang belanja masih kosong!", "info");
    return;
  }

  // Ambil Data Penerima (jika modal checkout diisi)
  const name = document.getElementById("checkout-name")?.value.trim() || "Pelanggan Shofi Frozen";
  const phone = document.getElementById("checkout-phone")?.value.trim() || "-";
  const address = document.getElementById("checkout-address")?.value.trim() || "-";
  const courier = document.getElementById("checkout-courier")?.value || "Instant (1-2 Jam) Paxel/Grab";
  const notes = document.getElementById("checkout-notes")?.value.trim() || "-";

  const totals = calculateCartTotals();

  // Susun Format Pesan WhatsApp yang Rapi & Profesional
  let text = `*HALO SHOFI FROZEN, SAYA INGIN MEMESAN:*\n\n`;
  text += `📦 *DAFTAR ITEM PESANAN:*\n`;

  AppState.cart.forEach((item, index) => {
    text += `${index + 1}. ${item.name} (${item.weight})\n`;
    text += `   Jumlah: ${item.qty} pack | Subtotal: ${formatRupiah(item.price * item.qty)}\n`;
  });

  text += `\n💰 *RINGKASAN PEMBAYARAN:*\n`;
  text += `• Subtotal Produk: ${formatRupiah(totals.subtotal)}\n`;
  if (totals.discount > 0) {
    text += `• Potongan Voucher: -${formatRupiah(totals.discount)} (${AppState.appliedCoupon?.code})\n`;
  }
  text += `• Kemasan Ice Gel: ${totals.isIceGelFree ? "GRATIS" : formatRupiah(totals.iceGelCost)}\n`;
  text += `👉 *TOTAL YANG DIBAYAR: ${formatRupiah(totals.grandTotal)}*\n\n`;

  text += `📍 *DATA PENGIRIMAN:*\n`;
  text += `• Nama Penerima: ${name}\n`;
  text += `• No. WhatsApp: ${phone}\n`;
  text += `• Alamat Lengkap: ${address}\n`;
  text += `• Pilihan Pengiriman: ${courier}\n`;
  text += `• Catatan: ${notes}\n\n`;

  text += `Mohon info ketersediaan stok & nomor rekening/QRIS untuk pembayaran ya. Terima kasih! 🙏`;

  const waUrl = `https://wa.me/${SHOFI_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, "_blank");

  showToast("Membuka WhatsApp untuk menyelesaikan pesanan...", "success");
}

// Simulasi Checkout Selesai Langsung di Web
function submitSimulatedOrder(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById("checkout-name");
  const phoneInput = document.getElementById("checkout-phone");
  const addressInput = document.getElementById("checkout-address");

  if (!nameInput?.value.trim() || !phoneInput?.value.trim() || !addressInput?.value.trim()) {
    showToast("Mohon lengkapi Nama, No. WhatsApp, dan Alamat Pengiriman.", "info");
    return;
  }

  // Buat Order ID Unik (contoh: SF-20261017-8492)
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const orderId = `SF-${dateStr}-${randomCode}`;

  const totals = calculateCartTotals();
  const orderDetails = {
    orderId,
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    address: addressInput.value.trim(),
    courier: document.getElementById("checkout-courier")?.value || "Instant Paxel/Grab",
    paymentMethod: document.getElementById("checkout-payment")?.value || "QRIS",
    notes: document.getElementById("checkout-notes")?.value.trim() || "-",
    items: [...AppState.cart],
    totals
  };

  closeCheckoutModal();
  clearCart();
  openOrderSuccessModal(orderDetails);
}

function openOrderSuccessModal(order) {
  const modal = document.getElementById("order-success-modal");
  const content = document.getElementById("order-success-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="text-center pb-4 border-b border-orange-100">
      <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
        🎉
      </div>
      <h3 class="font-heading font-extrabold text-2xl text-slate-800 mb-1">
        Pesanan Berhasil Dibuat!
      </h3>
      <p class="text-xs text-slate-500">
        Simulasi checkout pesanan Anda telah tercatat dengan ID:
      </p>
      <div class="inline-block bg-orange-100 text-orange-800 font-mono font-bold px-3 py-1 rounded-lg text-sm mt-2">
        ${order.orderId}
      </div>
    </div>

    <!-- Ringkasan Invoice -->
    <div id="order-receipt-content" class="py-4 space-y-3 text-xs text-slate-600">
      <div class="bg-orange-50/50 rounded-xl p-3 border border-orange-100">
        <span class="font-bold text-slate-700 block mb-1">Penerima:</span>
        <p class="font-semibold text-slate-800">${order.name} (${order.phone})</p>
        <p class="text-slate-500 mt-0.5">${order.address}</p>
        <p class="text-slate-500 mt-0.5">Opsi Kurir: <strong>${order.courier}</strong> | Bayar: <strong>${order.paymentMethod}</strong></p>
      </div>

      <div class="border-t border-slate-100 pt-3">
        <span class="font-bold text-slate-700 block mb-2">Item Dipesan:</span>
        <div class="space-y-1.5">
          ${order.items.map(i => `
            <div class="flex justify-between items-center">
              <span>${i.name} (x${i.qty})</span>
              <span class="font-bold">${formatRupiah(i.price * i.qty)}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="border-t border-slate-200 pt-3 flex justify-between items-center text-sm font-extrabold text-orange-600">
        <span>Total Pembayaran:</span>
        <span>${formatRupiah(order.totals.grandTotal)}</span>
      </div>

      <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
        <strong>*Catatan Simulasi:</strong> Ini adalah simulasi transaksi checkout toko. Untuk toko operasional aktif, pesanan ini dapat otomatis dikirim ke nomor WhatsApp admin atau sistem pembayaran payment gateway.
      </div>
    </div>

    <!-- Tombol Selesai -->
    <div class="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
      <button onclick="copyOrderSummary('${order.orderId}')" class="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors">
        <span>📋 Salin Ringkasan</span>
      </button>
      <button onclick="closeOrderSuccessModal()" class="btn-primary-shofi py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5">
        <span>Kembali Belanja</span>
      </button>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function copyOrderSummary(orderId) {
  const text = `Pesanan Shofi Frozen dengan ID: ${orderId} siap diproses.`;
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 ID Pesanan berhasil disalin ke clipboard!");
  }).catch(() => {
    showToast("Gagal menyalin otomatis.", "info");
  });
}

function closeOrderSuccessModal() {
  const modal = document.getElementById("order-success-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// --------------------------------------------------------------------------
// 9. FILTER & EVENT LISTENERS
// --------------------------------------------------------------------------
function selectCategoryFilter(categoryId) {
  AppState.activeCategory = categoryId;
  
  // Update tampilan tombol kategori aktif
  document.querySelectorAll(".category-pill").forEach(btn => {
    if (btn.dataset.category === categoryId) {
      btn.className = "category-pill bg-orange-600 text-white font-bold px-4 py-2 rounded-full text-xs sm:text-sm shadow-sm transition-all";
    } else {
      btn.className = "category-pill bg-white hover:bg-orange-50 text-slate-700 border border-slate-200 font-semibold px-4 py-2 rounded-full text-xs sm:text-sm transition-all";
    }
  });

  renderProducts();

  // Scroll ke katalog jika tombol kategori atas diklik
  const catalogSection = document.getElementById("katalog");
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: "smooth" });
  }
}

function resetFilters() {
  AppState.activeCategory = "all";
  AppState.searchQuery = "";
  AppState.sortBy = "default";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

  selectCategoryFilter("all");
}

function initEventListeners() {
  // Input Pencarian
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Dropdown Sort
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Hamburger menu mobile
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
  const closeMobileMenuBtn = document.getElementById("close-mobile-menu");

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuDrawer.classList.toggle("hidden");
    });
  }
  if (closeMobileMenuBtn && mobileMenuDrawer) {
    closeMobileMenuBtn.addEventListener("click", () => {
      mobileMenuDrawer.classList.add("hidden");
    });
  }

  // Tutup mobile drawer saat klik link
  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenuDrawer) mobileMenuDrawer.classList.add("hidden");
    });
  });
}

// --------------------------------------------------------------------------
// 10. LOCAL STORAGE & TOAST SYSTEM
// --------------------------------------------------------------------------
function saveCartToStorage() {
  try {
    localStorage.setItem("shofi_frozen_cart", JSON.stringify(AppState.cart));
  } catch (e) {
    console.error("Gagal menyimpan keranjang ke LocalStorage", e);
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("shofi_frozen_cart");
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (e) {
    AppState.cart = [];
  }
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-message bg-slate-900/90 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-700/50 text-xs sm:text-sm font-semibold flex items-center gap-2 max-w-sm";
  toast.innerHTML = message;

  container.appendChild(toast);

  // Animasi Masuk
  setTimeout(() => toast.classList.add("show"), 10);

  // Otomatis Hilang setelah 3.5 detik
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
