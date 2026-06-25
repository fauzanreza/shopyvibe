import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { DesignClient } from "./design-client"

export default async function StoreDesignPage({
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

  return <DesignClient store={store} />
}
