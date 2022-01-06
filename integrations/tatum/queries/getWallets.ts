import { NotFoundError, Ctx } from "blitz"
import db from "db"

export default async function getWallets(_ = null, { session }: Ctx) {
  const user = await db.user.findFirst({
    where: { id: session.userId! },
    include: { algoWallets: true },
  })
  if (!user) throw new NotFoundError()

  return user.algoWallets
}
