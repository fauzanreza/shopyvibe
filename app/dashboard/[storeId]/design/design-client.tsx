"use client";

import { useState } from "react";
import Image from "next/image";
import { updateStoreTheme } from "@/actions/store";
import { Button } from "@/components/ui/button";
import { 
  PhotoIcon, SwatchIcon, IdentificationIcon, PlusIcon, TrashIcon, Squares2X2Icon,
  SparklesIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, PlayIcon, ArrowsRightLeftIcon, EyeSlashIcon, EyeIcon, LinkIcon, PencilIcon, XMarkIcon,
  ShoppingBagIcon, VideoCameraIcon, DocumentTextIcon, ChatBubbleBottomCenterTextIcon, QuestionMarkCircleIcon, CurrencyDollarIcon, ClockIcon, UserCircleIcon, ArrowTopRightOnSquareIcon, Bars3BottomLeftIcon, ArrowsUpDownIcon,
  EnvelopeIcon, MapPinIcon, UserGroupIcon, StarIcon, PaperAirplaneIcon, GlobeAltIcon
} from "@heroicons/react/24/outline";

const LAYOUT_TEMPLATES = [
  {
    id: "ECOMMERCE", name: "F&B / E-Commerce",
    navLinks: [ { id: 101, label: "Beranda", url: "#home" }, { id: 102, label: "Katalog", url: "#catalog" } ],
    blocks: [ { id: 1, type: "hero", text: "Store Banner", sectionId: 101 }, { id: 2, type: "categories", text: "Filter Kategori", sectionId: 102 }, { id: 3, type: "product-grid", text: "Produk Unggulan", sectionId: 102 } ],
    bgHex: "#fafaf9", btnHex: "#1a1714", textHex: "#1a1714",
  },
  {
    id: "SERVICE", name: "Services & Booking",
    navLinks: [ { id: 201, label: "Profil", url: "#profil" }, { id: 202, label: "Layanan", url: "#layanan" } ],
    blocks: [ { id: 1, type: "profile", text: "Profil Profesional", sectionId: 201 }, { id: 2, type: "portfolio", text: "Galeri Karya", sectionId: 201 }, { id: 3, type: "pricing", text: "Paket Layanan", sectionId: 202 }, { id: 4, type: "testimonials", text: "Testimoni Klien", sectionId: 202 } ],
    bgHex: "#f0f8ff", btnHex: "#0ea5e9", textHex: "#0c3047",
  },
  {
    id: "CAMPAIGN", name: "Flash Sale",
    navLinks: [ { id: 301, label: "Promo", url: "#promo" } ],
    blocks: [ { id: 1, type: "text", text: "DISKON BESAR!", sectionId: 301 }, { id: 2, type: "product-grid", text: "Produk Flash Sale", sectionId: 301 } ],
    bgHex: "#0f0f1a", btnHex: "#e11d48", textHex: "#ffffff",
  },
  {
    id: "BIO", name: "Link-in-Bio",
    navLinks: [ { id: 401, label: "Tautan", url: "#links" } ],
    blocks: [ { id: 1, type: "text", text: "Deskripsi", sectionId: 401 }, { id: 2, type: "link", text: "Tautan Penting 1", sectionId: 401 }, { id: 3, type: "link", text: "Tautan Penting 2", sectionId: 401 } ],
    bgHex: "#fff0f6", btnHex: "#e7609e", textHex: "#5a1a36",
  },
  {
    id: "PORTFOLIO", name: "Creative Portfolio",
    navLinks: [ { id: 501, label: "Karya", url: "#work" }, { id: 502, label: "Tentang", url: "#about" } ],
    blocks: [ { id: 1, type: "hero", text: "Showcase Your Work", sectionId: 501 }, { id: 2, type: "gallery", text: "Project Gallery", sectionId: 501 }, { id: 3, type: "text", text: "About Me", sectionId: 502 } ],
    bgHex: "#18181b", btnHex: "#a855f7", textHex: "#f4f4f5",
  },
  {
    id: "EVENT", name: "Event / Webinar",
    navLinks: [ { id: 601, label: "Detail", url: "#detail" }, { id: 602, label: "Daftar", url: "#register" } ],
    blocks: [ { id: 1, type: "hero", text: "Event Title", sectionId: 601 }, { id: 2, type: "text", text: "Date & Location", sectionId: 601 }, { id: 3, type: "link", text: "Register Now", sectionId: 602 } ],
    bgHex: "#fdf4ff", btnHex: "#d946ef", textHex: "#4a044e",
  },
  {
    id: "RESTAURANT", name: "Digital Menu",
    navLinks: [ { id: 701, label: "Beranda", url: "#home" }, { id: 702, label: "Menu", url: "#menu" } ],
    blocks: [ { id: 1, type: "hero", text: "Restaurant Name", sectionId: 701 }, { id: 2, type: "categories", text: "Food Categories", sectionId: 702 }, { id: 3, type: "product-grid", text: "Featured Dishes", sectionId: 702 } ],
    bgHex: "#fffbeb", btnHex: "#d97706", textHex: "#78350f",
  },
  {
    id: "NONPROFIT", name: "Fundraising",
    navLinks: [ { id: 801, label: "Misi", url: "#mission" } ],
    blocks: [ { id: 1, type: "hero", text: "Campaign Mission", sectionId: 801 }, { id: 2, type: "link", text: "Donate Here", sectionId: 801 } ],
    bgHex: "#f0fdf4", btnHex: "#16a34a", textHex: "#14532d",
  },
  {
    id: "REALESTATE", name: "Real Estate",
    navLinks: [ { id: 901, label: "Properti", url: "#property" } ],
    blocks: [ { id: 1, type: "hero", text: "Featured Property", sectionId: 901 }, { id: 2, type: "gallery", text: "Property Photos", sectionId: 901 }, { id: 3, type: "faq", text: "Specifications", sectionId: 901 } ],
    bgHex: "#f8fafc", btnHex: "#334155", textHex: "#0f172a",
  }
];

