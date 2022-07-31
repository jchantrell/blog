import type { NextPage } from "next";
import Header from "../components/head";
import NavBar from "../components/nav";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <NavBar />

      <main className="container mx-auto flex flex-col items-center h-screen p-4">
        <div>
          Hi, I&apos;m Joel, a self taught developer based out of Adelaide,
          South Australia. I&apos;m primarily interested in web and application
          development, although I enjoy dabbling with many technologies and have
          a soft spot for games and 3D.
        </div>
        <br />
        <div>
          Currently my main focus is on Next.js and React as I love the
          ecosystem and tooling around it. Some supplememtal technologies I use
          are TypeScript, Tailwind, tRPC and Prisma although I have learnt (and
          still use day to day) many other technologies, which you can find a
          list of{" "}
          <Link href="/contact">
            <a className="link">here</a>
          </Link>
          . Most notably I&apos;ve also developed a lot in Python, which was the
          language I started learning programming with and use in my current
          position of work.
        </div>
        <br />
        <div>
          Although I am currently working as a developer, I have a broad
          background in IT and have good fundamentals in networking and servers
          and the likes. I self taught a lot of what I know from a very young
          age, originally being motivated by wanting to modify games and host
          servers for friends which created the foundation that I continue to
          build on to this day.
        </div>
        <br />
        <div>
          Thank you for reading and having an interest in my work and
          background. Feel free to take a look through some of my projects{" "}
          <Link href="/contact">
            <a className="link">here</a>
          </Link>{" "}
          and on my{" "}
          <Link href="/contact">
            <a className="link">github</a>
          </Link>
          . If you&apos;d like to get in contact, my details can be found{" "}
          <Link href="/contact">
            <a className="link">here</a>
          </Link>{" "}
          and I&apos;ll generally be back to you within the day.
        </div>
      </main>
    </>
  );
};

export default Home;
