import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { SignOutButton } from "@/components/auth/signout-button"
import { SparklesIcon } from "@heroicons/react/24/outline"

const TEMPLATES = [
  { id: "ECOMMERCE", name: "F&B / E-Commerce", desc: "Katalog produk & transaksi", bg: "bg-indigo-50", color: "text-indigo-600" },
  { id: "SERVICE", name: "Services & Booking", desc: "Jasa & pemesanan jadwal", bg: "bg-cyan-50", color: "text-cyan-600" },
  { id: "CAMPAIGN", name: "Flash Sale", desc: "Promosi waktu terbatas", bg: "bg-slate-900", color: "text-rose-500" },
  { id: "BIO", name: "Link-in-Bio", desc: "Profil & tautan sosial", bg: "bg-pink-50", color: "text-pink-600" },
  { id: "PORTFOLIO", name: "Creative Portfolio", desc: "Showcase karya & portofolio", bg: "bg-purple-50", color: "text-purple-600" },
  { id: "EVENT", name: "Event / Webinar", desc: "Pendaftaran acara", bg: "bg-fuchsia-50", color: "text-fuchsia-600" },
  { id: "RESTAURANT", name: "Digital Menu", desc: "Katalog menu restoran", bg: "bg-amber-50", color: "text-amber-600" },
  { id: "NONPROFIT", name: "Fundraising", desc: "Donasi & kampanye", bg: "bg-green-50", color: "text-green-600" },
  { id: "REALESTATE", name: "Real Estate", desc: "Listing properti & rumah", bg: "bg-slate-100", color: "text-slate-600" },
]

export default async function TemplatesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const userName = session.user.name ?? "there"
  const userInitials = userName !== "there"
    ? userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
    : "US"
  const userImage = session.user.image

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200 h-16 flex items-center px-6 justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="ShopyVibe" width={36} height={36} className="rounded-xl" />
          <span className="font-semibold text-xl text-slate-800 tracking-tight">ShopyVibe</span>
        </div>

        {/* Central Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-500">
          <Link href="/vibes" className="hover:text-slate-900 py-5 transition-colors">
            My Vibes
          </Link>
          <Link href="/templates" className="text-slate-900 font-bold border-b-2 border-slate-900 py-5 -mb-[2px] transition-colors">
            Templates
          </Link>
          <Link href="/dashboard" className="hover:text-slate-900 py-5 transition-colors">
            Dashboard
          </Link>
          <Link href="/settings" className="hover:text-slate-900 py-5 transition-colors">
            Settings
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden sm:block">{session.user.email}</span>
          <SignOutButton />
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userImage} alt={userName} className="w-9 h-9 rounded-full border-2 border-indigo-200" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              {userInitials}
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Explore Templates</h1>
            <p className="text-slate-500">Find the perfect design for your digital storefront.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {TEMPLATES.map((t) => (
             <div key={t.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer flex flex-col">
                <div className={`h-40 ${t.bg} flex items-center justify-center relative overflow-hidden`}>
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                   <SparklesIcon className={`w-12 h-12 ${t.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                   <h3 className="text-lg font-bold text-slate-800">{t.name}</h3>
                   <p className="text-sm text-slate-500 mt-1 mb-6 flex-1">{t.desc}</p>
                   <Link href="/onboarding" className="block text-center w-full py-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-semibold rounded-xl border border-slate-200 hover:border-indigo-200 transition-colors">
                      Use Template
                   </Link>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}
