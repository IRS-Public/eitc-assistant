import Head from 'next/head'
import EITCTemplate from '../../../../templates/eitc/EITCTemplate'
import QualifyingChildren from '../../../../project/qualifyingChildren/qualifyingChildren'

export default function Home() {
  return (
    <>
      <Head>
        <title>EITC - Qualifying Children | Internal Revenue Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EITCTemplate page="qualifyingChildren" testId="qualifyingChildrenHeader">
        <QualifyingChildren />
      </EITCTemplate>
    </>
  )
}
