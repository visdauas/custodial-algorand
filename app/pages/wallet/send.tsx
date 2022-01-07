import { useRouter, useMutation, BlitzPage, Routes, useParam, useQuery } from "blitz"
import WalletLayout from "app/core/layouts/WalletLayout"
import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Box, Button } from "@chakra-ui/react"
import sendTransaction from "integrations/tatum/mutations/sendTransaction"

const SendPage: BlitzPage = () => {
  const router = useRouter()
  const [sendTransactionMutation] = useMutation(sendTransaction)
  const query = new URLSearchParams(location.search)
  const walletAddress = query.get("walletAddress")

  console.log(walletAddress)
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
        initialValues={{
          addressFrom: walletAddress,
          addressTo: "",
          amount: "0",
          fee: "0.001",
          note: "",
        }}
        onSubmit={async (values) => {
          try {
            await sendTransactionMutation(values)
            router.push(Routes.ShowWalletPage({ walletAddress: walletAddress! }))
          } catch (error: any) {
            console.error(error)
          }
        }}
      >
        <LabeledTextField name="addressFrom" label="Address From" placeholder="Address From" />
        <LabeledTextField name="addressTo" label="Address To" placeholder="Address To" />
        <LabeledTextField name="amount" label="Amount" placeholder="0" />
        <LabeledTextField name="fee" label="Fee" placeholder="0" />
        <LabeledTextField name="note" label="Note" placeholder="" />
        <Button
          type="submit"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Send
        </Button>
      </Form>
    </Box>
  )
}

SendPage.authenticate = true
SendPage.getLayout = (page) => <WalletLayout title={"Send"}>{page}</WalletLayout>
SendPage.suppressFirstRenderFlicker = true

export default SendPage
