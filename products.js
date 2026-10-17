/**
 * Shofi Frozen - Database Produk & Paket Promo
 * Gambar telah disesuaikan secara akurat 100% dengan nama produk masing-masing
 * dan tersimpan di folder lokal images/ untuk kecepatan loading dan keandalan tinggi.
 */

const PRODUCTS_DATA = [
  {
    id: "prod-1",
    name: "Nugget Ayam Crispy Golden",
    category: "nugget",
    categoryName: "Nugget",
    weight: "500 gram",
    price: 38000,
    originalPrice: 45000,
    rating: 4.9,
    reviewsCount: 230,
    badge: "Terlaris",
    image: "images/nugget-crispy.jpg",
    description: "Nugget daging ayam pilihan dengan baluran tepung roti super renyah. Luar garing gurih, daging dalam tetap lembut dan juicy. Favorit anak-anak dan keluarga!",
    cookingMethods: {
      fry: "Goreng dalam minyak panas 170°C selama 3-4 menit sampai kuning keemasan.",
      airfryer: "Panggang pada suhu 180°C selama 8-10 menit (olesi sedikit minyak untuk hasil ekstra krispi).",
      steam: "Tidak disarankan dikukus untuk menjaga kerenyahan."
    },
    storage: "Simpan di freezer pada suhu -18°C. Tahan hingga 12 bulan.",
    tags: ["Ayam", "Crispy", "Sarapan", "Lauk Kos"]
  },
  {
    id: "prod-2",
    name: "Nugget Stick Keju Lumer",
    category: "nugget",
    categoryName: "Nugget",
    weight: "450 gram (15 pcs)",
    price: 42000,
    originalPrice: 48000,
    rating: 4.8,
    reviewsCount: 164,
    badge: "Favorit",
    image: "images/nugget-keju.jpg",
    description: "Stick keju mozarella tebal berbalut adonan daging ayam dan tepung roti krispi. Keju meleleh lumer dan mulur saat digigit selagi hangat!",
    cookingMethods: {
      fry: "Goreng dengan api sedang selama 3-4 menit hingga keju dalam meleleh sempurna.",
      airfryer: "Suhu 175°C selama 7-8 menit.",
      steam: "Tidak disarankan."
    },
    storage: "Simpan beku -18°C. Tahan hingga 6 bulan.",
    tags: ["Keju", "Mozarella", "Camilan"]
  },
  {
    id: "prod-3",
    name: "Sosis Sapi Bakar Jumbo",
    category: "sosis",
    categoryName: "Sosis",
    weight: "500 gram (6 pcs Jumbo)",
    price: 45000,
    originalPrice: 52000,
    rating: 4.9,
    reviewsCount: 312,
    badge: "Terlaris",
    image: "images/sosis-bakar.jpg",
    description: "Sosis daging sapi premium berukuran jumbo dengan aroma panggang asap gurih. Daging padat kenyal, cocok dipanggang teflon dengan olesan saus BBQ.",
    cookingMethods: {
      fry: "Kerat sosis melintang, panggang di teflon dengan sedikit margarin selama 4-5 menit.",
      airfryer: "Panggang pada suhu 190°C selama 6-8 menit.",
      steam: "Rebus/kukus 5 menit untuk tekstur yang lebih lembut dan bebas minyak."
    },
    storage: "Simpan beku -18°C. Tahan hingga 9 bulan.",
    tags: ["Sapi", "Bakar", "BBQ", "Jumbo"]
  },
  {
    id: "prod-4",
    name: "Sosis Ayam Cocktail Mini",
    category: "sosis",
    categoryName: "Sosis",
    weight: "500 gram (24 pcs)",
    price: 32000,
    originalPrice: 38000,
    rating: 4.8,
    reviewsCount: 189,
    badge: "Hemat",
    image: "images/sosis-cocktail.jpg",
    description: "Sosis ayam mini sekali gigit, tekstur halus dan kenyal gurih. Sangat praktis untuk campuran sup hangat, nasi goreng, atau lauk praktis mie instan anak kos.",
    cookingMethods: {
      fry: "Goreng sebentar 2-3 menit atau tumis langsung dengan bumbu favorit.",
      airfryer: "Suhu 180°C selama 5 menit.",
      steam: "Kukus atau rebus langsung ke dalam masakan berkuah 3-5 menit."
    },
    storage: "Simpan beku -18°C. Tahan hingga 12 bulan.",
    tags: ["Ayam", "Mini", "Campuran Sup", "Anak Kos"]
  },
  {
    id: "prod-5",
    name: "Dimsum Ayam Udang Premium",
    category: "dimsum",
    categoryName: "Dimsum",
    weight: "10 pcs (Plus Chili Oil)",
    price: 35000,
    originalPrice: 42000,
    rating: 5.0,
    reviewsCount: 420,
    badge: "Terlaris",
    image: "images/dimsum-siomay.jpg",
    description: "Siomay dimsum daging ayam dan udang cincang tebal berserat. Kulit tipis lembut dengan taburan wortel di atasnya, lengkap dengan sambal chili oil gurih pedas!",
    cookingMethods: {
      fry: "Bisa digoreng untuk dimsum goreng krispi (deep fry 3-4 menit).",
      airfryer: "Suhu 180°C selama 7 menit jika ingin tekstur luar garing.",
      steam: "Kukus selama 8-10 menit di kukusan mendidih sampai kulit lembut dan juicy."
    },
    storage: "Simpan beku -18°C. Tahan hingga 6 bulan.",
    tags: ["Dimsum", "Ayam Udang", "Chili Oil", "Kukus"]
  },
  {
    id: "prod-6",
    name: "Dimsum Hakau Udang Lembut",
    category: "dimsum",
    categoryName: "Dimsum",
    weight: "10 pcs Kemasan Beku",
    price: 38000,
    originalPrice: 45000,
    rating: 4.9,
    reviewsCount: 145,
    badge: "Favorit",
    image: "images/dimsum-hakau.jpg",
    description: "Hakau udang istimewa dengan kulit transparan lembut dan isian udang utuh segar yang manis kenyal. Cita rasa restoran dimsum bintang lima di rumah Anda.",
    cookingMethods: {
      fry: "Tidak disarankan untuk digoreng.",
      airfryer: "Tidak disarankan.",
      steam: "Kukus selama 6-8 menit dengan alas daun/kertas kukus yang sudah dioles minyak."
    },
    storage: "Simpan beku -18°C. Tahan hingga 6 bulan.",
    tags: ["Dimsum", "Hakau", "Udang", "Halal"]
  },
  {
    id: "prod-7",
    name: "Kentang Goreng Shoestring Crispy",
    category: "kentang",
    categoryName: "Kentang Goreng",
    weight: "1.000 gram (1 Kg)",
    price: 36000,
    originalPrice: 42000,
    rating: 4.9,
    reviewsCount: 295,
    badge: "Terlaris",
    image: "images/kentang-shoestring.jpg",
    description: "Potongan kentang panjang lurus gaya resto cepat saji. Super renyah garing di luar dan lembut di dalam saat digoreng langsung dalam kondisi beku.",
    cookingMethods: {
      fry: "Goreng dalam minyak banyak dan panas (180°C) langsung dari kondisi beku selama 3-4 menit.",
      airfryer: "Panggang pada suhu 200°C selama 12-15 menit, kocok sesekali agar matang merata.",
      steam: "Tidak disarankan."
    },
    storage: "Simpan beku -18°C. Jangan dicairkan sebelum digoreng agar tetap renyah.",
    tags: ["Kentang", "Shoestring", "1 Kg", "Snack"]
  },
  {
    id: "prod-8",
    name: "Kentang Crinkle Cut Bergelombang",
    category: "kentang",
    categoryName: "Kentang Goreng",
    weight: "1.000 gram (1 Kg)",
    price: 37000,
    originalPrice: 44000,
    rating: 4.8,
    reviewsCount: 178,
    badge: "Favorit",
    image: "images/kentang-crinkle.jpg",
    description: "Potongan kentang bergelombang lebih tebal, memberikan gigitan kentang yang lebih mantap, gurih, dan tekstur empuk pulen di bagian dalam.",
    cookingMethods: {
      fry: "Goreng langsung kondisi beku di minyak panas 175°C selama 4-5 menit.",
      airfryer: "Suhu 195°C selama 14-16 menit.",
      steam: "Tidak disarankan."
    },
    storage: "Simpan beku -18°C. Tahan hingga 12 bulan.",
    tags: ["Kentang", "Crinkle", "Tebal", "1 Kg"]
  },
  {
    id: "prod-9",
    name: "Tempura Udang Ebi Furai Renyah",
    category: "seafood",
    categoryName: "Seafood",
    weight: "250 gram (10 pcs)",
    price: 48000,
    originalPrice: 56000,
    rating: 4.9,
    reviewsCount: 204,
    badge: "Favorit",
    image: "images/tempura-ebi-furai.jpg",
    description: "Udang utuh segar dengan ekor dibalut remah roti panko Jepang yang garing keemasan. Siap disajikan menjadi menu bento istimewa ala resto Jepang.",
    cookingMethods: {
      fry: "Goreng langsung beku dengan api sedang-kecil selama 3-4 menit hingga keemasan.",
      airfryer: "Semprot minyak tipis, panggang 180°C selama 9-11 menit.",
      steam: "Tidak disarankan."
    },
    storage: "Simpan beku -18°C. Tahan hingga 6 bulan.",
    tags: ["Udang", "Ebi Furai", "Bento", "Jepang"]
  },
  {
    id: "prod-10",
    name: "Otak-Otak Ikan Tenggiri Gurih",
    category: "seafood",
    categoryName: "Seafood",
    weight: "500 gram (Sekitar 20 pcs)",
    price: 34000,
    originalPrice: 40000,
    rating: 4.8,
    reviewsCount: 153,
    badge: "Hemat",
    image: "images/otak-otak.jpg",
    description: "Olahan daging ikan tenggiri segar dengan bumbu rempah tradisional dan aroma khas. Tekstur kenyal lembut, sangat nikmat digoreng atau dibakar teflon.",
    cookingMethods: {
      fry: "Goreng dalam minyak hangat hingga mengembang dan kecokelatan (3-4 menit).",
      airfryer: "Suhu 180°C selama 8 menit.",
      steam: "Kukus 7 menit untuk variasi sajian sehat bebas minyak."
    },
    storage: "Simpan beku -18°C. Tahan hingga 8 bulan.",
    tags: ["Ikan", "Tenggiri", "Gurih", "Tradisional"]
  },
  {
    id: "prod-11",
    name: "Bakso Sapi Urat Super Kenyal",
    category: "lainnya",
    categoryName: "Frozen Food Lainnya",
    weight: "500 gram (25 butir)",
    price: 42000,
    originalPrice: 49000,
    rating: 4.9,
    reviewsCount: 288,
    badge: "Terlaris",
    image: "images/bakso-sapi.jpg",
    description: "Bakso sapi asli dengan komposisi daging sapi tinggi dan sensasi cincangan urat yang kres kenyal mantap. Nikmat untuk kuah bakso sedap, mie, atau tumisan capcay.",
    cookingMethods: {
      fry: "Kerat lalu goreng/bakar di teflon dengan olesan kecap manis dan saus pedas.",
      airfryer: "Suhu 180°C selama 6-8 menit.",
      steam: "Rebus langsung ke kuah kaldu panas selama 5-7 menit sampai mengapung."
    },
    storage: "Simpan beku -18°C. Tahan hingga 10 bulan.",
    tags: ["Bakso", "Sapi", "Urat", "Kuah Sedap"]
  },
  {
    id: "prod-12",
    name: "Cireng Salju Isi Ayam Pedas",
    category: "lainnya",
    categoryName: "Frozen Food Lainnya",
    weight: "10 pcs (Plus Bumbu Rujak)",
    price: 22000,
    originalPrice: 28000,
    rating: 4.9,
    reviewsCount: 310,
    badge: "Favorit",
    image: "images/cireng-rujak.jpg",
    description: "Camilan cireng renyah krispi di luar dan kenyal lembut di dalam dengan isian suwiran daging ayam bumbu pedas gurih. Sudah termasuk saus bumbu rujak pedas manis!",
    cookingMethods: {
      fry: "Goreng dalam minyak banyak dengan api kecil-sedang agar matang merata dan tidak meletup (4-5 menit).",
      airfryer: "Semprot sedikit minyak, 175°C selama 8-10 menit.",
      steam: "Tidak disarankan."
    },
    storage: "Simpan beku -18°C. Tahan hingga 4 bulan.",
    tags: ["Cireng", "Ayam Pedas", "Bumbu Rujak", "Snack Sore"]
  }
];

