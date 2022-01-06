import {
  AuthenticationError,
  Link as BlitzLink,
  useMutation,
  Routes,
  PromiseReturnType,
} from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginFormm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <h1>Login</h1>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <BlitzLink href={Routes.SignupPage()}>Sign Up</BlitzLink>
      </div>
    </div>
  )
}
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react"

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.800"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Don&apos;t have an account yet?{" "}
            <Link href={Routes.SignupPage().pathname} color={"blue.400"}>
              Sign up!
            </Link>
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <Form
              schema={Login}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  const user = await loginMutation(values)
                  props.onSuccess?.(user)
                } catch (error: any) {
                  if (error instanceof AuthenticationError) {
                    return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                  } else {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " +
                        error.toString(),
                    }
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
                  Sign in
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default LoginForm
