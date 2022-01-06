import { Image, Head, BlitzLayout, useQuery, Routes, Link as BlitzLink, useMutation } from "blitz"
import logo from "public/logo.png"

const WalletLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>Algo Custody</title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <SidebarWithHeader>{children}</SidebarWithHeader>
      </Suspense>
    </>
  )
}

import React, { ReactNode, Suspense } from "react"
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react"
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi"
import { IconType } from "react-icons"
import { ReactText } from "react"
import getWallets from "integrations/tatum/queries/getWallets"
import { AlgoWallet } from "@prisma/client"
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "../hooks/useCurrentUser"

function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={"#242333"}>
      <Test onClose={onClose} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Test onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex
        bg={"#15151e"}
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={2}
        borderStyle={"solid"}
        borderColor={"#016a7f"}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}></Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          <Suspense fallback="Loading...">
            <Login />
          </Suspense>
        </Stack>
      </Flex>
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  )
}

const Test = ({ onClose, ...rest }: SidebarProps) => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return null
  }
  return <SidebarContent onClose={onClose} />
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [wallets] = useQuery(getWallets, null)

  return (
    <Box
      transition="3s ease"
      bg={"#15151e"}
      borderRight="2px"
      borderRightColor={"#016a7f"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {wallets.map((wallet) => (
        <WalletNavItem wallet={wallet} key={wallet.name}>
          {wallet.name}
        </WalletNavItem>
      ))}
      <NavItem href={Routes.NewWalletPage().pathname}>Create Wallet</NavItem>
    </Box>
  )
}

interface WalletNavItemProps extends FlexProps {
  wallet: AlgoWallet
  children: ReactText
}
const WalletNavItem = ({ wallet, children, ...rest }: WalletNavItemProps) => {
  return (
    <BlitzLink href={Routes.ShowWalletPage({ walletAddress: wallet.address })}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#01B0D3",
          color: "white",
        }}
        {...rest}
      >
        {children}
      </Flex>
    </BlitzLink>
  )
}

interface NavItemProps extends FlexProps {
  href: string
  children: ReactText
}
const NavItem = ({ href, children, ...rest }: NavItemProps) => {
  return (
    <BlitzLink href={href}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#01B0D3",
          color: "white",
        }}
        {...rest}
      >
        {children}
      </Flex>
    </BlitzLink>
  )
}

const Login = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"red.400"}
          onClick={async () => {
            await logoutMutation()
          }}
          _hover={{
            bg: "red.300",
          }}
        >
          Logout
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={400}
          variant={"link"}
          href={Routes.LoginPage().pathname}
        >
          Sign In
        </Button>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          href={Routes.SignupPage().pathname}
          _hover={{
            bg: "pink.300",
          }}
        >
          Sign Up
        </Button>
      </>
    )
  }
}

export default WalletLayout
