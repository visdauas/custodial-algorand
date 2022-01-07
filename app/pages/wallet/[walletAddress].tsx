import { Suspense } from "react"
import { useRouter, useQuery, useParam, BlitzPage, Routes } from "blitz"
import getTransactionsForAddress from "integrations/tatum/queries/getTransactionsForAddress"
import WalletLayout from "app/core/layouts/WalletLayout"
import {
  List,
  ListItem,
  Button,
  Text,
  Link,
  Flex,
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
import getBalance from "integrations/tatum/queries/getBalance"
import getCurrentBlock from "integrations/tatum/queries/getCurrentBlock"

export const Wallet = () => {
  const router = useRouter()
  const walletAddress = useParam("walletAddress", "string")
  const [transactions] = useQuery(getTransactionsForAddress, { address: walletAddress! })
  const [balance] = useQuery(getBalance, { address: walletAddress! })
  const [currentBlockNum] = useQuery(getCurrentBlock, null)

  return (
    <>
      <Box margin={5}>
        <StatsCard title={"Address"} stat={walletAddress!} />
      </Box>
      <SimpleGrid margin={5} columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"Balance"} stat={balance + " ALGO"} />
        <StatsCard title={"Current Block"} stat={currentBlockNum!.toString()} />
      </SimpleGrid>
      <Flex
        bg={"#242333"}
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderTop={2}
        borderStyle={"solid"}
        borderColor={"#016a7f"}
      >
        <Flex flex={{ base: 1 }} justify={"start"}>
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Transactions
          </Text>
        </Flex>

        <Flex flex={{ base: 1 }} justify={"end"}>
          <Button
            bg={"#01B0D3"}
            onClick={() => router.push(Routes.SendPage({ walletAddress: walletAddress }))}
          >
            Send
          </Button>
        </Flex>
      </Flex>

      <List spacing={1} margin={2}>
        <ListItem bg={"#242333"}>
          <SimpleGrid columns={{ base: 1, md: 6 }} spacing={{ base: 5, lg: 8 }}>
            <Text align="center" fontFamily="monospace" fontWeight="semibold" fontSize="xl">
              TxID
            </Text>
            <Text align="center" fontFamily="monospace" fontWeight="semibold" fontSize="xl">
              Block
            </Text>
            <Text align="center" fontFamily="monospace" fontWeight="semibold" fontSize="xl">
              Type
            </Text>
            <Text align="center" fontFamily="monospace" fontWeight="semibold" fontSize="xl">
              From
            </Text>
            <Text align="center" fontFamily="monospace" fontWeight="semibold" fontSize="xl">
              To
            </Text>
            <Text align="center" fontFamily="monospace" fontWeight="semibold" fontSize="xl">
              Amount
            </Text>
          </SimpleGrid>
        </ListItem>
        {transactions.transactions.map((transaction) => (
          <ListItem
            key={transaction.txId}
            border={"1.5px solid"}
            rounded={"md"}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            bg={"#1D2228"}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            borderColor={"#01B0D3"}
          >
            <TransactionCard transaction={transaction} walletAddress={walletAddress!} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

interface StatsCardProps {
  title: string
  stat: string
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1.5px solid"}
      borderColor={"#01B0D3"}
      rounded={"lg"}
    >
      <StatLabel fontSize={"large"} fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"medium"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  )
}

interface TransactionCardProps {
  transaction: any
  walletAddress: string
}

function TransactionCard(props: TransactionCardProps) {
  const { transaction, walletAddress } = props
  return (
    <SimpleGrid columns={{ base: 1, md: 6 }} spacing={{ base: 5, lg: 8 }} margin={"3"}>
      <Text isTruncated>
        <Link target="_blank" href={"https://testnet.algoexplorer.io/tx/" + transaction.id}>
          {transaction.id}
        </Link>
      </Text>
      <Link
        target="_blank"
        href={"https://testnet.algoexplorer.io/block/" + transaction["confirmed-round"]}
      >
        {transaction["confirmed-round"]}
      </Link>
      <Text>{transaction.sender == walletAddress ? "Sent" : "Received"}</Text>
      <Text isTruncated>
        <Link
          target="_blank"
          href={"https://testnet.algoexplorer.io/address/" + transaction.sender}
        >
          {transaction.sender}
        </Link>
      </Text>
      <Text isTruncated>
        <Link
          target="_blank"
          href={
            "https://testnet.algoexplorer.io/address/" + transaction["payment-transaction"].receiver
          }
        >
          {transaction["payment-transaction"].receiver}
        </Link>
      </Text>
      <Text>{transaction["payment-transaction"].amount / 1000000} ALGO</Text>
    </SimpleGrid>
  )
}

const ShowWalletPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Wallet />
      </Suspense>
    </div>
  )
}

ShowWalletPage.authenticate = true
ShowWalletPage.getLayout = (page) => <WalletLayout>{page}</WalletLayout>
ShowWalletPage.suppressFirstRenderFlicker = true

export default ShowWalletPage
