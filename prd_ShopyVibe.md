# Product Requirements Document (PRD): ShopyVibe

> **Platform Web-Builder UMKM dengan AI Sales Agent**

| Field | Detail |
|---|---|
| **Status** | Draft / In-Progress |
| **Versi** | 1.0 |
| **Tanggal** | 22 April 2026 |
| **Owner** | Project Lead / Founder |
| **Tim** | Edityo Prasojo (203012510022) · Fauzan Reza Arnanda (203012510019) · M. Rifky Saiful Qadr (203012510010) |
| **Dosen** | Dr. Rifki Wijaya, S.Si., M.T. · Assoc. Prof. Dana Sulistyo Kusumo, S.T., M.T., Ph.D. |

---

## 1. Executive Summary

ShopyVibe adalah platform web-builder yang dikhususkan bagi UMKM untuk menciptakan identitas digital yang profesional, intim, dan fungsional. Berbeda dengan platform "link-in-bio" tradisional yang kaku, ShopyVibe menawarkan desain yang **fully responsive** (Desktop, Tablet, Mobile) dan fitur **AI Sales Agent** untuk membantu konversi penjualan tanpa kerumitan marketplace besar.

> **High-Level Concept:** ShopyVibe adalah _"Shopify versi mikro berbasis AI otonom untuk UMKM lokal"_. Platform ini memposisikan diri bukan sebagai kompetitor marketplace, melainkan sebagai **jalan keluar (exit route)** dari ketergantungan marketplace bagi UMKM yang siap memiliki rumah digital mandiri.

---

## 2. Sasaran & Target Market

**Target Utama:** UMKM (Kuliner, Fashion, Jasa), Solopreneur, dan Social Commerce Sellers.

**User Persona:** Penjual yang merasa marketplace terlalu "berisik" (banyak iklan kompetitor) dan merasa link-tree biasa terlalu sederhana untuk menampilkan profil bisnis mereka.

### Segmen Pengguna Teridentifikasi

- UMKM kuliner & frozen food mikro-kecil — segmen paling receptive, **53% responden survei**
- Social commerce seller Instagram/TikTok yang aktif berjualan via media sosial
- Solopreneur & kreator yang membutuhkan halaman bisnis profesional
- Reseller multi-brand yang jenuh dengan biaya komisi marketplace 6–14%

### Early Adopters

Pedagang frozen food aktif yang membutuhkan katalog terstruktur untuk link bio media sosial mereka.

---

## 3. Fitur Utama (Functional Requirements)

### 3.1 Dynamic Profile Builder

- **Custom Navbar:** Penjual dapat mengatur menu (Home, Products, About, Contact)
- **Landing Page Editor:** Drag-and-drop sederhana untuk menyusun Hero Image, Deskripsi Bisnis, dan Testimoni
- **Responsive Engine:** Pratinjau otomatis untuk tampilan Mobile dan Desktop secara real-time
- **Content Alignment System:** Auto-adjust copywriting default berdasarkan kategori bisnis (kuliner, fashion, jasa) — *sprint 1 priority*

### 3.2 Product & Inventory Management

- **Catalog Listing:** Upload foto produk, deskripsi, harga, dan kategori
- **Stock Management:** Input stok sederhana dengan notifikasi jika stok menipis
- **Direct Order Link:** Tombol beli yang langsung mengarah ke WhatsApp atau integrasi Payment Gateway

### 3.3 Distribution Tools — O2O Engine (Core Feature)

- **Link-in-Bio Generator:** URL pendek dan estetik (contoh: `shopyvibe.id/nama-bisnis`)
- **Custom QR Code:**
  - Generate QR Code untuk halaman profil atau produk spesifik
  - Kustomisasi warna dan penempatan logo di tengah QR Code
  - Format unduhan (PNG/SVG) untuk kebutuhan cetak (kemasan/meja)
  - Deep-link QR per produk untuk pengalaman O2O yang terintegrasi

### 3.4 AI Sales Agent ⭐ Hero Feature

