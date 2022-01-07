import { useRouter, useMutation, BlitzPage, Routes } from "blitz"
import createWallet from "integrations/tatum/mutations/createWallet"
import WalletLayout from "app/core/layouts/WalletLayout"
import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Box, Button } from "@chakra-ui/react"

const NewWalletPage: BlitzPage = () => {
  const router = useRouter()
  const [createWalletMutation] = useMutation(createWallet)

  return (
    <Box
      shadow={"xl"}
      border={"1.5px solid"}
      borderColor={"#01B0D3"}
      rounded={"lg"}
      margin={5}
      padding={5}
    >
      <Form
        initialValues={{ name: "" }}
        onSubmit={async (values) => {
          try {
            const wallet = await createWalletMutation(values)
            router.push(Routes.ShowWalletPage({ walletAddress: wallet }))
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
    </Box>
  )
}

NewWalletPage.authenticate = true
NewWalletPage.getLayout = (page) => <WalletLayout title={"Create Wallet"}>{page}</WalletLayout>
NewWalletPage.suppressFirstRenderFlicker = true

export default NewWalletPage
