import { Suspense } from "react"
import { Image, Link as BlitzLink, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"

import { generateWallet, Currency } from "@tatumio/tatum"

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons"

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={"loading..."}>
        <CallToActionWithAnnotation />
      </Suspense>
    </div>
  )
}
import { Head } from "blitz"
import WalletLayout from "app/core/layouts/WalletLayout"

import { Heading, Container, createIcon } from "@chakra-ui/react"

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