- **Automated FAQ:** AI yang dilatih berdasarkan data produk penjual untuk menjawab pertanyaan pembeli
- **Greeting & Recommendations:** AI menyapa pengunjung dan menyarankan produk berdasarkan input chat pembeli
- **Real-time Stock Response:** AI menjawab pertanyaan stok secara kontekstual dan real-time
- **Leads Generation:** AI Agent terbukti menghasilkan **29,4% dari total leads** (10 dari 34 leads dalam pengujian MVP)
- **Proactive Recommendation:** AI merekomendasikan produk unggulan berdasarkan konteks pertanyaan

> **Catatan Strategis:** AI Sales Agent mendapatkan rating kepuasan tertinggi dari semua fitur yang diuji — **7/8 responden** menilainya sebagai fitur terpenting. Responden R3 dan R8 secara eksplisit menyebutnya sebagai _"game changer"_. Investasi R&D AI harus diprioritaskan; kualitas respons AI (accuracy, latency) menjadi **KPI teknis nomor satu**.

### 3.5 Seller Dashboard

- **Analytics:** Grafik kunjungan, jumlah klik link, dan jumlah scan QR (format zero-jargon: angka besar + label bisnis)
- **Leads Tracker:** Data pembeli yang masuk melalui klik tombol WhatsApp atau form
- **AI Sales Agent Log:** Log percakapan AI real-time untuk monitoring konversi

--- 

## 4. Persyaratan Non-Fungsional

| Kategori | Persyaratan |
|---|---|
| **Performance** | Loading time halaman publik harus di bawah 2 detik (LCP < 2.5s) untuk menjaga retensi pembeli |
| **Scalability** | Arsitektur harus mendukung ribuan toko aktif secara bersamaan menggunakan teknologi kontainerisasi (Docker) |
| **Security** | Implementasi SSL (HTTPS) untuk semua domain/subdomain penjual dan perlindungan terhadap brute force pada dashboard |
| **Responsiveness** | UI harus adaptif (Grid System) untuk resolusi layar dari 320px (Mobile) hingga 1920px (Desktop). Tampilan mobile diprioritaskan — primary device UMKM |

---

## 5. Arsitektur Teknis (High-Level)

| Komponen | Detail Teknis |
|---|---|
| **Frontend** | Next.js (React) untuk SSR (Server Side Rendering) agar SEO friendly. Terbukti menghasilkan performa memuaskan di lingkungan MVP |
| **Backend** | Node.js atau Python (FastAPI) untuk menangani logika AI, manajemen data, dan API layer |
| **Database** | PostgreSQL (Relational data: produk, user, toko) & Redis (Caching analytics untuk performa dashboard) |
| **Infrastructure** | Docker-based deployment dengan Cloudflare Tunnel untuk keamanan dan optimasi delivery konten. Mendukung skalabilitas ribuan toko aktif |
| **AI Engine** | Integrasi API LLM (OpenAI/Groq) dengan context injection dari database produk seller. Training Q&A sektor-spesifik per kategori bisnis |

---

## 6. User Journey (Alur Pengguna)

1. **Pendaftaran** — Seller mendaftar dan memverifikasi email
2. **Setup Bisnis** — Input nama bisnis, upload logo, dan memilih tema warna
3. **Katalog** — Menambahkan minimal 3 produk unggulan dengan foto, deskripsi, harga, dan stok
4. **Publikasi** — Mengaktifkan halaman, mendapatkan Link Bio, dan mengunduh QR Code
5. **Monitoring** — Seller memantau performa toko melalui dashboard secara berkala

> **Kriteria Usability:** Dynamic Profile Builder dapat dioperasikan penuh oleh pemilik UMKM non-teknis dalam waktu **kurang dari 5 menit** dari registrasi hingga toko siap dipublikasikan, tanpa panduan teknis atau bantuan pengembang. **Divalidasi: 100% responden usability testing** berhasil menyelesaikan setup tanpa panduan teknis.

---

## 7. Kriteria Keberhasilan (Success Metrics)

