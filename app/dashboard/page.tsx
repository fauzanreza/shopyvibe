import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { SignOutButton } from "@/components/auth/signout-button"
import { QrCodeIcon, CubeIcon, EyeIcon, ArrowTopRightOnSquareIcon, FunnelIcon } from "@heroicons/react/24/outline"
import { StoreFilter } from "@/components/store-filter"
import { Product } from "@prisma/client"

export default async function GlobalDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ storeId?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { storeId: filterStoreId } = await searchParams

  const userName = session.user.name ?? "there"
  const userInitials = userName !== "there"
    ? userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
    : "US"
  const userImage = session.user.image

  // Fetch all user stores for the filter dropdown
  const userStores = await db.store.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  // Fetch data: either all stores or the filtered store
  const storesData = await db.store.findMany({
    where: { 
      userId: session.user.id,
      ...(filterStoreId && filterStoreId !== "all" ? { id: filterStoreId } : {})
    },
    include: {
      _count: { select: { products: true, analytics: true } },
      products: { take: 5, orderBy: { createdAt: "desc" } },
      analytics: { take: 100, orderBy: { timestamp: "desc" } },
    },
  })

  // Aggregate stats
  let totalVisits = 0
  let totalProducts = 0
  let linkClicks = 0
  let qrScans = 0
  let allRecentProducts: Product[] = []

  storesData.forEach(store => {
    totalVisits += store._count.analytics
    totalProducts += store._count.products
    linkClicks += store.analytics.filter(a => a.type === "LINK_CLICK").length
    qrScans += store.analytics.filter(a => a.type === "QR_SCAN").length
    allRecentProducts = [...allRecentProducts, ...store.products]
  })

  // Sort aggregated products by date (newest first) and take top 5
  allRecentProducts = allRecentProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)

  const stats = [
    { label: "Total Kunjungan", value: totalVisits, icon: EyeIcon, color: "blue" },
    { label: "Klik Link", value: linkClicks, icon: ArrowTopRightOnSquareIcon, color: "indigo" },
    { label: "Scan QR", value: qrScans, icon: QrCodeIcon, color: "pink" },
    { label: "Total Produk", value: totalProducts, icon: CubeIcon, color: "emerald" },
  ]

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    pink: "bg-pink-50 text-pink-600",
    emerald: "bg-emerald-50 text-emerald-600",
  }

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
          <Link href="/templates" className="hover:text-slate-900 py-5 transition-colors">
            Templates
          </Link>
          <Link href="/dashboard" className="text-slate-900 font-bold border-b-2 border-slate-900 py-5 -mb-[2px] transition-colors">
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

      {/* Main Dashboard Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        
        {/* Header & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Global Dashboard</h1>
            <p className="text-slate-500">Pantau performa semua Vibes Anda di satu tempat.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
             <FunnelIcon className="w-4 h-4 text-slate-400" />
             <span className="text-sm font-medium text-slate-600">Filter:</span>
             <StoreFilter stores={userStores} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-slate-500 font-medium text-sm">{label}</span>
                <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-4xl font-black text-slate-800">{value}</div>
              {value === 0 && (
                <div className="text-xs font-medium text-slate-400 mt-2">Belum ada data</div>
              )}
            </div>
          ))}
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-lg">Produk Terbaru Ditambahkan</h3>
          </div>
          
          {allRecentProducts.length === 0 ? (
            <div className="p-16 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-4">📦</div>
              <p className="text-slate-800 font-bold mb-1">Belum ada produk</p>
              <p className="text-slate-500 text-sm">Tambahkan produk ke Vibe Anda untuk melihatnya di sini.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {allRecentProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-5 px-6 py-5 hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <CubeIcon className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-slate-800 truncate mb-0.5">{product.name}</p>
                    <p className="text-xs font-medium text-slate-500 flex items-center gap-2">
                       <span className="bg-slate-100 px-2 py-0.5 rounded-md">{product.stockStatus}</span>
                    </p>
                  </div>
                  <div className="text-base font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    {product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
