import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { Html } from 'next/document'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <Toaster />
    <Component {...pageProps} />
  </div>
}

export default MyApp
