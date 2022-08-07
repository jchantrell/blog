import type { NextPage } from "next";
import Header from "../components/head";
import NavBar from "../components/nav";
import { trpc } from "../utils/trpc";

const Technology: NextPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col items-center h-screen p-4">
        <NavBar />
        <div>some tech info</div>
      </main>
    </>
  );
};

export default Technology;
