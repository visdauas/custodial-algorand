import { resolver, SecurePassword, useMutation } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import CreateTatumAccount from "integrations/tatum/mutations/createTatumAccount"
import createWallet from "integrations/tatum/mutations/createWallet"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  // register to Tatum
  await CreateTatumAccount(ctx)

  // return primary address
  return await createWallet({ name: "Primary" }, ctx)
})
