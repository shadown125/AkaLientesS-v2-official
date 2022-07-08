import type { NextPage } from 'next'
import FloatingLines from "../elements/FloatingLines";
import Facts from "../components/Facts/Facts";
import SidebarLetters from "../components/core/SidebarLetters";

const Home: NextPage = () => {
  return (
   <>
       <FloatingLines />
       <Facts />
       <SidebarLetters />
   </>
  )
}

export default Home
