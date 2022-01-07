import {
  Image,
  Head,
  BlitzLayout,
  useQuery,
  Routes,
  Link as BlitzLink,
  useMutation,
  useRouter,
} from "blitz"
import logo from "public/logo.png"
import React, { ReactNode, Suspense } from "react"
import {
  Box,
  CloseButton,
  Flex,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react"
import { ReactText } from "react"
import getWallets from "integrations/tatum/queries/getWallets"
import { AlgoWallet } from "@prisma/client"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "../hooks/useCurrentUser"

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

function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={"#242333"} color={"white"}>
      <LoginSidebar />
      <Flex
        bg={"#15151e"}
        minH={"3vh"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={2}
        borderStyle={"solid"}
        borderColor={"#016a7f"}
        align={"center"}
        justify={{ base: "start", md: "end" }}
      >
        <LoginLogo />
        <Flex flex={{ base: 1 }} justify={{ base: "start", md: "center" }}>
          <Text fontWeight={600} fontSize={{ base: "3xl" }} fontFamily={"monospace"}>
            Algorand Custody
          </Text>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          <Suspense fallback="Loading...">
            <Login />
          </Suspense>
        </Stack>
      </Flex>
      <BasePage>{children}</BasePage>
    </Box>
  )
}

const BasePage = ({ children }: { children: ReactNode }) => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return <Box ml={{ base: 0, md: 60 }}>{children}</Box>
  }
  return <Box>{children}</Box>
}

const LoginLogo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return null
  }
  return <Image src={logo} alt="Logo" width={50} height={50} />
}

const LoginSidebar = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return null
  }
  return <SidebarContent />
}

const SidebarContent = () => {
  let [wallets] = useQuery(getWallets, null)

  if (!wallets) {
    wallets = []
  }

  return (
    <Box
      transition="3s ease"
      bg={"#15151e"}
      borderRight="2px"
      borderRightColor={"#016a7f"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </Flex>
      {wallets!.map((wallet) => (
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
  const router = useRouter()

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
            router.push(Routes.Home())
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
          bg={"#01B0D3"}
          href={Routes.SignupPage().pathname}
          _hover={{
            bg: "#01B0D3",
          }}
        >
          Sign Up
        </Button>
      </>
    )
  }
}

export default WalletLayout
