"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createStore(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const name = formData.get("name") as string
  const slug = formData.get("slug") as string

  if (!name || !slug) {
    return { error: "Missing required fields" }
  }

  try {
    const existingStore = await db.store.findUnique({
      where: { slug }
    })

    if (existingStore) {
      return { error: "Slug already taken" }
    }

    await db.store.create({
      data: {
        userId: session.user.id,
        name,
        slug,
      }
    })

    revalidatePath("/dashboard")
    return { success: "Store created" }
  } catch (error) {
    return { error: "Failed to create store" }
  }
}

export async function updateStoreTheme(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const themeConfig = formData.get("themeConfig") as string

  try {
    const store = await db.store.findUnique({
      where: { userId: session.user.id }
    })

    if (!store) {
      return { error: "Store not found" }
    }

    await db.store.update({
      where: { id: store.id },
      data: { themeConfig }
    })

    revalidatePath("/dashboard")
    revalidatePath(`/${store.slug}`)
    return { success: "Theme updated" }
  } catch (error) {
    return { error: "Failed to update theme" }
  }
}
