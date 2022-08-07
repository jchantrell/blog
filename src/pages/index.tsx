import type { NextPage } from "next";
import Header from "../components/head";
import NavBar from "../components/nav";
import Bio from "../components/bio";
import Scene from "../three/scene";
import Castle from "../three/castle";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col items-center h-screen p-4">
        <NavBar />
        <Bio />
        <Castle />
      </main>
    </>
  );
};

export default Home;
