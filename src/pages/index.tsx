import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../components/Head";
import NavBar from "../components/NavBar";
import Bio from "../components/Bio";
import Statue from "../three/statue";
import React from "react";
import ReactLoading from "react-loading";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const handleLoading: any = () => {
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            backgroundColor: "#374151",
          }}
          className="flex justify-center items-center absolute inset-0 h-screen w-screen z-10"
        >
          <ReactLoading type="spinningBubbles" height={100} width={100} />
        </div>
      ) : (
        <></>
      )}
      <>
        <Header />
        <main className="container mx-auto flex flex-col items-center h-screen p-4">
          <NavBar />
          <Bio />
          <br />
          <Statue handleLoading={handleLoading} />
        </main>
      </>
    </>
  );
};

export default Home;