const CATEGORIES_DATA = [
  {
    id: "nugget",
    name: "Nugget",
    count: 2,
    icon: "🍗",
    image: "images/nugget-crispy.jpg",
    description: "Nugget ayam crispy & olahan stick keju lumer praktis"
  },
  {
    id: "sosis",
    name: "Sosis",
    count: 2,
    icon: "🌭",
    image: "images/sosis-bakar.jpg",
    description: "Sosis sapi bakar jumbo & sosis ayam mini cocktail lezat"
  },
  {
    id: "dimsum",
    name: "Dimsum",
    count: 2,
    icon: "🥟",
    image: "images/dimsum-siomay.jpg",
    description: "Siomay ayam udang & hakau lembut plus chili oil wangi"
  },
  {
    id: "kentang",
    name: "Kentang Goreng",
    count: 2,
    icon: "🍟",
    image: "images/kentang-shoestring.jpg",
    description: "Shoestring & Crinkle cut renyah ala restoran cepat saji"
  },
  {
    id: "seafood",
    name: "Seafood",
    count: 2,
    icon: "🍤",
    image: "images/tempura-ebi-furai.jpg",
    description: "Ebi furai udang panko & otak-otak tenggiri gurih"
  },
  {
    id: "lainnya",
    name: "Frozen Food Lainnya",
    count: 2,
    icon: "🍢",
    image: "images/bakso-sapi.jpg",
    description: "Bakso sapi urat kenyal, cireng rujak pedas, & aneka camilan"
  }
];

