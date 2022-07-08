import type { NextPage } from 'next'
import FloatingLines from "../elements/FloatingLines";
import Facts from "../components/Facts/Facts";
import SidebarLetters from "../components/core/SidebarLetters";
import Skills from "../components/Skills/Skills";

const Home: NextPage = () => {
  return (
   <>
       <Facts />
       <Skills />
       <SidebarLetters />
       <FloatingLines />
   </>
  )
}

export default Home
