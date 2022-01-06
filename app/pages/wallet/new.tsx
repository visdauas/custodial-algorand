import { useRouter, useMutation, BlitzPage, Routes } from "blitz"
import createWallet from "integrations/tatum/mutations/createWallet"
import WalletLayout from "app/core/layouts/WalletLayout"
import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Button } from "@chakra-ui/react"

const NewWalletPage: BlitzPage = () => {
  const router = useRouter()
  const [createWalletMutation] = useMutation(createWallet)

  return (
    <div>
      <Form
        initialValues={{ name: "" }}
        onSubmit={async (values) => {
          try {
            const wallet = await createWalletMutation(values)
            router.replace(Routes.ShowWalletPage({ walletAddress: wallet.address }))
          } catch (error: any) {
            console.error(error)
          }
        }}
      >
        <LabeledTextField name="name" label="Name" placeholder="Name" />
        <Button
          type="submit"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Create
        </Button>
      </Form>
    </div>
  )
}

NewWalletPage.authenticate = true
NewWalletPage.getLayout = (page) => <WalletLayout title={"Create Wallet"}>{page}</WalletLayout>

export default NewWalletPage
