import { Routes, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupFormm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react"

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.800"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up to Algo Custody</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Already a user?{" "}
            <Link href={Routes.LoginPage().pathname} color={"blue.400"}>
              Login!
            </Link>
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
          <Stack spacing={2}>
            <Form
              schema={Signup}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  await signupMutation(values)
                  props.onSuccess?.()
                } catch (error: any) {
                  if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                    // This error comes from Prisma
                    return { email: "This email is already being used" }
                  } else {
                    return { [FORM_ERROR]: error.toString() }
                  }
                }
              }}
            >
              <LabeledTextField name="email" label="Email" placeholder="Email" />
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Stack spacing={5}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignupForm
