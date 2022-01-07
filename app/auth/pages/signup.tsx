import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import WalletLayout from "app/core/layouts/WalletLayout"

const SignupPage: BlitzPage = () => {
  return (
    <div>
      <SignupForm />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <WalletLayout title="Sign Up">{page}</WalletLayout>

export default SignupPage
