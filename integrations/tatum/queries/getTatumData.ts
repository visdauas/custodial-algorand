import { Ctx } from "blitz"
import db from "db"
import { generateWallet, Currency } from '@tatumio/tatum';

type Wallet = {
    address?: string,
    privateKey?: string,
    mnemonic?: string,
}

export default async function getTatumData(_ = null, { session }: Ctx) {
    if (!session.userId) return null

    const algoWallet: Wallet = await generateWallet(Currency.ALGO, true)
    return algoWallet.address
}