| Dimensi | Target | Bukti MVP |
|---|---|---|
| **Adopsi** | 1.000 UMKM terdaftar dalam 3 bulan pertama | CTR Fake Door 42% (2× benchmark 20%) |
| **QR Engagement** | Rata-rata 50 scan QR per toko / bulan | 89 scan pada toko demo MVP (178% target) |
| **Retention** | 60% user tetap memperbarui katalog setelah bulan pertama | 75% bersedia menjadi beta tester (n=32) |
| **AI Conversion** | AI Agent conversion rate > 40% | 29,4% di MVP (10/34 leads) — target upgrade Phase 2 |
| **CTR Landing** | CTR ≥ 20% (SaaS benchmark) | **42% tercapai** pada Fake Door Testing |

---

## 8. Roadmap Pengembangan

| Phase | Status | Fitur |
|---|---|---|
| **Phase 1 — MVP** | ✅ Selesai | Builder dasar, Katalog Produk, Link-in-bio, Standard QR Code |
| **Phase 2** | 🔄 Segera | Custom QR (Logo/Warna), Advanced Analytics, SEO otomatis, Template promosi, Share-kit, A/B test pricing Rp49k vs Rp79k |
| **Phase 3** | 📋 Planned | AI Sales Agent lanjutan (training sektor-spesifik + proactive recommendation), Payment Gateway lokal, Ekspansi segmen fashion & jasa |
| **Phase 4** | 🔮 Future | Custom Domain (penjual bisa pakai domain sendiri), Soft launch komunitas UMKM (50+ early adopter) |

---

## 9. Validated Learning (dari Lean Startup Cycle)

Data berikut merupakan hasil triangulasi kuantitatif (survei 32 responden + metrik MVP + Fake Door 42%) dan kualitatif (8 wawancara mendalam).

### 9.1 Ringkasan Validasi Hipotesis

| Hipotesis | Metode | Status |
|---|---|---|
| **H1 Customer** | Survei 32 + wawancara 8 UMKM frozen food | ✅ TERVALIDASI — F&B 53%, 8/8 wawancara positif |
| **H2 Problem** | Pertanyaan terbuka 32 responden | ✅ TERVALIDASI — "Tidak punya website" 34%, komisi mahal 22% |
| **H3 Value Proposition** | Demonstrasi live MVP + feedback fitur | ✅ TERVALIDASI — 97% nilai ide "membantu/sangat membantu" |
| **H4 Solution** | Usability testing setup toko mandiri | ✅ TERVALIDASI — 100% selesaikan setup tanpa panduan teknis |
| **H5 Value (WTP)** | Survei Willingness to Pay | ✅ TERVALIDASI — 69% bersedia coba gratis; 75% beta tester |
| **H6 Business Model** | Fake Door Testing CTA landing page | ✅ TERVALIDASI — CTR 42% vs benchmark 20% (2× lipat) |

### 9.2 Key Metrics MVP

| Metrik | Target | Hasil | Status |
|---|---|---|---|
| Total Kunjungan Toko Demo | — | 1.245 | Baik (+12% MoW) |
| Klik Tombol / CTA | — | 452 | Baik (+5% MoW) |
| CTR Fake Door Testing | ≥ 20% | **42%** | ⭐ Luar biasa (2× benchmark) |
| Total Scan QR Code | ≥ 50 | **89** | ✅ Melampaui (+78%) |
| Leads WhatsApp | — | 34 | Baik (+2% MoW) |
| Leads dari AI Sales Agent | — | 10 dari 34 | ✅ 29,4% share (signifikan) |

### 9.3 Temuan Penting yang Menantang Asumsi Awal

**Temuan 1: Promosi/Marketing adalah kebutuhan #1, bukan website builder**

Sebanyak 16/32 responden (50%) memilih "Promosi/marketing" sebagai fitur paling dibutuhkan, lebih tinggi dari "Website otomatis" (10/32 atau 31%). Implikasi: fitur pertumbuhan (SEO otomatis, template promosi, share-kit, integrasi iklan) perlu naik prioritas pada roadmap Phase 2.

**Temuan 2: Pasar lebih condong ke model komisi, bukan langganan**

