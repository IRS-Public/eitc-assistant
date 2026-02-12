import Head from 'next/head'
import EITCTemplate from '../../../../templates/eitc/EITCTemplate'
import AGI from '../../../../project/agi/agi'

export default function Home() {
  return (
    <>
      <Head>
        <title>EITC - AGI | Internal Revenue Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EITCTemplate page="agi" testId="agiHeader">
        <AGI />
      </EITCTemplate>
    </>
  )
}
