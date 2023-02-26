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
        <div className='w-[521px] h-[152px]' >
          <Image 
            src={logo_completo} 
            alt="logo" 
            width={521}
            height={152}
          />
        </div>
        
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
