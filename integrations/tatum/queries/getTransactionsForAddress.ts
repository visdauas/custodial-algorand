import { resolver } from "blitz"
import { z } from "zod"
import superagent from "superagent"

const GetTransactionsForAddress = z.object({
  address: z.string(),
})

const headers = {
  "x-api-key": process.env.ALGORAND_TESTNET_API_KEY,
}

export default resolver.pipe(
  resolver.zod(GetTransactionsForAddress),
  resolver.authorize(),
  async ({ address }, ctx) => {
    const response = await superagent
      .get(
        process.env.ALGORAND_TESTNET_API_INDEXER_URL + "/idx2/v2/transactions?address=" + address
      )
      .set("x-api-key", process.env.ALGORAND_TESTNET_API_KEY)
      .then((res) => res.body)
    return response
  }
)
