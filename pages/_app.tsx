import "../public/main.css";
import type { AppProps } from 'next/app'
import HeadPage from "../components/core/HeadPage";
import Footer from "../components/core/Footer";
import {InitialLoadContextProvider} from "../components/context/initialLoadContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <InitialLoadContextProvider>
          <div className="app">
            <HeadPage />
            <Component {...pageProps} />
            <Footer />
          </div>
      </InitialLoadContextProvider>
  )
}

export default MyApp
