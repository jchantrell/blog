import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../components/head";
import NavBar from "../components/nav";
import Bio from "../components/bio";
import Statue from "../three/statue";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const handleLoading: any = () => {
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col items-center h-screen p-4">
        <NavBar />
        <Bio />
        <br />
        <Statue handleLoading={handleLoading} />
      </main>
    </>
  );
};

export default Home;
