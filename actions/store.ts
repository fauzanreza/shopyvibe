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
  const layoutMode = formData.get("layoutMode") as any
  const logo = formData.get("logo") as string

  try {
    const store = await db.store.findUnique({
      where: { userId: session.user.id }
    })

    if (!store) {
      return { error: "Store not found" }
    }

    const dataToUpdate: any = {}
    if (themeConfig) dataToUpdate.themeConfig = themeConfig;
    if (layoutMode && layoutMode !== "CUSTOM") dataToUpdate.layoutMode = layoutMode;
    if (logo) dataToUpdate.logo = logo;

    await db.store.update({
      where: { id: store.id },
      data: dataToUpdate
    })

    revalidatePath("/", "layout")
    return { success: "Theme updated" }
  } catch (error) {
    console.error("updateStoreTheme ERROR:", error);
    return { error: "Failed to update theme" }
  }
}

export async function publishVibe(data: {
  name: string
  slug: string
  layoutMode: "ECOMMERCE" | "SERVICE" | "CAMPAIGN" | "BIO"
  themeConfig: string
}) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const { name, slug, layoutMode, themeConfig } = data

  if (!name || !slug) {
    return { error: "Missing name or slug" }
  }

  try {
    // Check if store already exists for user
    const existingStore = await db.store.findUnique({
      where: { userId: session.user.id }
    })

    if (existingStore) {
      // If updating, check if new slug is taken by someone else
      if (existingStore.slug !== slug) {
        const slugTaken = await db.store.findUnique({ where: { slug } })
        if (slugTaken) return { error: "Slug already taken" }
      }

      await db.store.update({
        where: { id: existingStore.id },
        data: {
          name,
          slug,
          layoutMode,
          themeConfig
        }
      })
    } else {
      // Create new store
      const slugTaken = await db.store.findUnique({ where: { slug } })
      if (slugTaken) return { error: "Slug already taken" }

      await db.store.create({
        data: {
          userId: session.user.id,
          name,
          slug,
          layoutMode,
          themeConfig
        }
      })
    }

    revalidatePath("/dashboard")
    revalidatePath(`/${slug}`)
    return { success: "Vibe published successfully" }
  } catch (error) {
    console.error("publishVibe error:", error)
    return { error: "Failed to publish vibe" }
  }
}