const BUNDLES_DATA = [
  {
    id: "bundle-kos",
    name: "Paket Anak Kos Praktis",
    tagline: "Penyelamat lapar tengah malam & sarapan kilat",
    price: 65000,
    originalPrice: 77000,
    savings: 12000,
    badge: "Paling Hemat",
    image: "images/kentang-shoestring.jpg",
    items: [
      "1x Nugget Stick Keju (250g)",
      "1x Sosis Ayam Cocktail Mini (300g)",
      "1x Kentang Goreng Shoestring (500g)"
    ],
    itemsList: [
      { name: "Nugget Stick Keju", weight: "250g" },
      { name: "Sosis Ayam Cocktail", weight: "300g" },
      { name: "Kentang Shoestring", weight: "500g" }
    ],
    description: "Kombinasi pas untuk mahasiswa dan anak kos! Porsi pas untuk simpanan 1-2 minggu di kulkas kamar kos.",
    cookingTime: "5 - 8 Menit"
  },
  {
    id: "bundle-keluarga",
    name: "Paket Keluarga Lengkap",
    tagline: "Stok lauk seminggu bebas ribet untuk keluarga",
    price: 145000,
    originalPrice: 173000,
    savings: 28000,
    badge: "Terfavorit",
    image: "images/nugget-crispy.jpg",
    items: [
      "1x Nugget Ayam Crispy Golden (500g)",
      "1x Sosis Sapi Bakar Jumbo (500g)",
      "1x Bakso Sapi Urat Super Kenyal (500g)",
      "1x Dimsum Ayam Udang (10 pcs)"
    ],
    itemsList: [
      { name: "Nugget Ayam Crispy", weight: "500g" },
      { name: "Sosis Sapi Bakar Jumbo", weight: "500g" },
      { name: "Bakso Sapi Urat", weight: "500g" },
      { name: "Dimsum Ayam Udang", weight: "10 pcs" }
    ],
    description: "Pilihan terbaik untuk Ibu rumah tangga. Stok aman seminggu untuk bekal anak sekolah dan makan bersama.",
    cookingTime: "Variatif 5 - 10 Menit"
  },
  {
    id: "bundle-camilan",
    name: "Paket Camilan & Nobar",
    tagline: "Teman santai nonton film bareng teman & keluarga",
    price: 85000,
    originalPrice: 100000,
    savings: 15000,
    badge: "Spesial Weekend",
    image: "images/dimsum-siomay.jpg",
    items: [
      "1x Dimsum Ayam Udang (10 pcs + Chili Oil)",
      "1x Tempura Udang Ebi Furai (250g)",
      "1x Kentang Goreng Shoestring (500g)"
    ],
    itemsList: [
      { name: "Dimsum Ayam Udang + Chili Oil", weight: "10 pcs" },
      { name: "Tempura Ebi Furai", weight: "250g" },
      { name: "Kentang Shoestring", weight: "500g" }
    ],
    description: "Kombinasi dimsum lembut, udang panko garing, dan kentang renyah. Langsung siap santap di waktu santai.",
    cookingTime: "Kukus & Goreng 8 Menit"
  }
];

