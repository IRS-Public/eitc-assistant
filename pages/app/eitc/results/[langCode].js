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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { langCode: 'es' } },
      { params: { langCode: 'zh-hans' } },
      { params: { langCode: 'zh-hant' } },
      { params: { langCode: 'ko' } },
      { params: { langCode: 'ru' } },
      { params: { langCode: 'vi' } },
      { params: { langCode: 'ht' } },
    ],
    fallback: false
  };
}

export async function getStaticProps() {
  return { props: {} }
}
