import { resolver, NotFoundError, Ctx } from "blitz"
import { z } from "zod"
import db from "db"
import { getExchangeRate, Currency, Fiat } from "@tatumio/tatum"

export default async function getAlgoExchangeRate(_ = null, { session }: Ctx) {
    if (!session.userId) return null

    const price = getExchangeRate(Currency.ALGO, Fiat.USD)

    return price
}