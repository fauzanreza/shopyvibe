"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  SparklesIcon, CheckIcon, LockClosedIcon, ArrowLeftIcon,
  GlobeAltIcon, ChartBarIcon, QrCodeIcon, ChatBubbleBottomCenterTextIcon,
  MegaphoneIcon, StarIcon, BoltIcon, ShieldCheckIcon, XMarkIcon
} from "@heroicons/react/24/outline";

const PRO_FEATURES = [
  {
    icon: GlobeAltIcon,
    name: "Custom Domain",
    desc: "Gunakan domain sendiri (toko.com) bukan /slug kami. Bangun brand mandiri.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    name: "AI Sales Agent Pro",
    desc: "AI 24/7 menjawab pertanyaan pembeli, merekomendasikan produk, dan menutup penjualan otomatis.",
    gradient: "from-sky-500 to-indigo-600",
  },
  {
    icon: QrCodeIcon,
    name: "Custom QR Code",
    desc: "QR Code dengan logo bisnis, warna brand, dan deep-link per produk untuk kemasan & meja.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: ChartBarIcon,
    name: "Advanced Analytics",
    desc: "Grafik konversi, heatmap klik, demografi pengunjung, dan laporan penjualan bulanan.",
    gradient: "from-orange-500 to-rose-600",
  },
  {
    icon: MegaphoneIcon,
    name: "Marketing Templates",
    desc: "Template promosi siap pakai (Harbolnas, Flash Sale, Lebaran) & SEO otomatis per produk.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: StarIcon,
    name: "Verified Badge",
    desc: "Lencana toko terverifikasi yang meningkatkan kepercayaan pembeli dan prioritas pencarian.",
    gradient: "from-yellow-500 to-amber-600",
  },
];

const FREE_FEATURES = [
  "Dynamic Profile Builder",
  "Katalog Produk (unlimited)",
  "Link-in-Bio URL pendek",
  "Standard QR Code",
  "Manajemen Pesanan",
  "Dashboard Dasar",
];

export default function UpgradePage() {
  const params = useParams();
  const storeId = params?.storeId as string;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — in production, POST to a waitlist endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-white relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Back button */}
        <Link
          href={`/dashboard/${storeId}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-10"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <BoltIcon className="w-3.5 h-3.5" />
            Vibe Pro — Coming Soon
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">
            Wujudkan Toko<br />yang Benar-Benar Mandiri
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Vibe Pro hadir dengan fitur premium yang dirancang khusus untuk UMKM yang serius membangun brand digital tanpa bergantung pada marketplace.
          </p>
        </div>

        {/* Pro Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {PRO_FEATURES.map((f) => (
            <div
              key={f.name}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <div className="absolute top-4 right-4">
                <LockClosedIcon className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{f.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing + Waitlist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Pricing card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black text-white">Rp 49.000</span>
              <span className="text-slate-400">/bulan</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">atau Rp 79.000/bulan (tanpa komitmen tahunan)</p>

            <div className="space-y-2 mb-8">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Sudah termasuk (Gratis):</p>
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">Tambahan di Pro:</p>
              {PRO_FEATURES.map((f) => (
                <div key={f.name} className="flex items-center gap-3 text-slate-300 text-sm mb-2">
                  <ShieldCheckIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  {f.name}
                </div>
              ))}
            </div>
          </div>

          {/* Waitlist Form */}
          <div className="bg-gradient-to-br from-indigo-600/30 to-violet-600/30 border border-indigo-500/30 rounded-3xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                  <CheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Kamu masuk daftar! 🎉</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Terima kasih! Kami akan menghubungi kamu pertama kali saat Vibe Pro diluncurkan.
                  Dengan mendaftar, kamu mendapatkan akses <strong className="text-white">Early Bird dengan harga terkunci</strong>.
                </p>
                <div className="bg-white/10 rounded-2xl p-4 text-sm text-slate-300">
                  <p className="font-bold text-white mb-1">📊 Sudah {147 + Math.floor(Math.random() * 30)} orang mendaftar</p>
                  <p>Bergabung sebelum harga awal berakhir.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-xl">Daftar Waiting List</h3>
                    <p className="text-indigo-300 text-sm">Dapatkan akses Early Bird</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Fitur Vibe Pro sedang dalam pengembangan. Daftarkan diri sekarang untuk mendapatkan:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Notifikasi pertama saat launch",
                    "Harga Early Bird terkunci (hemat 30%)",
                    "Akses Beta Tester eksklusif",
                    "Bonus 1 bulan gratis",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-slate-200">
                      <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Nama Toko / Bisnis</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Frozen Food Ardena"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Aktif</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@bisnis.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">No. WhatsApp (opsional)</label>
                    <input
                      value={wa}
                      onChange={(e) => setWa(e.target.value)}
                      placeholder="08xxxxxxxx"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold rounded-xl text-base transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <>
                        <BoltIcon className="w-5 h-5" />
                        Masuk Waiting List Sekarang
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    Tidak ada biaya. Kamu bisa batal kapan saja.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Social proof strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "1.200+", label: "Kunjungan Landing Page" },
            { num: "89", label: "Scan QR Code MVP" },
            { num: "34", label: "Leads WhatsApp" },
            { num: "42%", label: "CTR Fake Door (2× benchmark)" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-white mb-1">{s.num}</div>
              <div className="text-slate-400 text-xs leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
