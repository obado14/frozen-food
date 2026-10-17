# ❄️ Shofi Frozen — Website Landing Page E-Commerce

Website landing page e-commerce modern, menarik, profesional, dan responsif untuk bisnis **Shofi Frozen**. Dirancang khusus untuk memikat target audiens utama: **Ibu rumah tangga, mahasiswa, dan anak kos** yang membutuhkan makanan praktis, bergizi, dan cepat dimasak.

---

## 🌟 Fitur & Keunggulan Utama

1. **Desain Modern, Fresh, & Menggugah Selera**:
   - Palet warna hangat & segar: Oranye utama, latar belakang krem bersih, aksen hijau segar.
   - Tipografi modern (*Outfit* & *Plus Jakarta Sans*), sudut membulat, dan bayangan kartu yang halus.
   - Foto-foto frozen food beresolusi tinggi (nugget ayam crispy, sosis sapi jumbo, dimsum ayam udang, french fries, ebi furai, bakso sapi).

2. **Struktur Halaman Lengkap Sesuai Spesifikasi**:
   - **Navbar Responsif**: Logo brand Shofi Frozen, menu navigasi, badge keranjang interaktif, dan tombol CTA "Belanja Sekarang".
   - **Hero Section**:
     - Headline: *"Stok Frozen Food, Masak Jadi Lebih Mudah!"*
     - Subheadline: *"Solusi makanan praktis dan lezat untuk keluarga, mahasiswa, dan anak kos. Tinggal simpan di freezer, masak kapan saja!"*
     - CTA Utama: **"Pilih Frozen Food Favoritmu"** (mengarahkan pengunjung langsung ke katalog produk).
     - Trust badges: *Siap Masak 5-10 Menit, Suhu Beku -18°C Terjaga, Rating 4.9/5*.
   - **Kategori Produk Interaktif**: Kartu kategori (Nugget, Sosis, Dimsum, Kentang Goreng, Seafood, Frozen Food Lainnya) dengan interaksi klik yang langsung menyaring katalog.
   - **Katalog Produk Unggulan**:
     - Pencarian real-time (live search) berdasarkan nama dan deskripsi.
     - Filter kategori dan pengurutan (Terpopuler, Termurah, Termahal).
     - Kartu produk menampilkan foto, nama, berat kemasan, harga Rupiah realistis, label status (*Terlaris, Favorit, Hemat*), tombol *+ Keranjang*, dan tombol *Detail*.
   - **Panduan Cara Masak (Quick View Modal)**:
     - Panduan menggoreng di teflon, air fryer, maupun kukus/rebus untuk setiap menu.
     - Petunjuk penyimpanan freezer (-18°C).
   - **Keunggulan Shofi Frozen**: Menjelaskan manfaat praktis sehari-hari, varian lengkap, cocok untuk stok rumah & kos, dan pemesanan mudah.
   - **Promo / Paket Hemat (Bundling)**:
     - Paket Anak Kos Praktis
     - Paket Keluarga Lengkap
     - Paket Camilan & Nobar
     - Tombol 1-klik tambah seluruh paket hemat ke keranjang belanja.
   - **Alur Pemesanan 3 Langkah**: Panduan jelas dari memilih menu, memasukkan ke keranjang, hingga pengiriman.
   - **Testimoni Pelanggan**: Kartu ulasan persona pelanggan (Ibu rumah tangga, mahasiswa kos, karyawan).
   - **FAQ Accordion**: 6 pertanyaan umum yang sering ditanyakan seputar cara order, produk, pengiriman dingin, dan metode pembayaran.
   - **Footer Komprehensif**: Identitas brand, navigasi, kontak alamat, jam operasional, dan tautan sosial media.

3. **Sistem Keranjang & Checkout Fleksibel**:
   - **Slide-Over Cart Drawer**: Hitung subtotal otomatis, kontrol jumlah item `[- / +]`, hapus item, dan simulasi kupon voucher (`SHOFIHEMAT` diskon 10%).
   - **Fasilitas Ice Gel Pendingin**: Otomatis gratis untuk pembelian di atas Rp 100.000 (atau Rp 3.000 jika di bawah itu).
   - **Simulasi Checkout Lengkap**: Formulir nama, nomor WhatsApp, alamat lengkap penerima, pilihan opsi kurir (Instant Paxel/Grab, Same Day), dan opsi pembayaran (QRIS, Transfer Bank, COD).
   - **Pemesanan Otomatis ke WhatsApp**: Otomatis merangkum rincian belanja, subtotal, dan data alamat penerima ke dalam teks WhatsApp yang rapi dan langsung membuka `wa.me`.
   - **Struk Konfirmasi Pesanan**: Menampilkan Order ID unik, invoice belanja, dan tombol salin ringkasan pesanan.

---

## 📁 Struktur Berkas

```
shofi-frozen/
│
├── index.html          # File halaman utama landing page lengkap & responsif
├── styles.css          # Pengaturan style custom, animasi, glassmorphism, & tema
├── products.js         # Database mock produk, kategori, paket hemat, & FAQ
├── app.js              # Logika interaktif keranjang, pencarian, filter, WA order
├── package.json        # Konfigurasi project & script local preview
└── README.md           # Dokumentasi & panduan penggunaan
```

---

## 🚀 Cara Menjalankan & Membuka Website

### Cara 1: Buka Langsung di Browser (Paling Mudah)
Anda dapat langsung melakukan klik dua kali pada file `index.html` atau membukanya melalui Google Chrome, Edge, Safari, maupun Firefox:
```text
C:\Users\USer\shofi-frozen\index.html
```

### Cara 2: Menjalankan Local Web Server (Node.js)
Buka terminal / PowerShell di dalam folder `shofi-frozen`, lalu jalankan:
```bash
npx serve -l 3000 .
```
Lalu buka browser di `http://localhost:3000`.

---

## ⚙️ Panduan Penyesuaian Data Bisnis Asli

### 1. Mengubah Nomor WhatsApp Admin
Buka file `app.js`, cari objek `SHOFI_CONFIG` di bagian atas:
```javascript
const SHOFI_CONFIG = {
  businessName: "Shofi Frozen",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp Anda (format 62...)
  freeIceGelMinOrder: 100000,
  iceGelPrice: 3000,
  ...
};
```

### 2. Menambah atau Mengubah Produk & Harga
Buka file `products.js`. Seluruh daftar produk disimpan dalam array `PRODUCTS_DATA`. Anda bisa menambahkan foto, mengganti nama, harga, berat kemasan, atau petunjuk cara masak dengan mudah.

### 3. Mengubah Promo Paket Hemat
Pada file `products.js`, cari array `BUNDLES_DATA` untuk menyesuaikan isi paket bundling, nama paket, dan harga promo.

---

## 📱 Responsivitas
Website ini telah diuji dan dioptimalkan untuk berbagai ukuran layar:
- **Smartphone (Mobile)**: Dilengkapi *Mobile Drawer Menu*, navigasi yang nyaman disentuh, serta *Floating Action Bar* di bagian bawah layar untuk melihat total belanja dan akses keranjang instan.
- **Tablet**: Layout grid 2 kolom dengan jarak baca yang proporsional.
- **Desktop / Laptop**: Tata letak luas 3-4 kolom dengan efek hover halus pada kartu produk.
  
# frozen-food  
