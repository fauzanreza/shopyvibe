"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createProduct(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const name = formData.get("name") as string
  const priceStr = formData.get("price") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const stockStatus = formData.get("stockStatus") as string || "IN_STOCK"

  const price = parseFloat(priceStr)

  if (!name || isNaN(price)) {
    return { error: "Missing required fields" }
  }

  try {
    const store = await db.store.findUnique({
      where: { userId: session.user.id }
    })

    if (!store) {
      return { error: "No store found for user" }
    }

    await db.product.create({
      data: {
        storeId: store.id,
        name,
        price,
        description,
        imageUrl,
        stockStatus
      }
    })

    revalidatePath("/dashboard/products")
    revalidatePath(`/${store.slug}`)
    return { success: "Product created" }
  } catch (error) {
    return { error: "Failed to create product" }
  }
}

export async function deleteProduct(productId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const store = await db.store.findUnique({
      where: { userId: session.user.id }
    })

    if (!store) {
      return { error: "No store found" }
    }

    await db.product.delete({
      where: {
        id: productId,
        storeId: store.id
      }
    })

    revalidatePath("/dashboard/products")
    revalidatePath(`/${store.slug}`)
    return { success: "Product deleted" }
  } catch (error) {
    return { error: "Failed to delete product" }
  }
}
