import type { NextPage } from "next";
import { useState } from "react";
import Header from "../components/Head";
import NavBar from "../components/NavBar";
import Bio from "../components/Bio";
import Statue from "../three/statue";
import React from "react";
import LoadScreen from "../components/LoadScreen";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoading: any = () => {
    setTimeout(() => setLoading(false));
  };

  return (
    <>
      {loading ? <LoadScreen /> : <></>}
      <>
        <Header />
        <NavBar />
        <main className="container mx-auto flex flex-col items-center h-screen p-4 z-1">
          <Bio />
          <br />
          <Statue handleLoading={handleLoading} />
        </main>
      </>
    </>
  );
};

export default Home;