Preferensi model pembayaran: Komisi saja **50%** > Langganan saja **34%** > Kombinasi **16%**. Implikasi: model hybrid freemium + komisi transaksi kecil dipertimbangkan sebagai jalur utama monetisasi, dengan langganan (Vibe Pro) sebagai opsi bagi seller bervolume tinggi.

### 9.4 Profil Responden Wawancara

| ID | Profil | Platform | Feedback Utama | Intent |
|---|---|---|---|---|
| R1 | Pemilik toko frozen food (Ardena Fish Roll) | Instagram + WA | Sering kehilangan pembeli karena lambat balas WA saat sibuk packing | **Pro** |
| R2 | Pemilik usaha bola kentang & snack beku | TikTok + WA | Lynk.id terlalu sederhana untuk desktop; dashboard ShopyVibe jauh lebih informatif | **Pro** |
| R3 | Penjual dimsum & makanan beku rumahan | Instagram | Tidak tahu cara buat website; sangat antusias setup <5 menit; AI Agent dinilai _"game changer"_ | **Pro** |
| R4 | Reseller frozen food multi-brand | Shopee + WA | Mengeluhkan komisi Shopee yang terus naik; tertarik pindah tapi butuh fitur stok | Pertimbangkan |
| R5 | Pemilik katering frozen food skala kecil | WA Business | Sangat setuju zero-commission; QR Code pada kemasan dinilai inovatif | **Pro** |
| R6 | Penjual produk beku olahan ikan | Instagram + Tokopedia | Mengeluhkan biaya iklan marketplace; tertarik Custom QR dan analytics | Pertimbangkan |
| R7 | Pemilik usaha nugget & bakso beku | Facebook + WA | Belum punya website; nilai fitur story/behind-the-brand bagus untuk kepercayaan pelanggan | **Pro** |
| R8 | Pedagang snack beku online+offline | Instagram + Toko fisik | Sangat tertarik O2O Engine — QR di kemasan ke katalog online, solusi yang belum pernah ada | **Pro** |

---

## 10. Known Issues & Technical Backlog

| Prioritas | Sprint | Issue | Success Metric |
|---|---|---|---|
| 🔴 **KRITIS** | Sprint 1 | **Content Alignment Engine:** kategori bisnis → auto-adjust seluruh copywriting default (hero, story, CTA). Inkonsistensi konten menyebabkan kebingungan 3/8 responden | Zero content-mismatch; NPS onboarding naik |
| 🔴 **KRITIS** | Sprint 1 | **Bug clearance "1 Issue Alert":** error handling graceful agar dashboard 100% error-free di antarmuka publik. Error indicator menurunkan persepsi keandalan di 4/8 responden | Dashboard bebas error di sesi pengujian berikutnya |
| 🟠 **TINGGI** | Phase 2 | Naikkan prioritas fitur pertumbuhan: SEO otomatis, template promosi, share-kit — menjawab felt-need #1 (marketing, 50% responden) | Trafik organik per toko meningkat; marketing diadopsi ≥ 50% user |
| 🟠 **TINGGI** | Phase 2 | Uji model monetisasi hybrid (freemium + komisi kecil) berdampingan Vibe Pro; A/B test pricing Rp49.000 vs Rp79.000 | Konversi free-to-paid ≥ 10%; ARPU naik |
| 🟠 **TINGGI** | Phase 2 | Peningkatan AI Sales Agent: training Q&A sektor-spesifik + proactive recommendation engine | AI lead conversion naik dari 29,4% menjadi > 40% |
| 🟡 **SEDANG** | Phase 3 | Perluasan sampel: dari 8 wawancara menjadi 50+ early adopter via soft launch komunitas UMKM | Data representatif 50+ user aktif; edge cases teridentifikasi |

---

## 11. Keputusan Strategis: PERSEVERE

Berdasarkan triangulasi seluruh data dari fase Build, Measure, dan Learn, keputusan strategis yang diambil adalah **PERSEVERE** — melanjutkan pengembangan dengan fokus pada perbaikan teknis yang teridentifikasi dan akselerasi menuju komersialisasi. Tidak ada kebutuhan untuk PIVOT pada tingkat asumsi inti, karena semua 6 hipotesis primer telah tervalidasi.

