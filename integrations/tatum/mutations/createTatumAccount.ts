import { Account, Currency, CreateAccount, createAccount } from "@tatumio/tatum";
import db from "db"
import { NotFoundError, resolver, Ctx } from "blitz"


export default async function CreateTatumAccount(ctx: Ctx) {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const user = await db.user.findFirst({
        where: { id: ctx.session.userId! }
    })
    if (!user) throw new NotFoundError()
    if(user.tatumAccountId) throw new Error("User already has a Tatum account")

    const createAccountData: CreateAccount = {
        currency: Currency.ALGO
    };

    const account: Account = await createAccount(createAccountData);

    await db.user.update({
        where: { id: ctx.session.userId! },
        data: { tatumAccountId: account.id },
    })

    console.log(account)
}
