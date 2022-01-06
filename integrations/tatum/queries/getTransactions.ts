import { Ctx, NotFoundError } from "blitz"
import db from "db"
import { getTransactionsByAccount, TransactionFilter } from "@tatumio/tatum"

export default async function getTransactions(_ = null, ctx: Ctx) {
  const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
  if (!user) throw new NotFoundError()

  const filter: TransactionFilter = { id: user.tatumAccountId! }

  const transactions = await getTransactionsByAccount(filter)
  return transactions
}
