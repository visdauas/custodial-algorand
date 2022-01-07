import { BlitzPage } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import WalletLayout from "app/core/layouts/WalletLayout"

const LoginPage: BlitzPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <WalletLayout title="Log In">{page}</WalletLayout>

export default LoginPage
