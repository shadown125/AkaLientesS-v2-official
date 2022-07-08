import type { NextPage } from 'next'
import FloatingLines from "../elements/FloatingLines";
import Facts from "../components/Facts/Facts";

const Home: NextPage = () => {
  return (
   <>
       <FloatingLines />
       <Facts />
   </>
  )
}

export default Home
