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
    setTimeout(() => setLoading(false), 100);
  };

  const [bgColor, setBgColor] = useState<string>("");
  const [spinColor, setSpinColor] = useState<string>("");

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      let theme = localStorage.getItem("theme");
      if (theme == "light") {
        setBgColor("#FFFEFE");
        setSpinColor("#1F2937");
      } else if (theme == "dark") {
        setBgColor("#2A303C");
        setSpinColor("#FFFEFE");
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setBgColor("#2A303C");
          setSpinColor("#FFFEFE");
        } else {
          setBgColor("#FFFEFE");
          setSpinColor("#1F2937");
        }
      }
    }
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            backgroundColor: bgColor,
          }}
          className="flex justify-center items-center absolute inset-0 h-screen w-screen z-10"
        >
          <ReactLoading
            type="cylon"
            color={spinColor}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <></>
      )}
      <>
        <Header />
        <main className="container mx-auto flex flex-col items-center h-screen p-4 z-1">
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
