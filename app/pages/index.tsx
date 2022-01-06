import { Suspense } from "react"
import { BlitzPage } from "blitz"
import { Box, Text, Stack, Heading, Container } from "@chakra-ui/react"
import WalletLayout from "app/core/layouts/WalletLayout"

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={"loading..."}>
        <CallToActionWithAnnotation />
      </Suspense>
    </div>
  )
}

function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Algorand <br />
            <Text as={"span"} color={"#01B0D3"}>
              Custody
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            This is a demo of an Algorand custodial wallet service. Built for a demo purpose only.
            Please do not use this in a production environment.
          </Text>
        </Stack>
      </Container>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => (
  <WalletLayout title="Home">
    <Home />
  </WalletLayout>
)

export default Home
