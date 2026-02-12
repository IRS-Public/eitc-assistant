/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head'
import Link from 'next/link'
import MainTemplate from '../templates/MainTemplate'

export default function Home() {
  return (
    <>
      <Head>
        <title>Main App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainTemplate page="MainApp" testId="MainAppHeader">
        <MainApp />
      </MainTemplate>
    </>
  )
}

const MainApp = () => (
  <div className="mt-10 block">
    <Link legacyBehavior href="/app/eitc/">
      <a className="link">EITC</a>
    </Link>
  </div>
)
