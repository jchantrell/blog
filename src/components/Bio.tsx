import Link from "next/link";

function Bio() {
  return (
    <>
      <div>
        Hi, I&apos;m Joel, a self taught developer based out of Adelaide, South
        Australia. I&apos;m primarily interested in web and application
        development, although I enjoy dabbling with many technologies and have a
        soft spot for games and 3D.
      </div>
      <br />
      <div>
        Currently my main focus is on Next.js and React as I love the ecosystem
        and tooling around it. Some supplememtal technologies I use are
        TypeScript, Tailwind, tRPC and Prisma although I have learnt (and still
        use day to day) many other technologies, which you can find a list of{" "}
        <Link href="/technology">
          <a className="link">here</a>
        </Link>
        . Most notably I&apos;ve also developed a lot in Python, which was the
        language I started learning programming with and use in my current
        position of work.
      </div>
      <div>
        Thank you for reading and having an interest in my work and background.
        Feel free to take a look through some of my projects{" "}
        <Link href="/projects">
          <a className="link">here</a>
        </Link>{" "}
        and on my{" "}
        <Link href="https://github.com/jchantrell">
          <a target="_blank" rel="noopener noreferrer" className="link">
            github
          </a>
        </Link>
        . If you&apos;d like to get in contact, my details can be found{" "}
        <Link href="/contact">
          <a className="link">here</a>
        </Link>{" "}
        and I&apos;ll generally be back to you within the day.
      </div>
    </>
  );
}

export default Bio;
