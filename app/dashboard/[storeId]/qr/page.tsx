import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { headers } from "next/headers"
import { db } from "@/lib/db"
import { QRGenerator } from "@/components/qr-generator"

export default async function QRPage({
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

  // Construct the absolute URL dynamically based on the current host
  const headersList = await headers()
  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "shopyvibe.id"
  const protocol = host.includes("localhost") ? "http" : "https"
  const storeLink = `${protocol}://${host}/${store.slug}`

  return <QRGenerator storeLink={storeLink} />
}
