import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import PageLayout from '../components/PageLayout'

function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default App
