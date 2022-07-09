import type { NextPage } from 'next'
import FloatingLines from "../elements/FloatingLines";
import Facts from "../components/Facts/Facts";
import SidebarLetters from "../components/core/SidebarLetters";
import Skills from "../components/Skills/Skills";
import MyWork from "../components/MyWork/MyWork";
import Navigation from "../components/core/Navigation";

const Home: NextPage = () => {
  return (
   <>
       <Navigation />
       <Facts />
       <Skills />
       <MyWork />
       <SidebarLetters />
       <FloatingLines />
   </>
  )
}

export default Home
