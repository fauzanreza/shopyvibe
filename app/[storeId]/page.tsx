import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductList } from "@/components/product-list";
import { Button } from "@/components/ui/button";

interface StorePageProps {
  params: Promise<{
    storeId: string;
  }>;
}

export default async function StorePage({ params }: StorePageProps) {
  const { storeId } = await params;
  
  if (!storeId) {
    notFound();
  }

  const store = await db.store.findUnique({
    where: { slug: storeId },
    include: { products: true }
  });

  if (!store) {
    notFound();
  }

  let theme: any = {
    bgColor: "#f8fafc",
    bgImage: "",
    btnColor: "#4f46e5",
    textColor: "#0f172a",
    navLinks: [] as any[],
    blocks: [] as any[]
  };
  
  let storeDesc = "";
  
  if (store.themeConfig) {
    try {
      const parsed = JSON.parse(store.themeConfig);
      if (parsed.bgHex || parsed.bgColor) theme.bgColor = parsed.bgHex || parsed.bgColor;
      if (parsed.bgImage) theme.bgImage = parsed.bgImage;
      if (parsed.btnHex || parsed.btnColor) theme.btnColor = parsed.btnHex || parsed.btnColor;
      if (parsed.textHex || parsed.textColor) theme.textColor = parsed.textHex || parsed.textColor;
      if (parsed.navLinks) theme.navLinks = parsed.navLinks;
      if (parsed.blocks) theme.blocks = parsed.blocks;
    } catch (e) {}
  }

  const storeProducts = store.products;
  const storeName = store.name;
  const mode = store.layoutMode || "ECOMMERCE";

  // --- Dynamic Renderer ---
  return (
    <div className="min-h-screen relative selection:bg-indigo-100 selection:text-indigo-900" style={{ backgroundColor: theme.bgColor, color: theme.textColor }}>
      {theme.bgImage && <div className="absolute inset-0 w-full h-full fixed" style={{ backgroundImage: `url(${theme.bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />}
      
      <div className="relative z-10">
        {theme.navLinks && theme.navLinks.length > 0 && (
          <nav className="hidden lg:flex w-full z-40 backdrop-blur-md border-b border-opacity-10 h-16 items-center px-8 justify-between shadow-sm" style={{ backgroundColor: `${theme.bgColor}ee`, color: theme.textColor, borderColor: `${theme.textColor}22` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black overflow-hidden" style={{ backgroundColor: theme.btnColor, color: "#fff" }}>
                {store.logo ? <img src={store.logo} alt={storeName} className="w-full h-full object-cover" /> : storeName.substring(0, 2).toUpperCase()}
              </div>
              <span className="font-bold text-xl">{storeName}</span>
            </div>
            <div className="flex gap-8 font-medium">
               {theme.navLinks.map((link: any) => (
                 <a key={link.id} href={link.url} className="hover:opacity-70 transition-opacity">{link.label}</a>
               ))}
            </div>
            <div className="w-10" />{/* spacer to balance logo */}
          </nav>
        )}

      <main className="w-full flex flex-col pb-24">
        {theme.navLinks && theme.navLinks.length > 0 ? (
          theme.navLinks.map((link: any) => (
            <section key={link.id} id={link.url.replace('#', '')} className="w-full lg:max-w-6xl mx-auto px-4 lg:px-8 py-12 flex flex-col items-center gap-8 border-b border-opacity-10" style={{ borderColor: theme.textColor }}>
               {theme.blocks && theme.blocks.filter((b: any) => b.sectionId === link.id).map((block: any) => (
                  <BlockRenderer key={block.id} block={block} theme={theme} storeName={storeName} storeDesc={storeDesc} store={store} storeProducts={storeProducts} />
               ))}
               {theme.blocks && theme.blocks.filter((b: any) => b.sectionId === link.id).length === 0 && (
                  <p className="opacity-50 text-sm">Tidak ada blok di seksi {link.label}</p>
               )}
            </section>
          ))
        ) : (
          <section className="w-full lg:max-w-6xl mx-auto px-4 lg:px-8 py-12 flex flex-col items-center gap-8">
             {theme.blocks && theme.blocks.map((block: any) => (
                <BlockRenderer key={block.id} block={block} theme={theme} storeName={storeName} storeDesc={storeDesc} store={store} storeProducts={storeProducts} />
             ))}
          </section>
        )}
      </main>

      </div>
    </div>
  );
}

// Reusable Dynamic Block Renderer for Storefront
function BlockRenderer({ block, theme, storeName, storeDesc, store, storeProducts }: any) {
  if (block.type === "header" || block.type === "headline") return (
    <h2 className="font-bold text-center w-full" style={{ color: theme.textColor, fontSize: block.type === "headline" ? "3rem" : "2rem" }}>
      {block.text}
    </h2>
  );
  
  if (block.type === "hero") return (
    <div className="w-full h-[400px] relative rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 text-center">
       {block.imageUrl ? (
         <img src={block.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
       ) : (
         <div className="absolute inset-0 w-full h-full" style={{ background: `linear-gradient(135deg, ${theme.btnColor}, ${theme.btnColor}88)` }} />
       )}
       <div className="absolute inset-0 bg-black/30" />
       <div className="relative z-10 flex flex-col items-center">
         <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">{block.text}</h1>
         {block.categories && <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium drop-shadow-md">{block.categories}</p>}
       </div>
    </div>
  );

  if (block.type === "bio" || block.type === "text" || block.type === "details") return (
    <div className="w-full max-w-3xl text-center leading-relaxed text-lg" style={{ color: theme.textColor }}>
      <p className="font-bold mb-2 text-2xl">{block.text}</p>
      {block.categories && <p className="opacity-80 whitespace-pre-line">{block.categories}</p>}
    </div>
  );

  if (block.type === "link" || block.type === "cta") return (
    <a href={block.url || "#"} className="w-full max-w-sm flex items-center justify-center font-bold text-lg rounded-2xl transition-transform hover:scale-[1.02] shadow-xl hover:shadow-2xl"
      style={{ backgroundColor: theme.btnColor, color: "white", padding: "16px 24px" }}>
      {block.text}
    </a>
  );

  if (block.type === "video") return (
    <div className="w-full max-w-4xl relative flex items-center justify-center overflow-hidden bg-slate-900 rounded-3xl shadow-xl aspect-video">
      {block.url ? (
         <iframe src={block.url} className="w-full h-full border-0" allowFullScreen></iframe>
      ) : (
         <div className="text-white/60 flex flex-col items-center"><p className="text-xl font-bold">Video tidak tersedia</p></div>
      )}
    </div>
  );

  if (block.type === "spacer") return (
     <div style={{ height: "4rem", width: "100%" }}></div>
  );

  if (block.type === "faq") return (
     <details className="w-full max-w-3xl p-6 rounded-2xl text-left bg-white shadow-sm cursor-pointer border transition-colors hover:bg-slate-50" style={{ borderColor: `${theme.btnColor}40`, color: theme.textColor }}>
        <summary className="font-bold text-xl select-none flex justify-between">{block.text} <span style={{ color: theme.btnColor }}>+</span></summary>
        {block.categories && <p className="mt-4 opacity-80 leading-relaxed pt-4 border-t" style={{ borderColor: `${theme.btnColor}20` }}>{block.categories}</p>}
     </details>
  );

  if (block.type === "gallery" || block.type === "portfolio") {
    const images = block.imageUrls && block.imageUrls.length > 0 ? block.imageUrls : (block.imageUrl ? [block.imageUrl] : []);
    return (
      <div className="w-full">
        <h3 className="font-bold text-2xl mb-6 text-center" style={{ color: theme.textColor }}>{block.text}</h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {images.length > 0 ? images.map((url: string, idx: number) => (
             <div key={idx} className="aspect-square bg-slate-200 rounded-2xl overflow-hidden group relative shadow-md">
               <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             </div>
           )) : (
             <>
               <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden group relative shadow-md">
                 <div className="w-full h-full bg-slate-300 flex items-center justify-center font-bold text-slate-400">Gambar 1</div>
               </div>
               <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden group relative shadow-md">
                  <div className="w-full h-full bg-slate-300 flex items-center justify-center font-bold text-slate-400">Gambar 2</div>
               </div>
             </>
           )}
        </div>
      </div>
    );
  }

  if (block.type === "product-grid") return (
    <div className="w-full flex flex-col items-center">
       <h3 className="font-bold text-2xl md:text-3xl mb-8 text-center" style={{ color: theme.textColor }}>{block.text}</h3>
       {storeProducts && storeProducts.length > 0 ? (
         <ProductList products={storeProducts} />
       ) : (
         <p className="opacity-50">Belum ada produk untuk ditampilkan di katalog.</p>
       )}
    </div>
  );

  if (block.type === "avatar" || block.type === "profile") return (
    <div className="rounded-full flex items-center justify-center overflow-hidden shadow-2xl mb-4 border-4" style={{ width: 160, height: 160, backgroundColor: theme.btnColor + "11", borderColor: theme.btnColor }}>
      {store.logo ? <img src={store.logo} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 font-extrabold text-5xl">L</div>}
    </div>
  );

  if (block.type === "categories" || block.type === "pricing" || block.type === "testimonials") return (
    <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-4">
       <div className="w-full p-6 rounded-2xl text-center bg-white shadow-sm border" style={{ borderColor: `${theme.btnColor}40`, color: theme.textColor }}>
         <h4 className="font-bold text-xl mb-2">{block.text}</h4>
         {block.categories && <p className="opacity-80 text-sm whitespace-pre-line">{block.categories}</p>}
       </div>
    </div>
  )

  if (block.type === "product-flash") return (
    <div className="w-full max-w-sm p-8 rounded-3xl text-center shadow-2xl transform hover:scale-105 transition-transform" style={{ background: theme.btnColor, color: "white" }}>
      <p className="text-2xl font-extrabold mb-4">{block.text}</p>
      <p className="text-lg opacity-70 line-through mb-1">Rp 100.000</p>
      <p className="text-5xl font-black mb-6">Rp 49.000</p>
      <button className="w-full py-4 bg-white text-black rounded-xl text-lg font-bold shadow-lg">Beli Sekarang</button>
    </div>
  );

  if (block.type === "newsletter") return (
    <div className="w-full max-w-2xl p-10 rounded-3xl text-center border shadow-xl bg-slate-50" style={{ borderColor: `${theme.btnColor}30`, color: theme.textColor }}>
      <h4 className="font-extrabold text-3xl mb-4">{block.text}</h4>
      <p className="mb-8 text-lg opacity-80">{block.categories || "Dapatkan info promo dan update terbaru langsung di inbox Anda."}</p>
      <div className="flex flex-col sm:flex-row gap-4">
         <input type="email" placeholder="Alamat email Anda" className="flex-1 p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 text-lg" />
         <button className="px-8 py-4 text-white font-bold rounded-xl text-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: theme.btnColor }}>Berlangganan</button>
      </div>
    </div>
  );

  if (block.type === "contact") return (
    <div className="w-full max-w-3xl p-10 rounded-3xl bg-white shadow-2xl border" style={{ borderColor: `${theme.btnColor}20`, color: theme.textColor }}>
      <h4 className="font-extrabold text-3xl mb-8 text-center">{block.text}</h4>
      <form className="space-y-6">
         <div>
            <label className="block text-sm font-bold mb-2">Nama Lengkap</label>
            <input type="text" className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none" placeholder="Masukkan nama..." />
         </div>
         <div>
            <label className="block text-sm font-bold mb-2">Pesan Anda</label>
            <textarea className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none h-32 resize-none" placeholder="Tuliskan pesan..." />
         </div>
         <button type="button" className="w-full py-4 text-white font-bold rounded-xl text-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: theme.btnColor }}>Kirim Pesan</button>
      </form>
    </div>
  );

  if (block.type === "team") return (
    <div className="w-full flex flex-col items-center">
      <h3 className="font-extrabold text-3xl mb-12 text-center" style={{ color: theme.textColor }}>{block.text}</h3>
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex flex-col items-center text-center group">
             <div className="w-32 h-32 rounded-full bg-slate-200 mb-6 overflow-hidden border-4 border-transparent group-hover:border-indigo-100 transition-all">
                <div className="w-full h-full bg-slate-300 flex items-center justify-center font-bold text-slate-400 text-3xl">P{i}</div>
             </div>
             <span className="text-xl font-bold mb-1" style={{ color: theme.textColor }}>Anggota {i}</span>
             <span className="text-md opacity-70 font-medium" style={{ color: theme.textColor }}>Posisi / Jabatan</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (block.type === "brands") return (
    <div className="w-full max-w-6xl py-12 border-y border-slate-200 flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
       <div className="w-32 h-12 bg-slate-300 rounded-lg flex items-center justify-center text-slate-500 font-bold">BRAND 1</div>
       <div className="w-32 h-12 bg-slate-300 rounded-lg flex items-center justify-center text-slate-500 font-bold">BRAND 2</div>
       <div className="w-32 h-12 bg-slate-300 rounded-lg flex items-center justify-center text-slate-500 font-bold">BRAND 3</div>
       <div className="w-32 h-12 bg-slate-300 rounded-lg flex items-center justify-center text-slate-500 font-bold">BRAND 4</div>
    </div>
  );

  if (block.type === "map") return (
    <div className="w-full max-w-5xl bg-slate-200 rounded-3xl overflow-hidden shadow-xl aspect-[21/9] flex items-center justify-center relative">
       {block.mapUrl ? (
          <iframe src={block.mapUrl} className="absolute inset-0 w-full h-full border-0" allowFullScreen loading="lazy"></iframe>
       ) : (
          <div className="absolute inset-0 bg-slate-300 flex flex-col items-center justify-center text-slate-500 gap-4">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="text-2xl font-bold">{block.text || "Google Maps Embed"}</span>
            <span className="text-lg opacity-80">{block.categories || "Peta belum dikonfigurasi."}</span>
          </div>
       )}
    </div>
  );

  if (block.type === "social") return (
    <div className="w-full flex justify-center gap-6 py-6">
       {block.instagram && (
         <a href={block.instagram} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform" style={{ backgroundColor: theme.btnColor }}>
            <span className="font-bold text-xl">ig</span>
         </a>
       )}
       {block.whatsapp && (
         <a href={block.whatsapp} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform" style={{ backgroundColor: theme.btnColor }}>
            <span className="font-bold text-xl">wa</span>
         </a>
       )}
       {block.tiktok && (
         <a href={block.tiktok} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform" style={{ backgroundColor: theme.btnColor }}>
            <span className="font-bold text-xl">tt</span>
         </a>
       )}
       {block.twitter && (
         <a href={block.twitter} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform" style={{ backgroundColor: theme.btnColor }}>
            <span className="font-bold text-xl">tw</span>
         </a>
       )}
       {!block.instagram && !block.whatsapp && !block.tiktok && !block.twitter && (
         <p className="opacity-50">Tautan sosial media belum diatur.</p>
       )}
    </div>
  );

  return null;
}
