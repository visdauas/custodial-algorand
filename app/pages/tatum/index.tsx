import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useQuery, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useTatum } from "app/core/hooks/useTatum"
import getBalance from "integrations/tatum/queries/getBalance"
import createWallet from "integrations/tatum/mutations/createWallet"
import getWallets from "integrations/tatum/queries/getWallets"
import getAlgoExchangeRate from "integrations/tatum/queries/getAlgoExchangeRate"
import createTatumAccount from "integrations/tatum/mutations/createTatumAccount"
import getAccountBalance from "integrations/tatum/queries/getAccountBalance"

export const Tatum = () => {
  //const tatum = useTatum()
  const [createWalletMutation] = useMutation(createWallet)
  const [balance] = useQuery(getAccountBalance, null)
  const [wallets] = useQuery(getWallets, null)
  const [price] = useQuery(getAlgoExchangeRate, null)
  //const [balance] = useQuery(getBalance, { address: tatum! })
  //const [balance] = useQuery(getBalance, { address: 'WJAH4Q2RZWINJQF3HBUM2GSHOQQRSWVBLEHJFEYHETR6JGRZ2CPWFCJG7M' })

  console.log(balance)

  return (
    <div>
      1 ALGO = {price?.value} USD
      <br />
      Account Balance: {balance?.accountBalance} ALGO
      <br />
      Available Balance: {balance?.availableBalance} ALGO
      <br />
      <br />
       <ul>
        {wallets.map((wallet) => (
          <li key={wallet.id}>
            {wallet.name}
            <br />
            {wallet.address}
            <br />
            {GetBalance(wallet.address)} ALGO
            <br />
            <br />
          </li>
        ))}
      </ul>
      <br />
      <button onClick={async () => await createWalletMutation({name: 'test'})}>Create Wallet</button>
    </div>
  )
}

const GetBalance =  (address: string) => {
  const [balance] = useQuery(getBalance, { address: address })

  return balance
}

const TatumPage: BlitzPage = () => {

  return (
    <>
      <Head>
        <title>Tatums</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Tatum />
        </Suspense>
      </div>
    </>
  )
}

TatumPage.authenticate = true
TatumPage.getLayout = (page) => <Layout>{page}</Layout>

export default TatumPage
