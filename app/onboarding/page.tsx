"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { publishVibe } from "@/actions/store";
import { LayoutMode } from "@prisma/client";
import {
  ArrowRightIcon, SparklesIcon, PaintBrushIcon,
  PlusIcon, CheckIcon, Bars3BottomLeftIcon, PhotoIcon,
  PlayIcon, ComputerDesktopIcon, DevicePhoneMobileIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

/* ── Layout Templates ── */
const LAYOUT_TEMPLATES = [
  {
    id: "ECOMMERCE",
    name: "F&B / E-Commerce",
    blocks: [
      { id: 1, type: "hero", text: "Store Banner" },
      { id: 2, type: "categories", text: "Filter Kategori" },
      { id: 3, type: "product-grid", text: "Produk Unggulan" },
    ],
    bgHex: "#fafaf9", btnHex: "#1a1714", textHex: "#1a1714",
  },
  {
    id: "SERVICE",
    name: "Services & Booking",
    blocks: [
      { id: 1, type: "profile", text: "Profil Profesional" },
      { id: 2, type: "portfolio", text: "Galeri Karya" },
      { id: 3, type: "pricing", text: "Paket Layanan" },
      { id: 4, type: "testimonials", text: "Testimoni Klien" },
    ],
    bgHex: "#f0f8ff", btnHex: "#0ea5e9", textHex: "#0c3047",
  },
  {
    id: "CAMPAIGN",
    name: "Flash Sale",
    blocks: [
      { id: 1, type: "headline", text: "DISKON BESAR!" },
      { id: 2, type: "countdown", text: "Berakhir dalam: 02:15:00" },
      { id: 3, type: "product-flash", text: "Produk Flash Sale" },
    ],
    bgHex: "#0f0f1a", btnHex: "#e11d48", textHex: "#ffffff",
  },
  {
    id: "BIO",
    name: "Link-in-Bio",
    blocks: [
      { id: 1, type: "avatar", text: "@username" },
      { id: 2, type: "bio", text: "Deskripsi singkat tentang saya." },
      { id: 3, type: "link", text: "Tautan Penting 1" },
      { id: 4, type: "link", text: "Tautan Penting 2" },
    ],
    bgHex: "#fff0f6", btnHex: "#e7609e", textHex: "#5a1a36",
  },
];

export default function VibeBuilderPage() {
  const [activeTab, setActiveTab] = useState<"layouts" | "custom">("layouts");
  const [selectedId, setSelectedId] = useState("ECOMMERCE");
  const [previewMode, setPreviewMode] = useState<"both" | "desktop" | "mobile">("both");

  // Publish Modal State
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeSlug, setStoreSlug] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  // Grab current layout
  const currentTpl = LAYOUT_TEMPLATES.find(t => t.id === selectedId) ?? LAYOUT_TEMPLATES[0];
  const [bgColor, setBgColor] = useState(currentTpl.bgHex);
  const [btnColor, setBtnColor] = useState(currentTpl.btnHex);
  const [textColor, setTextColor] = useState(currentTpl.textHex);
  const [blocks, setBlocks] = useState(currentTpl.blocks);

  const selectLayout = (tpl: typeof LAYOUT_TEMPLATES[0]) => {
    setSelectedId(tpl.id);
    setBgColor(tpl.bgHex);
    setBtnColor(tpl.btnHex);
    setTextColor(tpl.textHex);
    setBlocks(tpl.blocks);
  };

  const handlePublish = async () => {
    if (!storeName || !storeSlug) return;
    setIsPublishing(true);
    const themeConfig = JSON.stringify({ bgColor, btnColor, textColor, blocks });
    
    const res = await publishVibe({
      name: storeName,
      slug: storeSlug,
      layoutMode: selectedId as LayoutMode,
      themeConfig
    });

    setIsPublishing(false);
    if (res.error) {
      alert(res.error);
    } else {
      setShowPublishModal(false);
      router.push("/dashboard");
    }
  };

  const addBlock = (type: string) => {
    const text = type === "link" ? "New Link" : type === "video" ? "Featured Video" : "Gallery";
    setBlocks(b => [...b, { id: Date.now(), type, text }]);
  };

  const removeBlock = (id: number) => setBlocks(b => b.filter(x => x.id !== id));

  /* ── Shared live-preview content ── */
  const PreviewContent = ({ scale = 1 }: { scale?: number }) => (
    <div className="flex flex-col items-center w-full" style={{ padding: `${28 * scale}px ${16 * scale}px`, gap: `${6 * scale}px` }}>
      {blocks.map(block => {
        if (block.type === "header" || block.type === "headline") return (
          <p key={block.id} className="font-bold text-center" style={{ color: textColor, fontSize: (block.type === "headline" ? 20 : 13) * scale, marginBottom: 4 * scale }}>
            {block.text}
          </p>
        );
        if (block.type === "bio" || block.type === "countdown" || block.type === "scarcity") return (
           <p key={block.id} className="text-center" style={{ color: textColor, fontSize: 11 * scale, fontWeight: block.type === "scarcity" ? "bold" : "normal", marginBottom: 4 * scale }}>{block.text}</p>
        );
        if (block.type === "link" || block.type === "cta") return (
          <div key={block.id} className="w-full font-semibold text-center rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: btnColor, color: "white", fontSize: 12 * scale, padding: `${10 * scale}px ${14 * scale}px`, borderRadius: 12 * scale }}>
            {block.text}
          </div>
        );
        if (block.type === "video") return (
          <div key={block.id} className="w-full relative flex items-center justify-center overflow-hidden" style={{ aspectRatio: "16/9", backgroundColor: "#00000018", borderRadius: 10 * scale, marginBottom: 4 * scale }}>
            <PlayIcon style={{ width: 24 * scale, height: 24 * scale }} className="text-white/60" />
          </div>
        );
        if (block.type === "gallery" || block.type === "product-grid" || block.type === "portfolio") return (
          <div key={block.id} className="w-full grid grid-cols-2" style={{ gap: 6 * scale, marginBottom: 4 * scale }}>
            <div style={{ aspectRatio: "1", backgroundColor: "#00000009", borderRadius: 8 * scale, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{fontSize: 8*scale, color: textColor}}>Image</span></div>
            <div style={{ aspectRatio: "1", backgroundColor: "#00000009", borderRadius: 8 * scale, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{fontSize: 8*scale, color: textColor}}>Image</span></div>
          </div>
        );
        if (block.type === "avatar" || block.type === "profile") return (
          <div key={block.id} className="rounded-full flex items-center justify-center overflow-hidden shadow-lg mb-1" style={{ width: 56 * scale, height: 56 * scale, backgroundColor: btnColor + "33" }}>
            <Image src="/logo.png" alt="" width={36 * scale} height={36 * scale} className="rounded-full" />
          </div>
        );
        if (block.type === "categories" || block.type === "pricing" || block.type === "testimonials") return (
          <div key={block.id} className="w-full p-2 rounded-lg text-center" style={{ border: `1px solid ${btnColor}40`, color: textColor, fontSize: 10 * scale }}>
            {block.text} Placeholder
          </div>
        )
        if (block.type === "product-flash") return (
          <div key={block.id} className="w-full p-3 rounded-xl text-center shadow-md" style={{ background: btnColor, color: "white" }}>
            <p style={{fontSize: 14*scale, fontWeight: "bold"}}>Flash Product</p>
            <p style={{fontSize: 10*scale, textDecoration: "line-through"}}>Rp 100.000</p>
            <p style={{fontSize: 16*scale, fontWeight: "bold"}}>Rp 49.000</p>
            <button className="mt-2 px-3 py-1 bg-white text-black rounded-lg" style={{fontSize: 10*scale, fontWeight: "bold"}}>Beli Sekarang</button>
          </div>
        );
        if (block.type === "hero") return (
           <div key={block.id} className="w-full rounded-xl flex items-center justify-center font-bold" style={{aspectRatio: "2/1", background: `linear-gradient(45deg, ${btnColor}, ${btnColor}88)`, color: "white", fontSize: 16*scale}}>
             {block.text}
           </div>
        )
        return null;
      })}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--gray-100)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ────── LEFT PANEL ────── */}
      <aside
        className="flex flex-col h-full flex-shrink-0 overflow-hidden w-full lg:w-[400px]"
        style={{
          background: "var(--gray-0)",
          borderRight: "1px solid var(--gray-150)",
          boxShadow: "4px 0 24px -4px rgb(0 0 0 / 0.06)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--gray-150)" }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="ShopyVibe" width={30} height={30} className="rounded-lg" />
              <span style={{ fontSize: 16, fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.025em" }}>
                Create New Vibe
              </span>
            </div>
            <Link
              href="/vibes"
              className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-70"
              style={{ color: "var(--gray-400)" }}
            >
              <ChevronLeftIcon className="w-3.5 h-3.5" /> Vibes
            </Link>
          </div>
          {/* Tab switcher */}
          <div
            className="flex p-1 rounded-xl"
            style={{ background: "var(--gray-100)" }}
          >
            {(["layouts", "custom"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "7px 0",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  transition: "all 140ms",
                  background: activeTab === tab ? "white" : "transparent",
                  color: activeTab === tab ? "var(--brand-600)" : "var(--gray-500)",
                  boxShadow: activeTab === tab ? "var(--shadow-xs)" : "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tab === "layouts" ? "Layouts" : "Build from Scratch"}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ padding: "20px 24px" }}>
          {activeTab === "layouts" ? (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--gray-400)", marginBottom: 14, textTransform: "uppercase" }}>
                Pilih Layout Template
              </p>
              <div className="grid grid-cols-2" style={{ gap: 12 }}>
                {LAYOUT_TEMPLATES.map(tpl => (
                  <button
                    key={tpl.id}
                    onClick={() => selectLayout(tpl)}
                    className="relative overflow-hidden cursor-pointer text-left"
                    style={{
                      borderRadius: 14,
                      border: selectedId === tpl.id
                        ? "2.5px solid var(--brand-500)"
                        : "2px solid var(--gray-200)",
                      height: 110,
                      transition: "all 160ms",
                      outline: selectedId === tpl.id ? "3px solid var(--brand-100)" : "none",
                      background: "transparent",
                    }}
                  >
                    {/* Preview */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                      style={{ backgroundColor: tpl.bgHex, padding: "12px 10px" }}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: tpl.btnHex, opacity: 0.85 }} />
                      <div style={{ width: 60, height: 8, borderRadius: 6, backgroundColor: tpl.btnHex, opacity: 0.7 }} />
                      <div style={{ width: 44, height: 8, borderRadius: 6, backgroundColor: tpl.btnHex, opacity: 0.5 }} />
                    </div>
                    {/* Label */}
                    <div
                      className="absolute bottom-0 left-0 right-0 text-center py-1.5"
                      style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", fontSize: 11, fontWeight: 700, color: "#1a1714" }}
                    >
                      {tpl.name}
                    </div>
                    {/* Check */}
                    {selectedId === tpl.id && (
                      <div
                        className="absolute top-2 right-2 flex items-center justify-center"
                        style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--brand-500)" }}
                      >
                        <CheckIcon className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Colors */}
              <div>
                <p className="flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-700)", marginBottom: 12 }}>
                  <PaintBrushIcon className="w-4 h-4" style={{ color: "var(--brand-500)" }} /> Warna Tema
                </p>
                <div className="grid grid-cols-3" style={{ gap: 10 }}>
                  {[
                    { label: "Background", val: bgColor, set: setBgColor },
                    { label: "Button", val: btnColor, set: setBtnColor },
                    { label: "Teks", val: textColor, set: setTextColor },
                  ].map(c => (
                    <div key={c.label}>
                      <p style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 500, marginBottom: 4 }}>{c.label}</p>
                      <input type="color" value={c.val} onChange={e => c.set(e.target.value)}
                        className="w-full cursor-pointer rounded-lg border-none"
                        style={{ height: 40 }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Add blocks */}
              <div>
                <p className="flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-700)", marginBottom: 12 }}>
                  <SparklesIcon className="w-4 h-4" style={{ color: "var(--brand-500)" }} /> Tambah Blok
                </p>
                <div className="flex flex-wrap" style={{ gap: 8 }}>
                  {[
                    { type: "link", label: "Tautan", icon: <PlusIcon className="w-3.5 h-3.5" /> },
                    { type: "video", label: "Video", icon: <PlayIcon className="w-3.5 h-3.5" /> },
                    { type: "gallery", label: "Galeri", icon: <PhotoIcon className="w-3.5 h-3.5" /> },
                  ].map(b => (
                    <button
                      key={b.type}
                      onClick={() => addBlock(b.type)}
                      className="flex items-center gap-1.5"
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        background: "var(--gray-0)",
                        border: "1.5px solid var(--gray-200)",
                        color: "var(--gray-700)",
                        cursor: "pointer",
                        transition: "all 140ms",
                      }}
                    >
                      {b.icon} {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Block list */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-700)", marginBottom: 12 }}>
                  Susunan Halaman
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {blocks.map((block, i) => (
                    <div
                      key={block.id}
                      className="flex items-center gap-3"
                      style={{
                        background: "var(--gray-0)",
                        border: "1.5px solid var(--gray-150)",
                        borderRadius: 10,
                        padding: "10px 12px",
                        cursor: "grab",
                      }}
                    >
                      <Bars3BottomLeftIcon className="w-4 h-4 flex-shrink-0" style={{ color: "var(--gray-300)" }} />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 2 }}>
                          {block.type}
                        </p>
                        <input
                          value={block.text}
                          onChange={e => {
                            const nb = [...blocks];
                            nb[i].text = e.target.value;
                            setBlocks(nb);
                          }}
                          style={{ background: "transparent", border: "none", padding: 0, fontSize: 13, fontWeight: 500, color: "var(--gray-800)", width: "100%", outline: "none" }}
                        />
                      </div>
                      {block.type !== "header" && (
                        <button
                          onClick={() => removeBlock(block.id)}
                          style={{ color: "var(--gray-300)", fontSize: 18, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--gray-150)", background: "var(--gray-0)" }}>
          <button
            onClick={() => setShowPublishModal(true)}
            className="btn-brand w-full justify-center"
            style={{ fontSize: 14, padding: "13px 24px", borderRadius: 14 }}
          >
            <SparklesIcon className="w-4 h-4" />
            Simpan & Publish Vibe
            <ArrowRightIcon className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
          </button>

      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Publish Vibe</h2>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Bisnis</label>
              <input value={storeName} onChange={e => setStoreName(e.target.value)} className="w-full border rounded-lg p-2 text-sm" placeholder="Contoh: Kopi Kenangan" />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 mb-1">URL Vibe</label>
              <div className="flex items-center border rounded-lg px-2">
                <span className="text-gray-400 text-sm">shopyvibe.id/</span>
                <input value={storeSlug} onChange={e => setStoreSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="w-full p-2 outline-none text-sm" placeholder="kopi-kenangan" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowPublishModal(false)} className="flex-1 py-2 rounded-lg border text-sm font-semibold text-black">Batal</button>
              <button onClick={handlePublish} disabled={isPublishing || !storeName || !storeSlug} className="flex-1 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-50" style={{ background: "var(--brand-500)" }}>
                {isPublishing ? "Menyimpan..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </aside>

      {/* ────── RIGHT PREVIEW PANEL ────── */}
      <div className="flex-1 hidden lg:flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{
            height: 52,
            padding: "0 28px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--gray-150)",
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-500)", letterSpacing: "-0.01em" }}>
            <SparklesIcon className="w-4 h-4 inline-block mr-1.5 -mt-0.5" style={{ color: "var(--brand-500)" }} />
            Live Preview
          </p>
          {/* View toggle */}
          <div
            className="flex items-center p-1 rounded-xl"
            style={{ background: "var(--gray-100)", gap: 2 }}
          >
            {([
              { id: "desktop", label: "Desktop", icon: <ComputerDesktopIcon className="w-3.5 h-3.5" /> },
              { id: "both",    label: "Both",    icon: null },
              { id: "mobile",  label: "Mobile",  icon: <DevicePhoneMobileIcon className="w-3.5 h-3.5" /> },
            ] as const).map(m => (
              <button
                key={m.id}
                onClick={() => setPreviewMode(m.id)}
                className="flex items-center gap-1.5"
                style={{
                  padding: "5px 14px",
                  borderRadius: 9,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  background: previewMode === m.id ? "white" : "transparent",
                  color: previewMode === m.id ? "var(--brand-600)" : "var(--gray-500)",
                  boxShadow: previewMode === m.id ? "var(--shadow-xs)" : "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 140ms",
                }}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div
          className="flex-1 flex items-center justify-center gap-10 overflow-hidden"
          style={{ padding: 40 }}
        >
          {/* ─── Desktop Browser Mockup ─── */}
          {(previewMode === "desktop" || previewMode === "both") && (
            <div
              className="flex flex-col"
              style={{ width: previewMode === "both" ? "58%" : "70%", maxWidth: 680, flexShrink: 0 }}
            >
              {/* Browser chrome */}
              <div
                className="flex flex-col"
                style={{
                  background: "#e8e8ea",
                  borderRadius: "14px 14px 0 0",
                  padding: "10px 14px 0",
                  boxShadow: "0 -2px 0 #d2d2d4 inset",
                }}
              >
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.12)" }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.12)" }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.12)" }} />
                  {/* URL bar */}
                  <div
                    className="flex-1 flex items-center ml-2"
                    style={{
                      background: "rgba(255,255,255,0.72)",
                      borderRadius: 6,
                      height: 24,
                      padding: "0 10px",
                      gap: 6,
                    }}
                  >
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
                    <span style={{ fontSize: 11, color: "#555", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0" }}>
                      shopyvibe.id/myawesomevibe
                    </span>
                  </div>
                </div>
                {/* Tab bar */}
                <div
                  className="flex"
                  style={{ background: "#d0d0d2", borderRadius: "6px 6px 0 0", height: 28, alignItems: "center", padding: "0 6px", gap: 2 }}
                >
                  <div
                    className="flex items-center gap-1.5"
                    style={{
                      background: "white",
                      borderRadius: "6px 6px 0 0",
                      height: 24,
                      padding: "0 12px",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#333",
                      maxWidth: 160,
                    }}
                  >
                    <Image src="/logo.png" alt="" width={12} height={12} className="rounded-sm" />
                    My Awesome Vibe
                  </div>
                </div>
              </div>

              {/* Browser viewport — 16:10 aspect ratio */}
              <div
                className="overflow-hidden scrollbar-hide"
                style={{
                  background: bgColor,
                  aspectRatio: "16/10",
                  borderRadius: "0 0 10px 10px",
                  boxShadow: "0 20px 60px -8px rgba(0,0,0,0.18)",
                  overflow: "auto",
                }}
              >
                <PreviewContent scale={1.05} />
              </div>
              <p style={{ textAlign: "center", fontSize: 11, color: "var(--gray-400)", marginTop: 10, fontWeight: 500 }}>
                Desktop
              </p>
            </div>
          )}

          {/* ─── Phone Mockup ─── */}
          {(previewMode === "mobile" || previewMode === "both") && (
            <div className="flex flex-col items-center flex-shrink-0">
              {/* Outer frame — realistic proportions 9:19.5 */}
              <div
                style={{
                  width: 180,
                  aspectRatio: "9/19.5",
                  background: "linear-gradient(145deg, #2a2a2e, #1a1a1e)",
                  borderRadius: 38,
                  padding: "10px 8px",
                  boxShadow: "0 30px 80px -10px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {/* Side button */}
                <div style={{ position: "absolute", right: -3, top: "28%", width: 3, height: 40, background: "#3a3a3e", borderRadius: "0 2px 2px 0" }} />
                <div style={{ position: "absolute", left: -3, top: "22%", width: 3, height: 28, background: "#3a3a3e", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: "33%", width: 3, height: 28, background: "#3a3a3e", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: "44%", width: 3, height: 28, background: "#3a3a3e", borderRadius: "2px 0 0 2px" }} />

                {/* Screen bezel */}
                <div
                  className="flex-1 overflow-hidden scrollbar-hide"
                  style={{
                    background: bgColor,
                    borderRadius: 30,
                    position: "relative",
                    overflow: "hidden auto",
                  }}
                >
                  {/* Dynamic island */}
                  <div style={{
                    position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
                    width: 72, height: 22, background: "#0a0a0c",
                    borderRadius: 12, zIndex: 10,
                  }} />

                  <div style={{ paddingTop: 40 }}>
                    <PreviewContent scale={0.72} />
                  </div>
                </div>
              </div>
              <p style={{ textAlign: "center", fontSize: 11, color: "var(--gray-400)", marginTop: 12, fontWeight: 500 }}>
                Mobile
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
