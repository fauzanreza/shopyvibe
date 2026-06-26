import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { 
  HomeIcon, CubeIcon, QrCodeIcon, Cog6ToothIcon, ChevronLeftIcon, 
  ChartBarIcon, ShoppingBagIcon, UsersIcon, TagIcon, PaintBrushIcon, PuzzlePieceIcon
} from "@heroicons/react/24/outline"
import { SignOutButton } from "@/components/auth/signout-button"
import { VibePropWidget } from "@/components/vibe-pro-widget"

export default async function StoreDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ storeId: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { storeId } = await params

  const store = await db.store.findFirst({
    where: { id: storeId, userId: session.user.id },
  })

  if (!store) notFound()

  const userName = session.user.name ?? "User"
  const userInitials = userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
  const userImage = session.user.image

  const navGroups = [
    {
      title: "Main",
      links: [
        { href: `/dashboard/${storeId}`, label: "Overview", icon: HomeIcon },
        { href: `/dashboard/${storeId}/analytics`, label: "Analitik", icon: ChartBarIcon },
      ]
    },
    {
      title: "Sales & Catalog",
      links: [
        { href: `/dashboard/${storeId}/orders`, label: "Pesanan", icon: ShoppingBagIcon },
        { href: `/dashboard/${storeId}/products`, label: "Katalog Produk", icon: CubeIcon },
        { href: `/dashboard/${storeId}/customers`, label: "Pelanggan", icon: UsersIcon },
      ]
    },
    {
      title: "Marketing",
      links: [
        { href: `/dashboard/${storeId}/discounts`, label: "Diskon & Promo", icon: TagIcon },
        { href: `/dashboard/${storeId}/qr`, label: "QR Engine (O2O)", icon: QrCodeIcon },
      ]
    },
    {
      title: "Storefront & System",
      links: [
        { href: `/dashboard/${storeId}/design`, label: "Desain Tema", icon: PaintBrushIcon },
        { href: `/dashboard/${storeId}/integrations`, label: "Integrasi", icon: PuzzlePieceIcon },
        { href: `/dashboard/${storeId}/settings`, label: "Store Settings", icon: Cog6ToothIcon },
      ]
    }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        {/* Back to vibes with logo */}
        <div className="p-4 border-b border-slate-100">
          <Link
            href="/vibes"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium"
          >
            <Image src="/logo.png" alt="ShopyVibe" width={22} height={22} className="rounded-md opacity-70" />
            <ChevronLeftIcon className="w-3 h-3" />
            Semua Vibe
          </Link>
        </div>

        {/* Store identity */}
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg flex-shrink-0">
              {store.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-800 text-sm truncate">{store.name}</div>
              <div className="text-xs text-slate-400 truncate">/{store.slug}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{group.title}</h3>
              <div className="space-y-1">
                {group.links.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-700 rounded-lg font-medium transition-colors text-sm"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-3">
            {userImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userImage} alt={userName} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                {userInitials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-700 truncate">{userName}</div>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-6 sticky top-0 z-20">
          <h1 className="text-sm font-semibold text-slate-500">
            <span className="text-slate-800 font-bold">{store.name}</span>
            <span className="mx-2 text-slate-300">/</span>Dashboard
          </h1>
        </header>
        <div className="p-6 md:p-8">{children}</div>
      </main>

      {/* Floating Vibe Pro widget */}
      <VibePropWidget />
    </div>
  )
}
