import type { NextPage } from "next";
import Header from "../components/head";
import NavBar from "../components/nav";
import Bio from "../components/bio";
import Statue from "../three/statue";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col items-center h-screen p-4">
        <NavBar />
        <Bio />
        <br />
        <Statue />
      </main>
    </>
  );
};

export default Home;
