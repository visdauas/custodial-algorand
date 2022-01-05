import {  assignDepositAddress, generateAlgoWallet, generateDepositAddress } from "@tatumio/tatum"
import db from "db"
import { z } from "zod"
import { NotFoundError, resolver } from "blitz"

export const CreateWallet = z.object({
    name: z.string().nonempty({ message: "You must enter a name." }),
})

export default resolver.pipe(resolver.zod(CreateWallet), resolver.authorize(), async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    const algoWallet = await generateAlgoWallet()
    const address = await assignDepositAddress(user.tatumAccountId!, algoWallet.address)

    await db.algoWallet.create({
        data: { name: input.name, address: algoWallet.address!, secret: algoWallet.secret!, userId: user.id },
    })
})
