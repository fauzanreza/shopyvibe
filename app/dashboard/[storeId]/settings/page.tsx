import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { headers } from "next/headers"
import { db } from "@/lib/db"

export default async function StoreSettingsPage({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { storeId } = await params
  const store = await db.store.findFirst({
    where: { id: storeId, userId: session.user.id },
  })

  if (!store) notFound()

  const headersList = await headers()
  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "shopyvibe.id"

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Pengaturan Toko</h2>
        <p className="text-slate-500 mt-1">Kelola identitas dan konfigurasi toko Anda.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-800 text-lg">Informasi Dasar</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Toko</label>
            <input type="text" defaultValue={store.name} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
            <div className="flex items-center">
              <span className="px-4 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-slate-500 font-medium">{host}/</span>
              <input type="text" defaultValue={store.slug} className="flex-1 border border-slate-200 rounded-r-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div className="pt-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-red-100 bg-red-50/50">
          <h3 className="font-bold text-red-800 text-lg">Zona Bahaya</h3>
        </div>
        <div className="p-6">
          <p className="text-slate-600 text-sm mb-4">Menghapus toko akan menghapus semua produk, analitik, dan data pelanggan secara permanen.</p>
          <button className="bg-red-100 text-red-700 hover:bg-red-200 font-bold px-6 py-2.5 rounded-lg transition-colors border border-red-200">
            Hapus Toko Permanen
          </button>
        </div>
      </div>
    </div>
  )
}
