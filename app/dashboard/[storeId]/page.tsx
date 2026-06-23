import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import Link from "next/link"
import { QrCodeIcon, CubeIcon, EyeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

export default async function StoreDashboardPage({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { storeId } = await params

  const store = await db.store.findFirst({
    where: { id: storeId, userId: session.user.id },
    include: {
      _count: { select: { products: true, analytics: true } },
      products: { take: 5, orderBy: { createdAt: "desc" } },
      analytics: { take: 100, orderBy: { timestamp: "desc" } },
    },
  })

  if (!store) notFound()

  const totalVisits = store._count.analytics
  const totalProducts = store._count.products
  const linkClicks = store.analytics.filter(a => a.type === "LINK_CLICK").length
  const qrScans = store.analytics.filter(a => a.type === "QR_SCAN").length

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {store.name} 👋
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Ringkasan performa toko Anda · shopyvibe.id/{store.slug}
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link
            href={`/${store.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 text-slate-600 px-4 py-2 rounded-xl transition-colors"
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            Lihat Toko
          </Link>
          <Link
            href={`/dashboard/${storeId}/products`}
            className="inline-flex items-center gap-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors"
          >
            <CubeIcon className="w-4 h-4" />
            Kelola Produk
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="text-slate-500 font-medium text-xs">{label}</span>
              <div className={`p-2 rounded-lg ${colorMap[color]}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-800">{value}</div>
            {value === 0 && (
              <div className="text-xs text-slate-400 mt-1">Belum ada data</div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Produk Terbaru</h3>
          <Link
            href={`/dashboard/${storeId}/products`}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Lihat Semua
          </Link>
        </div>
        {store.products.length === 0 ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-slate-500 text-sm font-medium">Belum ada produk</p>
            <Link
              href={`/dashboard/${storeId}/products`}
              className="mt-4 text-sm text-indigo-600 hover:underline font-medium"
            >
              + Tambah Produk Pertama
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {store.products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <CubeIcon className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{product.name}</p>
                  <p className="text-xs text-slate-400">{product.stockStatus}</p>
                </div>
                <div className="text-sm font-bold text-slate-700 flex-shrink-0">
                  {product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Empty analytics notice */}
      {totalVisits === 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 flex items-center gap-4">
          <div className="text-3xl">📊</div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Analitik akan muncul di sini</p>
            <p className="text-slate-500 text-xs mt-0.5">
              Bagikan link toko Anda dan data kunjungan akan terlihat secara real-time.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
