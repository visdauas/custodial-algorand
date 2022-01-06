import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createQuestion from "app/questions/mutations/createQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"
import { createQuestionSchema } from "app/questions/validations"
import createWallet from "integrations/tatum/mutations/createWallet"
import NewQuestionPage from "../questions/new"
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
            return {
              [FORM_ERROR]: error.toString(),
            }
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
        </Button>{" "}
      </Form>
    </div>
  )
}

NewWalletPage.authenticate = true
NewWalletPage.getLayout = (page) => <WalletLayout title={"Create Wallet"}>{page}</WalletLayout>

export default NewWalletPage
