import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { UserAuthContextProvider } from '../context/UserAuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserAuthContextProvider>
      <Navbar />
      <Component {...pageProps}  />

    </UserAuthContextProvider>
  
  
  )
}

export default MyApp
 