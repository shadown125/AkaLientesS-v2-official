import type { NextPage } from 'next'
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
import {useEffect} from "react";

const Home: NextPage = () => {
    useEffect(() => {
        const mouseTrailerCanvas = document.getElementById('mouse-trailer') as HTMLCanvasElement

        MouseTrailer(mouseTrailerCanvas)
    })

  return (
   <>
       <canvas id='mouse-trailer' />
       <InitialPageLoader />
       <TsParticles />
       <Navigation />
       <Staging />
       <Facts />
       <Skills />
       <MyWork />
       <Contact />
       <SidebarLetters />
       <FloatingLines />
   </>
  )
}

export default Home
