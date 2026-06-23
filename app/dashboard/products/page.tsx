import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createProduct, deleteProduct } from "@/actions/product"
import { Button } from "@/components/ui/button"

export default async function ProductsDashboard() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const store = await db.store.findUnique({
    where: { userId: session.user.id },
    include: { products: true }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Katalog Produk</h2>
          <p className="text-slate-500 text-sm mt-1">Kelola daftar produk untuk {store?.name || "Toko Anda"}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Tambah Produk Baru</h3>
        <form action={createProduct} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nama Produk</label>
            <input type="text" name="name" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Harga (Rp)</label>
            <input type="number" name="price" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
            <textarea name="description" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Image URL</label>
            <input type="text" name="imageUrl" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
          </div>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Tambah Produk</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {store?.products.map((product) => (
          <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
             {product.imageUrl && (
               <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover" />
             )}
             <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-lg text-slate-900">{product.name}</h4>
                <p className="text-indigo-600 font-semibold mb-2">Rp {product.price.toLocaleString('id-ID')}</p>
                <p className="text-sm text-slate-500 flex-1">{product.description}</p>
                
                <form action={async () => {
                  "use server"
                  await deleteProduct(product.id)
                }} className="mt-4">
                  <Button type="submit" variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                    Hapus Produk
                  </Button>
                </form>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
