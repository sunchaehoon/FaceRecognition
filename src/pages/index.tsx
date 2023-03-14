import { Header, Main } from '@/components'
import Head from 'next/head'
import type { NextPage } from 'next'

export default function Home() {
  return (
    <>
      <Head>
        <title>Upload your face</title>
      </Head>
      <Header />
      <Main />
    </>
  )
}
