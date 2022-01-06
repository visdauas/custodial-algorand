import { Ctx } from "blitz"
import db from "db"
import { getAccountBalance as getTatumAccounBalance } from "@tatumio/tatum"

export default async function getAccountBalance(_ = null, ctx: Ctx) {
  if (!ctx.session.userId) return null

  const user = await db.user.findFirst({
    where: { id: ctx.session.userId! },
  })

  const balance = getTatumAccounBalance(user!.tatumAccountId!)

  return balance
}
