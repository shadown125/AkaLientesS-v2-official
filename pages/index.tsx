import type { NextPage } from 'next'
import FloatingLines from "../elements/FloatingLines";
import Facts from "../components/Facts/Facts";
import SidebarLetters from "../components/core/SidebarLetters";
import Skills from "../components/Skills/Skills";
import MyWork from "../components/MyWork/MyWork";

const Home: NextPage = () => {
  return (
   <>
       <Facts />
       <Skills />
       <MyWork />
       <SidebarLetters />
       <FloatingLines />
   </>
  )
}

export default Home