export function DesignClient({ store }: { store: any }) {
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(store.logo || "");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  
  const defaultTheme = {
    bgColor: "#ffffff",
    bgImage: "",
    btnColor: "#4f46e5",
    textColor: "#0f172a",
    navLinks: [
      { id: 1, label: "Beranda", url: "#home" },
      { id: 2, label: "Katalog", url: "#catalog" }
    ] as any[],
    blocks: [
      { id: Date.now(), type: "hero", text: "Store Banner" }
    ] as any[]
  };

  let initialTheme = { ...defaultTheme };
  if (store.themeConfig) {
    try {
      const parsed = JSON.parse(store.themeConfig);
      if (parsed.bgColor) initialTheme.bgColor = parsed.bgColor;
      if (parsed.bgImage) initialTheme.bgImage = parsed.bgImage;
      if (parsed.btnColor) initialTheme.btnColor = parsed.btnColor;
      if (parsed.textColor) initialTheme.textColor = parsed.textColor;
      if (parsed.navLinks) initialTheme.navLinks = parsed.navLinks;
      if (parsed.blocks) initialTheme.blocks = parsed.blocks;
    } catch(e) {}
  }

  const [theme, setTheme] = useState(initialTheme);
  const [navLinks, setNavLinks] = useState<any[]>(initialTheme.navLinks);
  const [blocks, setBlocks] = useState<any[]>(initialTheme.blocks);
  const [layoutMode, setLayoutMode] = useState(store.layoutMode);
  
  const [previewMode, setPreviewMode] = useState<"desktop" | "both" | "mobile">("both");
  const [panelWidth, setPanelWidth] = useState(480);
  const [showPreview, setShowPreview] = useState(true);
  const [showTemplateList, setShowTemplateList] = useState(false);

  // Modal State
  const [editingBlockId, setEditingBlockId] = useState<number | null>(null);
  const [addingBlockTo, setAddingBlockTo] = useState<number | null>(null);
  const [uploadingBlockImage, setUploadingBlockImage] = useState(false);
  const [uploadingBgImage, setUploadingBgImage] = useState(false);

  const handleDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panelWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(320, Math.min(startWidth + (moveEvent.clientX - startX), 800));
      setPanelWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleTemplateSelect = (templateId: string) => {
    if (templateId === "CUSTOM") {
      setLayoutMode("CUSTOM");
      setShowTemplateList(false);
      return;
    }

    const tpl = LAYOUT_TEMPLATES.find(t => t.id === templateId);
    if (!tpl) return;
    
    setLayoutMode(tpl.id);
    setTheme({
      bgColor: tpl.bgHex,
      bgImage: "",
      btnColor: tpl.btnHex,
      textColor: tpl.textHex,
      blocks: tpl.blocks,
      navLinks: tpl.navLinks
    });
    setNavLinks(tpl.navLinks ? [...tpl.navLinks] : []);
    setBlocks(tpl.blocks.map(b => ({ ...b, id: Date.now() + Math.random() })));
  };

  const handleMediaUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    return res.json();
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const data = await handleMediaUpload(file);
      if (data.url) setLogoUrl(data.url);
      else alert(data.error || "Gagal upload logo");
    } catch (e) {
      alert("Error uploading file");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleBgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBgImage(true);
    try {
      const data = await handleMediaUpload(file);
      if (data.url) setTheme({ ...theme, bgImage: data.url });
      else alert(data.error || "Gagal upload background");
    } catch (e) {
      alert("Error uploading file");
    } finally {
      setUploadingBgImage(false);
    }
  };

  const handleBlockImageUpload = async (blockId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingBlockImage(true);
    try {
      if (files.length === 1) {
        const data = await handleMediaUpload(files[0]);
        if (data.url) {
          setBlocks(blocks.map(b => b.id === blockId ? { ...b, imageUrl: data.url, imageUrls: [...(b.imageUrls || []), data.url] } : b));
        } else {
          alert(data.error || "Gagal upload gambar");
        }
      } else {
        const urls = [];
        for (const file of files) {
          const data = await handleMediaUpload(file);
          if (data.url) urls.push(data.url);
        }
        setBlocks(blocks.map(b => b.id === blockId ? { ...b, imageUrls: [...(b.imageUrls || []), ...urls], imageUrl: (b.imageUrl || urls[0]) } : b));
      }
    } catch (e) {
      alert("Error uploading file");
    } finally {
      setUploadingBlockImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("layoutMode", layoutMode);
    formData.append("logo", logoUrl);
    formData.append("themeConfig", JSON.stringify({
      bgColor: theme.bgColor,
      bgImage: theme.bgImage,
      btnColor: theme.btnColor,
      textColor: theme.textColor,
      navLinks: navLinks,
      blocks: blocks
    }));

    const res = await updateStoreTheme(formData);
    setLoading(false);

    if (res?.error) {
      alert(res.error);
    } else {
      alert("Desain berhasil disimpan!");
    }
  };

  const addBlock = (type: string, text: string, sectionId?: number) => {
    setBlocks([...blocks, { id: Date.now(), type, text, sectionId }]);
    setAddingBlockTo(null);
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlock = (id: number, key: string, value: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [key]: value } : b));
  };

  const removeGalleryImage = (blockId: number, idx: number) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      const current: string[] = b.imageUrls && b.imageUrls.length > 0 ? b.imageUrls : (b.imageUrl ? [b.imageUrl] : []);
      const newUrls = current.filter((_: string, i: number) => i !== idx);
      return { ...b, imageUrls: newUrls, imageUrl: newUrls[0] || "" };
    }));
  };

  const moveGalleryImage = (blockId: number, fromIdx: number, toIdx: number) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      const current: string[] = b.imageUrls && b.imageUrls.length > 0 ? b.imageUrls : (b.imageUrl ? [b.imageUrl] : []);
      const newUrls = [...current];
      const [moved] = newUrls.splice(fromIdx, 1);
      newUrls.splice(toIdx, 0, moved);
      return { ...b, imageUrls: newUrls, imageUrl: newUrls[0] || "" };
    }));
  };

  const addNavLink = () => {
    setNavLinks([...navLinks, { id: Date.now(), label: "Menu Baru", url: "#" }]);
  };

  const removeNavLink = (id: number) => {
    setNavLinks(navLinks.filter(l => l.id !== id));
  };

  const updateNavLink = (id: number, key: string, value: string) => {
    setNavLinks(navLinks.map(l => l.id === id ? { ...l, [key]: value } : b));
  };

  const editingBlock = blocks.find(b => b.id === editingBlockId);

  const PreviewContent = ({ scale = 1 }: { scale?: number }) => (
    <div className="flex flex-col items-center w-full" style={{ padding: `${28 * scale}px ${16 * scale}px`, gap: `${6 * scale}px` }}>
      {blocks.map(block => {
        if (block.type === "header" || block.type === "headline") return (
          <p key={block.id} className="font-bold text-center" style={{ color: theme.textColor, fontSize: (block.type === "headline" ? 20 : 13) * scale, marginBottom: 4 * scale }}>
            {block.text}
          </p>
        );
        if (block.type === "bio" || block.type === "countdown" || block.type === "scarcity") return (
           <p key={block.id} className="text-center" style={{ color: theme.textColor, fontSize: 11 * scale, fontWeight: block.type === "scarcity" ? "bold" : "normal", marginBottom: 4 * scale }}>{block.text}</p>
        );
        if (block.type === "link" || block.type === "cta") return (
          <div key={block.id} className="w-full font-semibold text-center rounded-xl transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: theme.btnColor, color: "white", fontSize: 12 * scale, padding: `${10 * scale}px ${14 * scale}px`, borderRadius: 12 * scale }}>
            {block.text}
          </div>
        );
        if (block.type === "video") return (
          <div key={block.id} className="w-full relative flex items-center justify-center overflow-hidden bg-slate-800" style={{ aspectRatio: "16/9", borderRadius: 10 * scale, marginBottom: 4 * scale }}>
            {block.url ? (
              <span style={{color: "white", fontSize: 10*scale}}>Video URL: {block.url}</span>
            ) : (
              <PlayIcon style={{ width: 24 * scale, height: 24 * scale }} className="text-white/60" />
            )}
          </div>
        );
        if (block.type === "text") return (
           <p key={block.id} className="text-center" style={{ color: theme.textColor, fontSize: 12 * scale, marginBottom: 4 * scale }}>{block.text}</p>
        );
        if (block.type === "spacer") return (
           <div key={block.id} style={{ height: 24 * scale, width: "100%" }}></div>
        );
        if (block.type === "faq") return (
           <div key={block.id} className="w-full p-3 rounded-lg text-left" style={{ border: `1px solid ${theme.btnColor}40`, color: theme.textColor, fontSize: 11 * scale }}>
              <div className="font-bold flex justify-between">{block.text} <span>+</span></div>
           </div>
        );
        if (block.type === "gallery" || block.type === "portfolio") {
           const images = block.imageUrls && block.imageUrls.length > 0 ? block.imageUrls : (block.imageUrl ? [block.imageUrl] : []);
           return (
             <div key={block.id} className="w-full grid grid-cols-2" style={{ gap: 6 * scale, marginBottom: 4 * scale }}>
               {images.length > 0 ? images.map((url: string, idx: number) => (
                  <img key={idx} src={url} alt="" className="w-full object-cover rounded-lg" style={{aspectRatio: "1", borderRadius: 8*scale}}/>
               )) : (
                 <>
                   <div style={{ aspectRatio: "1", backgroundColor: "#00000009", borderRadius: 8 * scale, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{fontSize: 8*scale, color: theme.textColor}}>Image 1</span></div>
                   <div style={{ aspectRatio: "1", backgroundColor: "#00000009", borderRadius: 8 * scale, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{fontSize: 8*scale, color: theme.textColor}}>Image 2</span></div>
                 </>
               )}
             </div>
           );
        }
        if (block.type === "product-grid") return (
           <div key={block.id} className="w-full grid grid-cols-2" style={{ gap: 6 * scale, marginBottom: 8 * scale }}>
             {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden group relative flex flex-col" style={{ borderRadius: 8*scale }}>
                  <div style={{ aspectRatio: "1", backgroundColor: "#00000009", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{fontSize: 8*scale, color: theme.textColor}}>Image</span></div>
                  <div className="p-2 flex flex-col" style={{ padding: 6*scale }}>
                    <span style={{ fontSize: 9*scale, fontWeight: "bold", color: theme.textColor }}>Product Name</span>
                    <span style={{ fontSize: 8*scale, color: theme.btnColor, fontWeight: "bold" }}>Rp 99.000</span>
                    <div style={{ fontSize: 7*scale, color: "#f59e0b", marginTop: 2*scale }}>★ 4.9 (120)</div>
                    <div className="mt-2 text-center rounded-md text-white font-bold" style={{ backgroundColor: theme.btnColor, fontSize: 8*scale, padding: `${4*scale}px 0`, marginTop: 6*scale }}>+ Cart</div>
                  </div>
                </div>
             ))}
           </div>
        );
        if (block.type === "avatar" || block.type === "profile") return (
          <div key={block.id} className="rounded-full flex items-center justify-center overflow-hidden shadow-lg mb-1" style={{ width: 56 * scale, height: 56 * scale, backgroundColor: theme.btnColor + "33" }}>
            {logoUrl ? <img src={logoUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 font-bold">L</div>}
          </div>
        );
        if (block.type === "categories" || block.type === "pricing" || block.type === "testimonials") return (
          <div key={block.id} className="w-full p-2 rounded-lg text-center" style={{ border: `1px solid ${theme.btnColor}40`, color: theme.textColor, fontSize: 10 * scale }}>
            {block.text} {block.categories && `(${block.categories})`}
          </div>
        )
        if (block.type === "product-flash") return (
          <div key={block.id} className="w-full p-3 rounded-xl text-center shadow-md" style={{ background: theme.btnColor, color: "white" }}>
            <p style={{fontSize: 14*scale, fontWeight: "bold"}}>Flash Product</p>
            <p style={{fontSize: 10*scale, textDecoration: "line-through"}}>Rp 100.000</p>
            <p style={{fontSize: 16*scale, fontWeight: "bold"}}>Rp 49.000</p>
            <button className="mt-2 px-3 py-1 bg-white text-black rounded-lg" style={{fontSize: 10*scale, fontWeight: "bold"}}>Beli Sekarang</button>
          </div>
        );
        if (block.type === "hero") return (
           <div key={block.id} className="w-full rounded-xl flex items-center justify-center font-bold relative overflow-hidden" style={{aspectRatio: "2/1", background: `linear-gradient(45deg, ${theme.btnColor}, ${theme.btnColor}88)`, color: "white", fontSize: 16*scale}}>
             {block.imageUrl && <img src={block.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />}
             <span className="relative z-10">{block.text}</span>
           </div>
        )
        if (block.type === "newsletter") return (
           <div key={block.id} className="w-full p-4 rounded-xl text-center bg-indigo-50 border border-indigo-100" style={{ marginBottom: 4*scale }}>
             <p style={{fontSize: 12*scale, fontWeight: "bold", color: theme.textColor}}>{block.text}</p>
             <div className="flex gap-2 mt-2">
                <div className="flex-1 bg-white border border-slate-200 rounded-md" style={{padding: 4*scale, fontSize: 10*scale}}>Email...</div>
                <div className="bg-indigo-600 text-white font-bold rounded-md flex items-center justify-center" style={{padding: `0 ${8*scale}px`, fontSize: 10*scale}}>Kirim</div>
             </div>
           </div>
        )
        if (block.type === "contact") return (
           <div key={block.id} className="w-full p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left" style={{ marginBottom: 4*scale }}>
             <p style={{fontSize: 12*scale, fontWeight: "bold", color: theme.textColor}}>{block.text}</p>
             <div className="space-y-2 mt-2">
                <div className="w-full bg-slate-50 border border-slate-200 rounded-md" style={{padding: 4*scale, fontSize: 10*scale}}>Nama Lengkap</div>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-md h-12" style={{padding: 4*scale, fontSize: 10*scale}}>Pesan</div>
             </div>
           </div>
        )
        if (block.type === "team") return (
           <div key={block.id} className="w-full grid grid-cols-3 gap-2" style={{ marginBottom: 4*scale }}>
             {[1,2,3].map(i => (
                <div key={i} className="flex flex-col items-center text-center">
                   <div className="w-8 h-8 rounded-full bg-slate-200 mb-1"></div>
                   <span style={{fontSize: 7*scale, fontWeight: "bold"}}>Nama {i}</span>
                   <span style={{fontSize: 6*scale, opacity: 0.7}}>Posisi</span>
                </div>
             ))}
           </div>
        )
        if (block.type === "brands") return (
           <div key={block.id} className="w-full flex justify-between items-center px-2 py-4 border-y border-slate-100 opacity-60 grayscale" style={{ marginBottom: 4*scale }}>
             <div className="w-10 h-4 bg-slate-300 rounded"></div>
             <div className="w-10 h-4 bg-slate-300 rounded"></div>
             <div className="w-10 h-4 bg-slate-300 rounded"></div>
           </div>
        )
        if (block.type === "map") return (
           <div key={block.id} className="w-full bg-slate-200 rounded-xl overflow-hidden relative" style={{ aspectRatio: "2/1", marginBottom: 4*scale }}>
              {block.mapUrl ? (
                 <iframe src={block.mapUrl} className="absolute inset-0 w-full h-full border-0" allowFullScreen loading="lazy"></iframe>
              ) : (
                 <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-500">
                   <MapPinIcon style={{ width: 24*scale, height: 24*scale }} />
                   <span style={{ fontSize: 9*scale, marginTop: 4*scale }}>Peta Belum Diatur</span>
                 </div>
              )}
           </div>
        )
        if (block.type === "social") return (
           <div key={block.id} className="w-full flex justify-center gap-3 py-2" style={{ marginBottom: 4*scale }}>
              {block.instagram && <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">ig</div>}
              {block.whatsapp && <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">wa</div>}
              {block.tiktok && <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">tt</div>}
              {block.twitter && <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">tw</div>}
              {!block.instagram && !block.whatsapp && !block.tiktok && !block.twitter && (
                 <span style={{fontSize: 8*scale, opacity: 0.5}}>Tautan Sosial Media</span>
              )}
           </div>
        )
        return null;
      })}
    </div>
  );

  return (
    <>
      <div className="flex h-[calc(100vh-2rem)] overflow-hidden bg-slate-100 rounded-3xl border border-slate-200 shadow-sm relative">
        {/* ────── LEFT PANEL (EDITOR) ────── */}
        <aside className={`h-full flex flex-col bg-white border-r border-slate-200 z-10 ${showPreview ? "hidden lg:flex" : "flex-1"}`} style={{ width: showPreview ? panelWidth : "100%", flexShrink: 0 }}>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-800">Desain Tema</h2>
                <button type="button" onClick={() => setShowPreview(!showPreview)} className="lg:flex hidden items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                  {showPreview ? <EyeSlashIcon className="w-4 h-4"/> : <EyeIcon className="w-4 h-4"/>} 
                  {showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
                </button>
              </div>
              <Button type="submit" disabled={loading} className="bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700">
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Upload Logo */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><PhotoIcon className="w-5 h-5" /></div>
                   <h3 className="font-bold text-sm text-slate-800">Media Utama (Logo)</h3>
                </div>
                <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                   <div className="w-16 h-16 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm relative">
                      {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <PhotoIcon className="w-6 h-6 text-slate-300" />}
                   </div>
                   <div className="flex-1 relative">
                      <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploadingLogo} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Button type="button" variant="outline" disabled={uploadingLogo} className="w-full text-xs font-bold border-slate-200">
                         {uploadingLogo ? "Mengunggah..." : "Ganti Logo"}
                      </Button>
                   </div>
                </div>
              </div>

              {/* Layout Mode */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><IdentificationIcon className="w-5 h-5" /></div>
                      <h3 className="font-bold text-sm text-slate-800">Mode Layout Template</h3>
                   </div>
                </div>
                
                {showTemplateList ? (
                  <div className="grid grid-cols-2 gap-2">
                    {LAYOUT_TEMPLATES.map(tpl => (
                      <label key={tpl.id} className={`flex flex-col gap-1 p-3 rounded-xl border cursor-pointer transition-colors ${layoutMode === tpl.id ? "border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600" : "border-slate-200 hover:bg-slate-50"}`}>
                          <div className="flex items-center gap-2">
                            <input type="radio" name="layoutMode" value={tpl.id} checked={layoutMode === tpl.id} onChange={() => handleTemplateSelect(tpl.id)} className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="font-bold text-[11px] text-slate-800 uppercase">{tpl.name}</span>
                          </div>
                          <div className="flex gap-1 mt-1 pl-5">
                            <div className="w-3 h-3 rounded-full" style={{background: tpl.bgHex, border: '1px solid #ccc'}}></div>
                            <div className="w-3 h-3 rounded-full" style={{background: tpl.btnHex}}></div>
                            <div className="w-3 h-3 rounded-full" style={{background: tpl.textHex}}></div>
                          </div>
                      </label>
                    ))}
                    <label className={`flex flex-col gap-1 p-3 rounded-xl border cursor-pointer transition-colors ${layoutMode === "CUSTOM" ? "border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600" : "border-slate-200 hover:bg-slate-50"}`}>
                        <div className="flex items-center gap-2">
                          <input type="radio" name="layoutMode" value="CUSTOM" checked={layoutMode === "CUSTOM"} onChange={() => handleTemplateSelect("CUSTOM")} className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="font-bold text-[11px] text-slate-800 uppercase">Blank / Custom</span>
                        </div>
                        <div className="text-[10px] text-slate-400 pl-5 mt-1">Mulai dari kanvas kosong.</div>
                    </label>
                  </div>
                ) : (
                  <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">Mode: Custom / Blank</span>
                    <button type="button" onClick={() => setShowTemplateList(true)} className="text-xs font-bold text-indigo-600 hover:underline">Choose Template</button>
                  </div>
                )}
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><SwatchIcon className="w-5 h-5" /></div>
                      <h3 className="font-bold text-sm text-slate-800">Kustomisasi Background & Warna</h3>
                   </div>
                </div>

                {/* Upload Background */}
                <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                   <div className="w-16 h-16 rounded-xl border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm relative">
                      {theme.bgImage ? <img src={theme.bgImage} alt="Background" className="w-full h-full object-cover" /> : <PhotoIcon className="w-6 h-6 text-slate-300" />}
                   </div>
                   <div className="flex-1 relative">
                      <input type="file" accept="image/*" onChange={handleBgImageUpload} disabled={uploadingBgImage} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Button type="button" variant="outline" disabled={uploadingBgImage} className="w-full text-xs font-bold border-slate-200">
                         {uploadingBgImage ? "Mengunggah..." : (theme.bgImage ? "Ganti Background Image" : "Upload Background Image")}
                      </Button>
                      {theme.bgImage && (
                        <button type="button" onClick={() => setTheme({...theme, bgImage: ""})} className="mt-2 text-[10px] font-bold text-red-500 hover:underline text-center w-full block">
                           Hapus Gambar Background
                        </button>
                      )}
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                   <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Warna Latar</label>
                      <input type="color" value={theme.bgColor} onChange={(e) => setTheme({...theme, bgColor: e.target.value})} className="w-full h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                   </div>
                   <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Aksen / Tombol</label>
                      <input type="color" value={theme.btnColor} onChange={(e) => setTheme({...theme, btnColor: e.target.value})} className="w-full h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                   </div>
                   <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Teks</label>
                      <input type="color" value={theme.textColor} onChange={(e) => setTheme({...theme, textColor: e.target.value})} className="w-full h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                   </div>
                </div>
              </div>

              {/* Navigasi */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><LinkIcon className="w-5 h-5" /></div>
                   <h3 className="font-bold text-sm text-slate-800">Menu Navigasi (Header)</h3>
                </div>
                
                 <div className="space-y-4">
                  {navLinks.map((link, i) => (
                    <div key={link.id} className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl group transition-colors">
                       <div className="flex items-center gap-3">
                         <div className="text-[10px] font-bold text-slate-400 w-3">{i + 1}</div>
                         <div className="flex-1 grid grid-cols-2 gap-2">
                            <input value={link.label} onChange={e => {
                              const newLinks = [...navLinks];
                              newLinks[i].label = e.target.value;
                              setNavLinks(newLinks);
                            }} className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500" placeholder="Label Menu" />
                            <input value={link.url} onChange={e => {
                              const newLinks = [...navLinks];
                              newLinks[i].url = e.target.value;
                              setNavLinks(newLinks);
                            }} className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 outline-none focus:border-indigo-500" placeholder="URL (#id atau https://)" />
                         </div>
                         <button type="button" onClick={() => removeNavLink(link.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1.5">
                            <TrashIcon className="w-4 h-4" />
                         </button>
                       </div>
                       
                       {/* Nested Blocks for this NavLink */}
                       <div className="pl-4 pt-2 border-t border-slate-200 mt-2">
                          <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase">Blok di dalam {link.label}</p>
                          <div className="space-y-2 mb-3">
                            {blocks.filter(b => b.sectionId === link.id).map((block, j) => (
                              <div key={block.id} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl group hover:border-indigo-300 transition-colors shadow-sm">
                                 <div className="text-[10px] font-bold text-slate-400 w-3">{j + 1}</div>
                                 <div className="flex-1">
                                    <input value={block.text} onChange={e => updateBlock(block.id, "text", e.target.value)} className="bg-transparent border-none p-0 text-sm font-bold text-slate-800 w-full outline-none focus:ring-0" placeholder="Label Blok" />
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{block.type}</div>
                                 </div>
                                 <div className="flex items-center gap-1">
                                    <button type="button" onClick={() => setEditingBlockId(block.id)} className="flex items-center gap-1 px-2 py-1.5 bg-indigo-50 text-indigo-600 rounded-md text-xs font-bold hover:bg-indigo-100 transition-colors">
                                       <PencilIcon className="w-3.5 h-3.5" /> Set Content
                                    </button>
                                    <button type="button" onClick={() => removeBlock(block.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors">
                                       <TrashIcon className="w-5 h-5" />
                                    </button>
                                 </div>
                              </div>
                            ))}
                          </div>
                          
                          <Button type="button" variant="outline" onClick={() => setAddingBlockTo(link.id)} className="w-full text-xs font-bold border-dashed border-2 border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300">
                             <PlusIcon className="w-4 h-4 mr-1" /> Tambah Blok ke Menu Ini
                          </Button>
                       </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addNavLink} className="w-full text-xs font-bold border-dashed border-2 border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300">
                    <PlusIcon className="w-4 h-4 mr-1" /> Tambah Menu Navigasi & Halaman
                  </Button>
                </div>
              </div>

            </div>
          </form>
        </aside>

        {/* DRAG HANDLE */}
        {showPreview && (
          <div 
            onMouseDown={handleDrag}
            className="hidden lg:flex w-2 bg-slate-200 hover:bg-indigo-400 cursor-col-resize items-center justify-center z-20 transition-colors"
          >
            <ArrowsRightLeftIcon className="w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
        )}

        {/* ────── RIGHT PREVIEW PANEL ────── */}
        {showPreview && (
          <main className="flex-1 hidden lg:flex flex-col overflow-hidden bg-slate-100">
          {/* Toolbar */}
          <div className="h-14 flex items-center justify-between px-6 bg-white/80 backdrop-blur-sm border-b border-slate-200">
            <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-indigo-500" /> Live Preview
            </p>
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setPreviewMode("desktop")} className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${previewMode === "desktop" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}>
                 <ComputerDesktopIcon className="w-4 h-4" /> Desktop
               </button>
               <button onClick={() => setPreviewMode("both")} className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${previewMode === "both" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}>
                 Both
               </button>
               <button onClick={() => setPreviewMode("mobile")} className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${previewMode === "mobile" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}>
                 <DevicePhoneMobileIcon className="w-4 h-4" /> Mobile
               </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center gap-10 overflow-hidden p-10">
            {/* Desktop Mockup */}
            {(previewMode === "desktop" || previewMode === "both") && (
              <div className="flex flex-col" style={{ width: previewMode === "both" ? "58%" : "70%", maxWidth: 680, flexShrink: 0 }}>
                <div className="flex flex-col bg-slate-200 rounded-t-xl pt-3 px-3 shadow-[0_-2px_0_#d2d2d4_inset]">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <div className="flex-1 flex items-center ml-2 bg-white/70 rounded-md h-6 px-3 gap-2">
                      <span className="text-[10px] text-slate-500 font-mono tracking-tighter">shopyvibe.id/{store.slug}</span>
                    </div>
                  </div>
                </div>
                <div className="overflow-auto scrollbar-hide aspect-[16/10] rounded-b-xl shadow-2xl relative" style={{ backgroundColor: theme.bgColor }}>
                  {theme.bgImage && <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${theme.bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />}
                  <div className="relative z-10">
                    <PreviewContent scale={1.05} />
                  </div>
                </div>
                <p className="text-center text-xs text-slate-400 mt-3 font-bold">Desktop</p>
              </div>
            )}

            {/* Mobile Mockup */}
            {(previewMode === "mobile" || previewMode === "both") && (
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-[180px] aspect-[9/19.5] bg-slate-900 rounded-[38px] p-2.5 shadow-2xl relative flex flex-col">
                  <div className="absolute left-1/2 -translate-x-1/2 top-4 w-[60px] h-[18px] bg-black rounded-full z-10" />
                  <div className="flex-1 overflow-auto scrollbar-hide rounded-[30px] relative" style={{ backgroundColor: theme.bgColor }}>
                  {theme.bgImage && <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${theme.bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />}
                  <div className="pt-8 relative z-10">
                    <PreviewContent scale={0.72} />
                  </div>
                </div>
                </div>
                <p className="text-center text-xs text-slate-400 mt-3 font-bold">Mobile</p>
              </div>
            )}
          </div>
        </main>
        )}
      </div>

      {/* ────── SET CONTENT MODAL ────── */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
               <div>
                  <h3 className="font-bold text-slate-800">Atur Konten Blok</h3>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{editingBlock.type}</p>
               </div>
               <button onClick={() => setEditingBlockId(null)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-xl transition-colors">
                  <XMarkIcon className="w-5 h-5" />
               </button>
            </div>
            
             <div className="p-6 space-y-5">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    {editingBlock.type === "map" ? "Judul Peta (opsional)" :
                     editingBlock.type === "contact" ? "Judul Formulir Kontak" :
                     editingBlock.type === "newsletter" ? "Headline Newsletter" :
                     editingBlock.type === "team" ? "Judul Bagian (Contoh: Tim Kami)" :
                     editingBlock.type === "brands" ? "Judul Bagian (Contoh: Klien Kami)" :
                     editingBlock.type === "social" ? "Teks Ajakan (Contoh: Follow Us)" :
                     "Teks Utama / Headline Blok"}
                  </label>
                  <input type="text" value={editingBlock.text} onChange={e => updateBlock(editingBlock.id, "text", e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" placeholder="Ketikkan teks di sini..." />
               </div>

               {["hero", "avatar", "profile", "team"].includes(editingBlock.type) && (
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">
                      {editingBlock.type === "team" ? "Gambar / Foto Ilustrasi Tim" : "Gambar Utama"}
                    </label>
                    <div className="flex items-center gap-4 p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50">
                       {editingBlock.imageUrl ? (
                         <img src={editingBlock.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                       ) : (
                         <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center">
                           <PhotoIcon className="w-6 h-6 text-slate-400" />
                         </div>
                       )}
                       <div className="flex-1 relative">
                         <input type="file" accept="image/*" onChange={(e) => handleBlockImageUpload(editingBlock.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                         <Button type="button" variant="outline" className="w-full text-xs border-slate-200" disabled={uploadingBlockImage}>
                            {uploadingBlockImage ? "Mengunggah..." : (editingBlock.imageUrl ? "Ganti Gambar" : "Upload Gambar")}
                         </Button>
                       </div>
                    </div>
                 </div>
               )}

               {["gallery", "portfolio"].includes(editingBlock.type) && (() => {
                 const imgs: string[] = editingBlock.imageUrls && editingBlock.imageUrls.length > 0 ? editingBlock.imageUrls : (editingBlock.imageUrl ? [editingBlock.imageUrl] : []);
                 return (
                   <div className="space-y-3">
                     <label className="text-xs font-bold text-slate-700">Kelola Gambar Galeri ({imgs.length} foto)</label>
                     {imgs.length > 0 && (
                       <div className="space-y-2">
                         {imgs.map((url: string, idx: number) => (
                           <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                             <img src={url} className="w-12 h-12 object-cover rounded-lg flex-shrink-0 border border-slate-200" />
                             <span className="text-[10px] text-slate-400 font-bold flex-shrink-0">#{idx + 1}</span>
                             <div className="flex-1 flex justify-end gap-1">
                               <button
                                 onClick={() => idx > 0 && moveGalleryImage(editingBlock.id, idx, idx - 1)}
                                 disabled={idx === 0}
                                 className="w-6 h-6 bg-slate-200 text-slate-600 rounded flex items-center justify-center text-xs disabled:opacity-30 hover:bg-slate-300 transition-colors"
                                 title="Geser ke atas"
                               >↑</button>
                               <button
                                 onClick={() => idx < imgs.length - 1 && moveGalleryImage(editingBlock.id, idx, idx + 1)}
                                 disabled={idx === imgs.length - 1}
                                 className="w-6 h-6 bg-slate-200 text-slate-600 rounded flex items-center justify-center text-xs disabled:opacity-30 hover:bg-slate-300 transition-colors"
                                 title="Geser ke bawah"
                               >↓</button>
                               <button
                                 onClick={() => removeGalleryImage(editingBlock.id, idx)}
                                 className="w-6 h-6 bg-red-100 text-red-600 rounded flex items-center justify-center text-xs hover:bg-red-200 transition-colors"
                                 title="Hapus gambar ini"
                               >×</button>
                             </div>
                           </div>
                         ))}
                       </div>
                     )}
                     <div className="relative">
                       <input type="file" multiple accept="image/*" onChange={(e) => handleBlockImageUpload(editingBlock.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                       <Button type="button" variant="outline" className="w-full text-xs border-dashed border-slate-300 text-slate-500" disabled={uploadingBlockImage}>
                          {uploadingBlockImage ? "Mengunggah..." : `+ Tambah Gambar${imgs.length > 0 ? ` (${imgs.length} ada)` : ""}`}
                       </Button>
                     </div>
                   </div>
                 );
               })()}

               {["link", "video", "cta"].includes(editingBlock.type) && (
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">URL / Tautan (Opsional)</label>
                    <input type="text" placeholder="https://..." value={editingBlock.url || ""} onChange={e => updateBlock(editingBlock.id, "url", e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                 </div>
               )}

               {editingBlock.type === "map" && (
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Google Maps Embed URL / src</label>
                    <input type="text" placeholder="https://www.google.com/maps/embed?pb=..." value={editingBlock.mapUrl || ""} onChange={e => updateBlock(editingBlock.id, "mapUrl", e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                    <p className="text-[10px] text-slate-400">Ambil URL dari fitur "Embed a map" di Google Maps.</p>
                 </div>
               )}

               {editingBlock.type === "social" && (
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700">Pengaturan Tautan Sosial Media</label>
                    
                    <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-[10px] font-bold">ig</div>
                        <input type="text" placeholder="Link Instagram (https://instagram.com/...)" value={editingBlock.instagram || ""} onChange={e => updateBlock(editingBlock.id, "instagram", e.target.value)} className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-xs outline-none focus:border-indigo-500" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-[10px] font-bold">wa</div>
                        <input type="text" placeholder="Link WhatsApp (https://wa.me/...)" value={editingBlock.whatsapp || ""} onChange={e => updateBlock(editingBlock.id, "whatsapp", e.target.value)} className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-xs outline-none focus:border-indigo-500" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-[10px] font-bold">tt</div>
                        <input type="text" placeholder="Link TikTok (https://tiktok.com/...)" value={editingBlock.tiktok || ""} onChange={e => updateBlock(editingBlock.id, "tiktok", e.target.value)} className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-xs outline-none focus:border-indigo-500" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-[10px] font-bold">tw</div>
                        <input type="text" placeholder="Link Twitter (https://x.com/...)" value={editingBlock.twitter || ""} onChange={e => updateBlock(editingBlock.id, "twitter", e.target.value)} className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-xs outline-none focus:border-indigo-500" />
                      </div>
                    </div>
                 </div>
               )}

               {["categories", "text", "bio", "faq", "testimonials", "menu", "details", "pricing", "team", "contact", "newsletter", "brands"].includes(editingBlock.type) && (
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">
                      {editingBlock.type === "map" ? "Alamat atau Koordinat Peta" :
                       editingBlock.type === "social" ? "Daftar Link Sosial Media (Pisahkan koma)" :
                       editingBlock.type === "team" ? "Daftar Nama Anggota & Posisi (Pisahkan baris)" :
                       editingBlock.type === "brands" ? "Daftar Nama Brand/Partner (Pisahkan koma)" :
                       editingBlock.type === "contact" ? "Email Penerima Pesan (Penting)" :
                       editingBlock.type === "faq" ? "Jawaban / Deskripsi Panjang" :
                       "Konten Tambahan / Deskripsi Lengkap"}
                    </label>
                    <textarea 
                      placeholder={
                        editingBlock.type === "team" ? "Budi (CEO)\nAndi (CTO)" :
                        editingBlock.type === "brands" ? "Nike, Adidas, Puma" :
                        "Isi konten panjang, pisahkan dengan koma atau baris baru..."
                      }
                      value={editingBlock.categories || ""} 
                      onChange={e => updateBlock(editingBlock.id, "categories", e.target.value)} 
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 h-24 resize-none" 
                    />
                 </div>
               )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
               <Button onClick={() => setEditingBlockId(null)} className="bg-indigo-600 text-white font-bold px-6">
                  Selesai
               </Button>
            </div>
          </div>
        </div>
      )}

      {/* ────── ADD NEW BLOCK MODAL ────── */}
      {addingBlockTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-4 lg:p-8">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-10 sticky top-0">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-200 flex-shrink-0">
                     <Squares2X2Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                     <h3 className="font-black text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900">Block Library</h3>
                     <p className="text-sm font-medium text-slate-500 mt-0.5">Pilih dan tambahkan komponen menakjubkan ke halaman Anda.</p>
                  </div>
               </div>
               <button onClick={() => setAddingBlockTo(null)} className="p-3 bg-slate-50 text-slate-400 hover:bg-slate-200 hover:text-slate-800 hover:rotate-90 rounded-full transition-all duration-300">
                  <XMarkIcon className="w-6 h-6" />
               </button>
            </div>
            
            <div className="p-8 overflow-y-auto bg-slate-50/50 space-y-10">
               {[
                 {
                   category: "E-Commerce & Bisnis",
                   items: [
                     { type: 'product-grid', name: 'Katalog Produk', desc: 'Grid lengkap dengan tombol +Cart.', icon: ShoppingBagIcon },
                     { type: 'product-flash', name: 'Flash Sale', desc: 'Produk diskon dengan harga coret.', icon: SparklesIcon },
                     { type: 'pricing', name: 'Tabel Harga', desc: 'Menampilkan paket layanan.', icon: CurrencyDollarIcon },
                   ]
                 },
                 {
                   category: "Pemasaran & Formulir",
                   items: [
                     { type: 'newsletter', name: 'Form Newsletter', desc: 'Input langganan email.', icon: EnvelopeIcon },
                     { type: 'contact', name: 'Formulir Kontak', desc: 'Formulir pesan (Nama, Email, Pesan).', icon: PaperAirplaneIcon },
                     { type: 'social', name: 'Ikon Media Sosial', desc: 'Tautan ke profil sosmed.', icon: GlobeAltIcon },
                   ]
                 },
                 {
                   category: "Media & Visual",
                   items: [
                     { type: 'hero', name: 'Banner Utama', desc: 'Gambar besar dengan teks di atasnya.', icon: PhotoIcon },
                     { type: 'gallery', name: 'Galeri Gambar', desc: 'Menampilkan dua gambar.', icon: Squares2X2Icon },
                     { type: 'video', name: 'Video Embed', desc: 'Menampilkan video dari external.', icon: VideoCameraIcon },
                     { type: 'brands', name: 'Logo Partner', desc: 'Barisan logo brand / klien.', icon: StarIcon },
                     { type: 'profile', name: 'Profil / Avatar', desc: 'Foto bulat untuk portofolio.', icon: UserCircleIcon },
                   ]
                 },
                 {
                   category: "Teks & Informasi",
                   items: [
                     { type: 'text', name: 'Headline / Teks', desc: 'Menulis narasi atau deskripsi.', icon: DocumentTextIcon },
                     { type: 'testimonials', name: 'Testimoni', desc: 'Kumpulan ulasan dari customer.', icon: ChatBubbleBottomCenterTextIcon },
                     { type: 'team', name: 'Anggota Tim', desc: 'Profil staf atau pengurus.', icon: UserGroupIcon },
                     { type: 'faq', name: 'FAQ (Accordion)', desc: 'Tanya jawab yang bisa di expand.', icon: QuestionMarkCircleIcon },
                     { type: 'details', name: 'Detail Specs', desc: 'Teks detail spesifikasi khusus.', icon: Bars3BottomLeftIcon },
                   ]
                 },
                 {
                   category: "Interaksi & Navigasi",
                   items: [
                     { type: 'categories', name: 'Kategori Filter', desc: 'Pilihan kategori berupa chip.', icon: IdentificationIcon },
                     { type: 'link', name: 'Tombol Tautan', desc: 'Tombol yang mengarah ke link.', icon: ArrowTopRightOnSquareIcon },
                     { type: 'countdown', name: 'Countdown', desc: 'Penghitung mundur untuk promosi.', icon: ClockIcon },
                     { type: 'map', name: 'Peta Lokasi (Maps)', desc: 'Embed peta wilayah alamat.', icon: MapPinIcon },
                     { type: 'spacer', name: 'Jarak (Spacer)', desc: 'Memberi ruang kosong di antara blok.', icon: ArrowsUpDownIcon },
                   ]
                 }
               ].map((group, idx) => (
                 <div key={idx} className="space-y-4">
                    <h4 className="font-bold text-sm text-indigo-600 uppercase tracking-widest pl-2">{group.category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {group.items.map(opt => {
                        const Icon = opt.icon;
                        return (
                          <button key={opt.type} onClick={() => addBlock(opt.type, opt.name, addingBlockTo)} className="w-full text-left flex flex-col gap-3 p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 transition-all group">
                             <div className="p-3 bg-indigo-50/50 text-indigo-400 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors w-min">
                               <Icon className="w-6 h-6" />
                             </div>
                             <div>
                                <div className="font-bold text-slate-800 mb-1">{opt.name}</div>
                                <div className="text-xs text-slate-500 leading-relaxed">{opt.desc}</div>
                             </div>
                          </button>
                        );
                      })}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