const REVIEWS_DATA = [
  {
    id: "rev-1",
    name: "Ibu Dewi Kartika",
    role: "Ibu Rumah Tangga (3 Anak) — Tangerang",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Sangat membantu buat stok sarapan dan bekal anak-anak sekolah. Anak-anak paling suka nugget ayam dan sosis jumbonya! Pengiriman pakai ice gel aman banget, sampai rumah masih beku keras.",
    productMentioned: "Nugget Ayam Crispy & Sosis Jumbo"
  },
  {
    id: "rev-2",
    name: "Dimas Pratama",
    role: "Mahasiswa Tingkat Akhir — Jakarta Barat",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Paket Anak Kos wajib banget ada di freezer kosan! Pas lagi begadang skripsian dan lapar tengah malam, tinggal panasin air fryer atau goreng sebentar 5 menit udah kenyang. Praktis dan gak bikin kantong jebol.",
    productMentioned: "Paket Anak Kos Praktis"
  },
  {
    id: "rev-3",
    name: "Sarah Anggraini",
    role: "Karyawan Swasta — Jakarta Selatan",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Dimsum ayam udangnya beneran juara, isian udangnya kerasa dan chili oil-nya wangi mantap! Pemesanan lewat website gampang banget, checkout-nya juga bisa langsung lanjut ke WhatsApp.",
    productMentioned: "Dimsum Ayam Udang Premium"
  }
];

