import Head from 'next/head'
import EITCTemplate from '../../../../templates/eitc/EITCTemplate'
import Results from '../../../../project/results/results'

export default function Home() {
  return (
    <>
      <Head>
        <title>EITC - Results | Internal Revenue Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EITCTemplate page="results" testId="resultsHeader">
        <Results />
      </EITCTemplate>
    </>
  )
}
