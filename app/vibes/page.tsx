import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { SignOutButton } from "@/components/auth/signout-button"

const TEMPLATES = [
  {
    id: "blank",
    name: "Blank Vibe",
    description: "Mulai dari awal",
    gradient: "from-slate-100 to-slate-200",
    icon: "✦",
    iconColor: "text-slate-500",
    accent: "bg-slate-500",
  },
  {
    id: "ECOMMERCE",
    name: "F&B / E-Commerce",
    description: "Katalog produk & transaksi",
    gradient: "from-indigo-50 to-blue-50",
    icon: "🛍️",
    iconColor: "text-indigo-600",
    accent: "bg-indigo-600",
  },
  {
    id: "SERVICE",
    name: "Services & Booking",
    description: "Jasa & pemesanan jadwal",
    gradient: "from-sky-50 to-cyan-50",
    icon: "📅",
    iconColor: "text-cyan-600",
    accent: "bg-cyan-600",
  },
  {
    id: "CAMPAIGN",
    name: "Flash Sale",
    description: "Promosi waktu terbatas",
    gradient: "from-slate-900 to-slate-800",
    icon: "⚡",
    iconColor: "text-rose-500",
    accent: "bg-rose-500",
  },
  {
    id: "BIO",
    name: "Link-in-Bio",
    description: "Profil & tautan sosial",
    gradient: "from-pink-50 to-rose-50",
    icon: "🔗",
    iconColor: "text-pink-600",
    accent: "bg-pink-600",
  },
  {
    id: "PORTFOLIO",
    name: "Creative Portfolio",
    description: "Showcase karya & portofolio",
    gradient: "from-purple-50 to-fuchsia-50",
    icon: "🎨",
    iconColor: "text-purple-600",
    accent: "bg-purple-600",
  },
  {
    id: "EVENT",
    name: "Event / Webinar",
    description: "Pendaftaran acara",
    gradient: "from-fuchsia-50 to-pink-50",
    icon: "🎟️",
    iconColor: "text-fuchsia-600",
    accent: "bg-fuchsia-600",
  },
  {
    id: "RESTAURANT",
    name: "Digital Menu",
    description: "Katalog menu restoran",
    gradient: "from-amber-50 to-orange-50",
    icon: "🍔",
    iconColor: "text-amber-600",
    accent: "bg-amber-600",
  },
  {
    id: "NONPROFIT",
    name: "Fundraising",
    description: "Donasi & kampanye",
    gradient: "from-green-50 to-emerald-50",
    icon: "💚",
    iconColor: "text-green-600",
    accent: "bg-green-600",
  },
  {
    id: "REALESTATE",
    name: "Real Estate",
    description: "Listing properti & rumah",
    gradient: "from-slate-50 to-slate-100",
    icon: "🏠",
    iconColor: "text-slate-600",
    accent: "bg-slate-600",
  },
]

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}

export default async function VibesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const stores = await db.store.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { products: true } } },
  })

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
          <Link href="/vibes" className="text-slate-900 font-bold border-b-2 border-slate-900 py-5 -mb-[2px] transition-colors">
            My Vibes
          </Link>
          <Link href="/templates" className="hover:text-slate-900 py-5 transition-colors">
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

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Template Picker — like Google Docs */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-slate-600">Buat Vibe Baru</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {TEMPLATES.map((tpl) => (
              <Link
                key={tpl.id}
                href={`/onboarding?template=${tpl.id}`}
                className="group flex flex-col gap-2 cursor-pointer"
              >
                {/* Template preview card */}
                <div
                  className={`h-36 rounded-xl border-2 border-slate-200 group-hover:border-indigo-500 transition-all bg-gradient-to-br ${tpl.gradient} flex flex-col items-center justify-center gap-2 shadow-sm group-hover:shadow-md overflow-hidden relative`}
                >
                  <span className={`text-4xl font-black ${tpl.iconColor}`}>{tpl.icon}</span>
                  {tpl.accent && (
                    <div className={`w-16 h-3 rounded-full ${tpl.accent} opacity-70`}></div>
                  )}
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-all" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">{tpl.name}</div>
                  <div className="text-xs text-slate-400">{tpl.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-slate-200 mb-8" />

        {/* My Vibes section — like Google Docs recent documents */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-slate-600">
              Vibe Saya
              {stores.length > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{stores.length}</span>
              )}
            </h2>
          </div>

          {stores.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 text-5xl">🏪</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Belum ada Vibe</h3>
              <p className="text-slate-500 text-sm max-w-sm mb-6">
                Buat toko digital pertama Anda sekarang. Pilih template di atas atau mulai dari kosong.
              </p>
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
              >
                <PlusIcon className="w-5 h-5" />
                Buat Vibe Pertama
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {/* New Vibe card */}
              <Link
                href="/onboarding"
                className="group h-48 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:bg-indigo-50/50 cursor-pointer"
              >
                <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-200 rounded-2xl flex items-center justify-center transition-colors">
                  <PlusIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm font-semibold text-slate-500 group-hover:text-indigo-700 transition-colors">Buat Vibe Baru</span>
              </Link>

              {/* Existing store cards */}
              {stores.map((store) => (
                <div key={store.id} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all">
                  {/* Store thumbnail */}
                  <Link href={`/dashboard/${store.id}`}>
                    <div className="h-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                      {store.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={store.logo} alt={store.name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-lg">
                          {store.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-all" />
                    </div>
                  </Link>

                  {/* Store info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <Link href={`/dashboard/${store.id}`}>
                          <h3 className="font-bold text-slate-800 text-sm truncate hover:text-indigo-700 transition-colors">{store.name}</h3>
                        </Link>
                        <p className="text-xs text-slate-400 mt-0.5">shopyvibe.id/{store.slug}</p>
                      </div>
                      <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ml-2">
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400">{store._count.products} produk</span>
                      <span className="text-xs text-slate-400">{formatDate(store.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer greeting */}
        <div className="mt-16 text-center text-xs text-slate-300">
          Masuk sebagai <span className="font-semibold">{userName}</span> · ShopyVibe © 2025
        </div>
      </div>
    </div>
  )
}
