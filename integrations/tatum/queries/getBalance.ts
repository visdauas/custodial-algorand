import { algorandGetAccountBalance } from '@tatumio/tatum';
import { resolver } from "blitz"
import { z } from "zod"

const GetBalance = z.object({
    address: z.string(),
})

export default resolver.pipe(resolver.zod(GetBalance), resolver.authorize(), async ({ address }) => {
    const balance = await algorandGetAccountBalance(address)

    return balance
})