| Dimensi | Dasar Pertimbangan | Tindak Lanjut |
|---|---|---|
| **Segmen Pengguna** | UMKM kuliner/frozen food paling receptive (53% survei; 8/8 wawancara positif) | PERTAHANKAN segmen primer; ekspansi ke fashion & jasa setelah frozen food solid (Phase 3) |
| **Solusi Inti** | Dynamic Builder, AI Agent, dan QR O2O terbukti relevan dan diterima pasar | PERTAHANKAN tiga pilar; perkuat AI Agent sebagai differentiator utama |
| **Model Bisnis** | CTR 42% & 100% min-"mungkin" mencoba validasi demand; 50% pilih komisi | PERTAHANKAN; aktivasi tier Pro dengan A/B testing pricing Rp49k vs Rp79k |
| **Tech Stack** | Next.js, Node.js, Docker terbukti performa memuaskan di lingkungan MVP | PERTAHANKAN; tambah Redis caching & Cloudflare optimization untuk mobile |
| **Content Logic** | Inkonsistensi konten menyebabkan confusion pada 3/8 responden | **PIVOT MINOR:** implementasi Content Alignment System (Sprint 1 prioritas tertinggi) |

---

## 12. Model Bisnis & Monetisasi

### 12.1 Revenue Streams

- **Freemium (Gratis):** Akses fitur dasar — Builder, Katalog, Link Bio, Standard QR
- **Vibe Pro (Rp49.000–Rp79.000/bulan):** Custom Domain, AI Sales Agent lanjutan, Analytics mendalam, Custom QR dengan logo
- **AI Token Add-on:** Paket token tambahan untuk seller dengan volume percakapan AI tinggi
- **Komisi Transaksi (model hybrid):** Komisi kecil per transaksi sebagai opsi bagi seller yang tidak ingin berlangganan bulanan

### 12.2 Target BEP

Break-even point diperkirakan tercapai pada **485 user Pro aktif di Bulan 12**, jika funnel freemium-to-paid dioptimalkan dengan baik berdasarkan data perilaku pengguna.

### 12.3 Competitive Positioning

| Fitur | ShopyVibe | Linktree | Lynk.id | WA Manual |
|---|---|---|---|---|
| AI Sales Agent 24/7 | ✅ Native | ❌ | ❌ | ❌ |
| Custom QR Code (O2O) | ✅ Full | ❌ | Terbatas | ❌ |
| Dashboard Analytics | ✅ Zero-jargon | Terbatas | Terbatas | ❌ |
| Katalog Produk Lengkap | ✅ | ❌ | Terbatas | Manual |
| Zero Komisi Penjualan | ✅ | ✅ | ✅ | ✅ |
| Setup < 5 Menit | ✅ Verified | Parsial | Parsial | ❌ |

---

## 13. Deklarasi Pemakaian AI

Tim pengembang ShopyVibe memanfaatkan teknologi Generative AI sebagai instrumen akselerasi dan kolaborasi secara proporsional untuk tujuan berikut:

- Melakukan ekstraksi data struktural secara objektif terhadap komponen antarmuka, angka metrik, dan log aktivitas teks dari dokumen tangkapan layar MVP
- Membantu penyusunan sintaksis dan pemformatan laporan agar sesuai dengan kaidah penulisan ilmiah serta teori formal Lean Canvas

> **Pernyataan Integritas:** Seluruh pemrosesan data riil, analisis kritis, interpretasi hasil kualitatif responden, serta pengambilan keputusan strategis (Persevere) murni merupakan hasil pemikiran, validasi lapangan, dan tanggung jawab ilmiah tim secara mandiri. AI berfungsi sebagai **asisten produktivitas**, bukan pengambil keputusan.

---

*Disusun oleh: Edityo Prasojo (203012510022) · Fauzan Reza Arnanda (203012510019) · M. Rifky Saiful Qadr (203012510010)*
*Program Studi Magister Informatika — Telkom University — 2026*
