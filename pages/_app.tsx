import "../public/main.css";
import type { AppProps } from 'next/app'
import HeadPage from "../components/core/HeadPage";
import Footer from "../components/core/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className="app">
        <HeadPage />
            <Component {...pageProps} />
        <Footer />
      </div>
  )
}

export default MyApp
