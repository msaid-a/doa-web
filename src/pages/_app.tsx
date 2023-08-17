// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps } : AppProps) {

  const theme = extendTheme({
    fonts: {
      heading: `'Raleway', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
  })
    return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;