import type { NextPage } from "next";
import Header from "../components/Head";
import NavBar from "../components/NavBar";
import { trpc } from "../utils/trpc";

const Contact: NextPage = () => {
  return (
    <>
      <Header />
      <NavBar />
      <main className="container mx-auto flex flex-col items-center h-screen p-4">
        <div>some contact info</div>
      </main>
    </>
  );
};

export default Contact;
