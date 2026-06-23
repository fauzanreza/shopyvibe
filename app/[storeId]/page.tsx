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

  // Filter products for this demo
  const storeProducts = store.products;
  const storeName = store.name;
  const storeDesc = store.themeConfig || "Kopi terbaik & Frozen Food.";

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 
        CHAMELEON UI ENGINE 
        --------------------
        Desktop: Professional Landing Page (Navbar, Hero, Grid Layout)
        Mobile: Intimate Link-in-Bio UI
      */}

      {/* Desktop Sticky Navbar (Hidden on Mobile) */}
      <nav className="hidden lg:flex fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 items-center px-8 justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black">
            {store.logo ? <img src={store.logo} alt={storeName} className="w-full h-full object-cover rounded-full" /> : storeName.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-bold text-xl text-slate-800">{storeName}</span>
        </div>
        <div className="flex gap-8 font-medium text-slate-600">
           <a href="#home" className="hover:text-indigo-600">Beranda</a>
           <a href="#story" className="hover:text-indigo-600">Story</a>
           <a href="#catalog" className="hover:text-indigo-600">Katalog</a>
        </div>
        <div className="flex gap-4">
           {/* Multi-Currency Dropdown Concept */}
           <select className="bg-slate-100 border-none text-sm font-medium rounded-lg text-slate-700 outline-none p-2 cursor-pointer">
              <option>IDR (Rp)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
           </select>
           <Button asChild className="bg-indigo-600 hover:bg-indigo-700 rounded-lg">
             <a href="#catalog">Belanja Sekarang</a>
           </Button>
        </div>
      </nav>

      {/* Chameleon Profile Header / Hero Section */}
      <header id="home" className="lg:pt-16 pb-8 lg:pb-16 flex flex-col items-center">
        {/*
          Cover Photo 
          - Mobile: Top banner logic
          - Desktop: Full width hero image 
        */}
        <div className="w-full lg:max-w-6xl mx-auto h-48 sm:h-56 lg:h-[400px] lg:mt-6 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop')] bg-cover bg-center relative lg:rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 lg:from-slate-900/60 to-transparent"></div>
          
          {/* Desktop Overlay Content */}
          <div className="hidden lg:flex absolute bottom-0 left-0 w-full p-12 flex-col justify-end">
             <h1 className="text-5xl font-extrabold text-white mb-4 slide-up-anim">{storeName}</h1>
             <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
               {storeDesc} Dibuat dengan cinta, 100% lokal.
             </p>
             <div className="flex gap-4 mt-8">
               <Button size="lg" className="rounded-full bg-white text-indigo-900 hover:bg-slate-50 font-bold px-8">
                 Tentang Kami
               </Button>
               <Button size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 shadow-lg shadow-emerald-500/30">
                 WhatsApp: Order Cepat
               </Button>
             </div>
          </div>
        </div>
        
        {/* Mobile Identity Container (Hidden on Desktop, overlapping the cover photo) */}
        <div className="lg:hidden w-full px-6 flex flex-col items-center -mt-20 relative z-10">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full border-[5px] border-white overflow-hidden shadow-xl bg-white relative flex items-center justify-center">
            {store.logo ? (
               <img src={store.logo} alt={storeName} className="w-full h-full object-cover" />
            ) : (
               <span className="text-5xl font-extrabold text-indigo-600 bg-clip-text">{storeName.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900 tracking-tight text-center">
            {storeName}
          </h1>
          <p className="text-slate-600 mt-2 text-center max-w-sm font-medium leading-relaxed">
            {storeDesc}
          </p>
          
          {/* Direct Order Buttons - Mobile */}
          <div className="flex flex-col w-full max-w-sm gap-3 mt-8">
            <a href="#catalog" className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 py-4 px-6 rounded-2xl font-bold transition-all shadow-lg shadow-slate-300">
               🛒 Lihat Katalog Produk
            </a>
            <a href="https://wa.me/628123456789" className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-6 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200">
               💬 Pesan via WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Brand Storytelling (Marketing 3.0 Alignment) */}
      <section id="story" className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-12 items-center">
           <div className="w-full lg:w-1/2 aspect-video bg-indigo-50 rounded-3xl overflow-hidden relative group cursor-pointer">
              {/* Dummy Video Thumbnail */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center pl-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                   <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
           </div>
           <div className="w-full lg:w-1/2">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-50 text-pink-600 text-xs font-bold mb-6 tracking-wider uppercase">
                Behind The Brand
             </div>
             <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Lebih dari Sekadar Kopi. Sebuah Perjalanan.</h2>
             <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Kami membangun <strong>{storeName}</strong> bukan sekadar untuk berbisnis, tetapi untuk memastikan setiap biji kopi yang di-roasting memberdayakan petani lokal di Pegunungan Jawa.
             </p>
             <p className="text-lg text-slate-600 leading-relaxed">
                Tonton cerita kami tentang bagaimana sebuah dedikasi kami dapat sampai ke cangkir Anda.
             </p>
           </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="catalog" className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Katalog Produk</h2>
              <p className="text-slate-500 font-medium mt-2">Belanja produk {storeName} langsung dikoordinasi pengiriman tercepat.</p>
            </div>
            {/* AI Callout Desktop */}
            <div className="hidden lg:flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-2xl p-3 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <span className="text-2xl animate-pulse">✨</span>
                <div>
                   <p className="text-xs font-bold text-indigo-800">Bingung memilih?</p>
                   <p className="text-xs font-medium text-indigo-600">Tanya AI Sales Agent Kami</p>
                </div>
            </div>
        </div>
        
        {/* Grid Layout adjusts perfectly from Mobile to Desktop via existing ProductList Component */}
        {/* We assume ProductList internally handles grid layout */}
        <ProductList products={storeProducts} />
      </section>

      {/* Persistent Mobile Bottom Navigation (Optional enhancement for "App-like" feel) */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 flex justify-center z-40 pointer-events-none">
         <div className="bg-slate-900/90 backdrop-blur-xl pointer-events-auto rounded-[2rem] px-6 py-3 flex gap-8 items-center border border-slate-700/50 shadow-2xl shadow-indigo-900/20">
            <a href="#home" className="text-white hover:text-indigo-300 transition-colors flex flex-col items-center gap-1">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </a>
            <a href="#story" className="text-slate-400 hover:text-indigo-300 transition-colors flex flex-col items-center gap-1">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </a>
            <a href="#catalog" className="text-slate-400 hover:text-indigo-300 transition-colors flex flex-col items-center gap-1">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </a>
         </div>
      </div>

      {/* Floating AI Chat Button (24/7 Agent) */}
      <div className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-50">
        <button className="h-16 w-16 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 transition-all outline-none focus:ring-4 ring-indigo-200 group relative border-2 border-white/20">
            <span className="text-2xl animate-bounce group-hover:animate-none">✨</span>
            <div className="absolute -top-12 right-0 bg-slate-900 text-white text-xs px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-slate-700">
                Tanya produk? AI 24/7 Siap Bantu
            </div>
            {/* Online Indicator */}
            <span className="absolute top-0 right-0 flex h-4 w-4">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </span>
        </button>
      </div>

    </div>
  );
}
