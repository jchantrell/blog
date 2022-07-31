import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/nav";
import { trpc } from "../utils/trpc";

const Technology: NextPage = () => {
  return (
    <>
      <Head>
        <title>jchantrell.dev</title>
        <meta
          name="description"
          content="Joel Chantrell's list of technology resources"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className="container mx-auto flex flex-col items-center h-screen p-4">
        <div>some tech info</div>
      </main>
    </>
  );
};

export default Technology;
