import type { NextPage, GetStaticProps } from "next";
import FloatingLines from "../elements/FloatingLines";
import Facts from "../components/Facts/Facts";
import SidebarLetters from "../components/core/SidebarLetters";
import Skills from "../components/Skills/Skills";
import MyWork from "../components/MyWork/MyWork";
import Navigation from "../components/core/Navigation";
import Staging from "../components/Staging/Staging";
import Contact from "../components/contact/Contact";
import TsParticles from "../components/core/TsParticles";
import InitialPageLoader from "../components/core/InitialPageLoader";
import MouseTrailer from "../vanilla-js/MouseTrailer";
import { MutableRefObject, useEffect, useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMediaQuery } from "react-responsive";

const Home: NextPage = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 40em)" });
    const canvas = useRef<HTMLCanvasElement>() as MutableRefObject<HTMLCanvasElement>;

    useEffect(() => {
        !isMobile && MouseTrailer(canvas.current);
    }, [isMobile]);

    return (
        <>
            <canvas ref={canvas} id="mouse-trailer" />
            <InitialPageLoader />
            <TsParticles />
            <Navigation />
            <main>
                <Staging />
                <Facts />
                <Skills />
                <MyWork />
                <Contact />
                <SidebarLetters />
            </main>
            <FloatingLines />
        </>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "home"])),
        },
    };
};