const FAQS_DATA = [
  {
    id: "faq-1",
    question: "Bagaimana cara memesan di Shofi Frozen?",
    answer: "Pemesanan sangat mudah! Cukup klik tombol <strong>'Pilih Frozen Food Favoritmu'</strong>, pilih produk yang Anda inginkan, tentukan jumlahnya, lalu klik tombol keranjang. Anda bisa melanjutkan checkout langsung di website atau memilih tombol 'Kirim Pesanan via WhatsApp' untuk langsung terhubung dengan admin kami beserta rincian belanja Anda."
  },
  {
    id: "faq-2",
    question: "Apa saja produk yang tersedia di Shofi Frozen?",
    answer: "Kami menyediakan berbagai pilihan frozen food favorit: Nugget Ayam & Keju, Sosis Sapi Bakar Jumbo, Sosis Ayam, Dimsum Siomay & Hakau Udang, Kentang Goreng (Shoestring & Crinkle Cut), Aneka Seafood (Ebi Furai & Otak-Otak), Bakso Sapi Urat, Cireng Crispy, serta Paket Bundling Hemat."
  },
  {
    id: "faq-3",
    question: "Bagaimana pengiriman produk frozen food dilakukan agar tetap beku?",
    answer: "Keamanan mutu beku adalah prioritas kami! Setiap pesanan dikemas rapat dengan <em>insulated packaging</em> dan disertai <strong>Ice Gel Pendingin</strong> khusus. Kami melayani pengiriman Instant (1-2 jam) dan Same Day via Grab/Gojek/Paxel di area cakupan agar produk diterima dalam kondisi beku sempurna."
  },
  {
    id: "faq-4",
    question: "Berapa batas minimum pembelian?",
    answer: "Tidak ada minimum pembelian! Anda bisa memesan mulai dari 1 pack produk saja. Untuk mendapatkan keuntungan ekstra, belanja di atas Rp 100.000 otomatis mendapatkan fasilitas gratis ice gel pendingin khusus."
  },
  {
    id: "faq-5",
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima berbagai metode pembayaran aman dan fleksibel: <strong>QRIS</strong> (mendukung BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay), Transfer Bank Manual, serta <strong>COD (Bayar di Tempat)</strong> untuk area pengantaran kurir toko tertentu."
  },
  {
    id: "faq-6",
    question: "Berapa lama produk Shofi Frozen bisa bertahan di freezer?",
    answer: "Produk kami dapat bertahan antara 6 hingga 12 bulan jika disimpan dengan baik di dalam freezer beku pada suhu minimal -18°C. Tanggal kedaluwarsa dan petunjuk penyimpanan tertera jelas pada setiap kemasan produk."
  }
];

// Ekspor data ke window object untuk ketersediaan global di browser
window.SHOFI_DATA = {
  products: PRODUCTS_DATA,
  categories: CATEGORIES_DATA,
  bundles: BUNDLES_DATA,
  reviews: REVIEWS_DATA,
  faqs: FAQS_DATA
};
