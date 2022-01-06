import { Ctx } from "blitz"
import { algorandGetCurrentBlock } from "@tatumio/tatum"

export default async function getCurrentBlock(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const currentBlockNum = await algorandGetCurrentBlock()
  return currentBlockNum
}
