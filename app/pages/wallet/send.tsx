import { Link, useRouter, useMutation, BlitzPage, Routes, useParam, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import createQuestion from "app/questions/mutations/createQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"
import { createQuestionSchema } from "app/questions/validations"
import createWallet from "integrations/tatum/mutations/createWallet"
import NewQuestionPage from "../questions/new"
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
        initialValues={{ addressFrom: walletAddress, addressTo: "", amount: "0", fee: "0.01" }}
        onSubmit={async (values) => {
          try {
            await sendTransactionMutation(values)
            router.push(Routes.ShowWalletPage({ walletAddress: walletAddress! }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      >
        <LabeledTextField name="addressFrom" label="Address From" placeholder="Address From" />
        <LabeledTextField name="addressTo" label="Address To" placeholder="Address To" />
        <LabeledTextField name="amount" label="Amount" placeholder="0" />
        <LabeledTextField name="fee" label="Fee" placeholder="0" />
        <Button
          type="submit"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Send
        </Button>{" "}
      </Form>
    </Box>
  )
}

SendPage.authenticate = true
SendPage.getLayout = (page) => <WalletLayout title={"Send"}>{page}</WalletLayout>

export default SendPage
