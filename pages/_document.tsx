import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=League+Spartan"
        rel="stylesheet"
      />
      </Head>
      <body className='bg-blue-50'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
