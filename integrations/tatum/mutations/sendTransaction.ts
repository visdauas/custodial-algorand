import { algorandGetAccountBalance, AlgoTransaction } from "@tatumio/tatum"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import request from "request"

const SendTransaction = z.object({
  addressFrom: z.string().nonempty({ message: "You must enter an address." }),
  addressTo: z.string().nonempty({ message: "You must enter an address." }),
  amount: z.string().nonempty({ message: "You must enter an amount." }),
  fee: z.string().nonempty({ message: "You must enter an fee." }),
  note: z.string(),
})

const headers = {
  "x-api-key": process.env.TATUM_API_KEY,
  "content-type": "application/json",
}

export default resolver.pipe(
  resolver.zod(SendTransaction),
  resolver.authorize(),
  async ({ addressFrom, addressTo, amount, fee, note }, ctx) => {
    const balance = await algorandGetAccountBalance(addressFrom)
    if (Number(balance.toString()) < Number(amount)) throw new Error("Insufficient funds")

    const user = await db.user.findFirst({
      where: { id: ctx.session.userId! },
      include: { algoWallets: true },
    })
    const [wallet] = user?.algoWallets.filter((t) => t.address === addressFrom)!

    const tx: AlgoTransaction = {
      from: wallet?.address!,
      to: addressTo,
      fee: fee,
      amount: amount,
      note: note,
      fromPrivateKey: wallet?.secret,
    }

    request.post({
      headers: headers,
      url: process.env.TATUM_API_URL + "/v3/algorand/transaction",
      body: JSON.stringify(tx),
    })
  }
)
