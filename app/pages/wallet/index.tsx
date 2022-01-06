import { Suspense } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  useQuery,
  useMutation,
} from "blitz"
import WalletLayout from "app/core/layouts/WalletLayout"

export const Wallets = () => {
  //const tatum = useTatum()
  //const [createWalletMutation] = useMutation(createWallet)
  //const [balance] = useQuery(getAccountBalance, null)
  //const [wallets] = useQuery(getWallets, null)
  //const [price] = useQuery(getAlgoExchangeRate, null)
  //const [transactions] = useQuery(getTransactionsForAddress, {address: '3UORVC2UXBMCCXH6L3KJTUDJCICJFLFSDMVYIBBIUQD7ZPV35C7PLJIZ24' })
  //const [balance] = useQuery(getBalance, { address: tatum! })
  //const [balance] = useQuery(getBalance, { address: 'WJAH4Q2RZWINJQF3HBUM2GSHOQQRSWVBLEHJFEYHETR6JGRZ2CPWFCJG7M' })

  return <div></div>
}

const WalletPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Tatums</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>{/* <Wallets /> */}</Suspense>
      </div>
    </>
  )
}

WalletPage.authenticate = false
WalletPage.getLayout = (page) => <WalletLayout>{page}</WalletLayout>

export default WalletPage
