import type { NextPage } from 'next'
import FloatingLines from "../elements/FloatingLines";
import Facts from "../components/Facts/Facts";
import SidebarLetters from "../components/core/SidebarLetters";
import Skills from "../components/Skills/Skills";
import MyWork from "../components/MyWork/MyWork";
import Navigation from "../components/core/Navigation";
import Staging from "../components/Staging/Staging";
import TsParticles from "../components/core/TsParticles";
import InitialPageLoader from "../components/core/InitialPageLoader";

const Home: NextPage = () => {
  return (
   <>
       <InitialPageLoader />
       <TsParticles />
       <Navigation />
       <Staging />
       <Facts />
       <Skills />
       <MyWork />
       <SidebarLetters />
       <FloatingLines />
   </>
  )
}

export default Home
