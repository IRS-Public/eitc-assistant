import Head from 'next/head'
import EITCTemplate from '../../../../templates/eitc/EITCTemplate'
import FilingStatus from '../../../../project/filingStatus/filingStatus'

export default function Home() {
  return (
    <>
      <Head>
        <title>EITC - FilingStatus | Internal Revenue Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EITCTemplate page="filingStatus" testId="filingStatusHeader">
        <FilingStatus />
      </EITCTemplate>
    </>
  )
}
