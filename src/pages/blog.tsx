import type { NextPage } from "next";
import Header from "../components/Head";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";

const Blog: NextPage = () => {
  

  return (
    <>
      <Header />
      <NavBar />
      <main className="container mx-auto flex flex-col items-center h-screen p-4">
        <div>posts go here</div>
      </main>
    </>
  );
};

export default Blog;
