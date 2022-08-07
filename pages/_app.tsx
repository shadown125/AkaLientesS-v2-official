import "../public/main.css";
import type { AppProps } from "next/app";
import HeadPage from "../components/core/HeadPage";
import Footer from "../components/core/Footer";
import { InitialLoadContextProvider } from "../components/context/initialLoadContext";
import { useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoad(true);
            return;
        }
    }, [load, setLoad]);

    return (
        <>
            {load && (
                <InitialLoadContextProvider>
                    <div className="app">
                        <HeadPage />
                        <Component {...pageProps} />
                        <Footer />
                    </div>
                </InitialLoadContextProvider>
            )}
        </>
    );
}

export default appWithTranslation(MyApp);
