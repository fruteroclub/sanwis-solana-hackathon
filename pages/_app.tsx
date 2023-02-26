import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'
import { logo_completo } from '../assets';
import Image from 'next/image'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Sanwis</title>
        <Image src={logo_completo} alt="logo" className='w-[521px] h-[152px]' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
