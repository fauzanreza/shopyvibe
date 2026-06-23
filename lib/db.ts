import { PrismaClient } from "@prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createAdapter() {
  // Parse DATABASE_URL manually to handle special chars in password
  // Format: mysql://user:password@host:port/database
  const url = process.env.DATABASE_URL ?? ""
  const match = url.match(/mysql:\/\/([^:]+):(.+)@([^:]+):(\d+)\/(.+)/)

  if (match) {
    const [, user, password, host, port, database] = match
    return new PrismaMariaDb({
      host,
      port: parseInt(port),
      user,
      password,
      database,
      connectionLimit: 5,
    })
  }

  throw new Error("Invalid DATABASE_URL format")
}

const adapter = createAdapter()

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
