import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, SparklesIcon, QrCodeIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function ShopyVibeLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2">
              <Image src="/logo.png" alt="ShopyVibe Logo" width={32} height={32} className="rounded-lg w-7 h-7 sm:w-8 sm:h-8" />
              <span className="font-bold text-xl sm:text-2xl tracking-tight text-slate-900">ShopyVibe</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Log in</Link>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 sm:px-6 shadow-md shadow-indigo-200 text-xs sm:text-sm whitespace-nowrap shrink-0">
                <Link href="/dashboard">
                  <span className="hidden sm:inline">Get Started Free</span>
                  <span className="sm:hidden">Get Started</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Background Decorative Blob */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 left-0 -ml-20 mt-20 w-[400px] h-[400px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Platform Web-Builder Khusus UMKM
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 sm:mb-8 leading-tight">
              Bangun Identitas Digital <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
                Yang Profesional & Intim
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Tinggalkan marketplace yang berisik. Buat profil bisnismu sendiri dengan Dynamic Builder, Link-in-Bio estetik, dan AI Sales Agent tanpa ribet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg w-full sm:w-auto min-w-[200px]">
                <Link href="/dashboard">
                  Buat Toko Sekarang <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg w-full sm:w-auto min-w-[200px] border-slate-300 text-slate-700 hover:bg-slate-50">
                <Link href="#features">Pelajari Fitur</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image Mockup (Conceptual) */}
          <div className="mt-12 sm:mt-20 flex justify-center relative z-10">
            <div className="w-full max-w-5xl h-[350px] sm:h-[400px] lg:h-[600px] rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 shadow-2xl p-4 lg:p-8 flex items-center justify-center border border-slate-700/50 relative overflow-hidden group">
              
              {/* Mockup UI Elements Grid */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-8 items-end transform transition-transform group-hover:scale-105 duration-700">
                    {/* Mobile Mockup */}
                    <div className="w-48 sm:w-56 lg:w-72 h-[380px] sm:h-[450px] lg:h-[550px] bg-white rounded-[2rem] sm:rounded-[2.5rem] p-2 shadow-2xl border-[4px] sm:border-[6px] border-slate-800 relative translate-y-4 sm:translate-y-8 z-20">
                      <div className="absolute top-0 inset-x-0 h-4 sm:h-6 bg-slate-800 rounded-b-xl sm:rounded-b-3xl w-16 sm:w-24 mx-auto"></div>
                      <div className="w-full h-full bg-slate-50 rounded-[2rem] overflow-hidden flex flex-col pt-8">
                         <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mt-4 border-4 border-white shadow-sm"></div>
                         <h3 className="text-center font-bold mt-2">Toko Kopi Sejahtera</h3>
                         <p className="text-xs text-center text-slate-500">Kopi terbaik di kota</p>
                         <div className="mt-6 flex flex-col gap-3 px-4">
                            <div className="h-12 w-full bg-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-medium">Beli via WhatsApp</div>
                            <div className="h-12 w-full bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-700 text-sm font-medium">Katalog Produk</div>
                         </div>
                      </div>
                    </div>
                    {/* Dashboard Mockup - partially visible */}
                    <div className="hidden lg:block w-[600px] h-[400px] bg-white rounded-xl shadow-2xl border border-slate-200 p-6 relative -ml-16 z-10 overflow-hidden">
                       <div className="flex gap-4 border-b pb-4 mb-4">
                         <div className="w-full">
                           <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                           <div className="text-3xl font-bold">1,245 <span className="text-sm font-normal text-emerald-500">+12%</span></div>
                         </div>
                         <div className="w-full">
                            <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                           <div className="text-3xl font-bold">342</div>
                         </div>
                       </div>
                       <div className="flex gap-4">
                         <div className="flex-1 space-y-3">
                           <div className="h-10 bg-slate-50 rounded border border-slate-100 w-full"></div>
                           <div className="h-10 bg-slate-50 rounded border border-slate-100 w-full"></div>
                           <div className="h-10 bg-slate-50 rounded border border-slate-100 w-full"></div>
                         </div>
                         <div className="w-48 h-48 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center">
                           <QrCodeIcon className="w-32 h-32 text-slate-300" />
                         </div>
                       </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Fitur Lengkap Untuk Kembangkan Bisnismu</h2>
            <p className="text-lg text-slate-600">Semua yang kamu butuhkan untuk berjualan mandiri tanpa komisi atau iklan kompetitor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-indigo-100 transition-colors group">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dynamic Profile Builder</h3>
              <p className="text-slate-600">Tampilan profil ala Landing Page yang fully responsive. Sesuaikan warna, upload hero image, dan tampilkan katalog estetik.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-pink-100 transition-colors group">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ArrowRightIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Link-in-Bio & Custom QR</h3>
              <p className="text-slate-600">Dapatkan URL cantik (shopyvibe.id/tokomu) dan QR code instan untuk ditaruh di kemasan atau meja kasir.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-emerald-100 transition-colors group">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ChartBarIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Seller Dashboard & Analytics</h3>
              <p className="text-slate-600">Pantau kunjungan link, scan QR, dan konversi produkmu. Kelola stok produk dengan mudah langsung dari HP.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/logo.png" alt="ShopyVibe" width={24} height={24} className="rounded-md opacity-70" />
            <span className="font-bold text-xl text-white">ShopyVibe</span>
          </div>
          <p>© 2026 ShopyVibe Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
