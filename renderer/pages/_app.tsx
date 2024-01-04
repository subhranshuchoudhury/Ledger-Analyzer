import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { Html } from 'next/document'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <Component {...pageProps} />
  </div>
}

export default MyApp
