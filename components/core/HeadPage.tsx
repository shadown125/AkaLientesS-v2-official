import Head from "next/head";
import { useTranslation } from "next-i18next";

const HeadPage = () => {
    const { t } = useTranslation("common");

    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

            <meta name="author" content="Dawid Oleksiuk" />
            <meta name="description" content={t("metaDescription")} />
            <meta property="og:title" content="AkaLientesS" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={t("metaDescription")} />
            <meta property="og:locale" content="pl_PL" />
            <meta property="og:image" content="/akaLientessSeo.jpg" />
            <meta property="og:url" content="https://www.akalientess.com/" />
            <meta property="og:locale:alternate" content="en_US" />
            <meta name="twitter:site" content="@DawidOleksiuk" />
            <meta name="twitter:title" content="AkaLientesS" />
            <meta name="twitter:description" content={t("metaDescription")} />
            <meta name="twitter:image" content="/akaLientessSeo.jpg" />

            <link rel="alternate" href="https://www.akalientess.com/en" hrefLang="en" />
            <link rel="alternate" href="https://www.akalientess.com/pl" hrefLang="pl" />

            <meta name="format-detection" content="telephone=no" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/favicon.png" />

            <title>AkaLientesS</title>
        </Head>
    );
};

export default HeadPage;
