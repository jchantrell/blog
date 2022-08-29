import type { NextPage } from "next";
import Header from "../components/Head";
import NavBar from "../components/NavBar";

interface TagColours {
  react: string;
  next: string;
  typescript: string;
  python: string;
  css: string;
  other: string;
}

const tagColours: TagColours = {
  react: "bg-cyan-300",
  next: "bg-violet-500",
  typescript: "bg-yellow-300",
  python: "bg-teal-500",
  css: "bg-blue-500",
  other: "bg-pink-400",
};

interface CardProps {
  title: string;
  description: string;
  tags: string[];
}

function Card({ title, description, tags }: CardProps) {
  return (
    <div className="flex flex-col bg-base-300 drop-shadow rounded-md h-100 min-h-20 border-0 cursor-pointer">
      <div className="px-3 py-2">{description}</div>
      <div className="tags m-2">
        {tags ? (
          tags.map((tag, idx) => (
            <div
              key={idx}
              className={`${
                tagColours[tag as keyof typeof tagColours]
              } badge text-neutral-focus ml-1 border-0`}
            >
              {tag}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const Projects: NextPage = () => {
  return (
    <>
      <Header />
      <NavBar />
      <main className="mx-auto grid grid-cols-4 gap-4 h-screen p-4">
        <div className="projects sm:col-start-1 sm:col-end-4 col-start-1 col-end-5 flex flex-col gap-4">
          <Card
            title="A Project"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            tags={["typescript", "react", "next", "css"]}
          />
          <Card
            title="A long term project"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            tags={["typescript", "css", "other"]}
          />
          <Card
            title="A smaller project"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            tags={["python", "other"]}
          />
          <Card
            title="An older project"
            description="Lectus quam id leo in vitae turpis massa sed elementum. Posuere urna nec tincidunt praesent. Diam maecenas ultricies mi eget. Semper quis lectus nulla at volutpat. Tellus mauris a diam maecenas sed enim. Tristique nulla aliquet enim tortor at auctor urna nunc. Libero volutpat sed cras ornare arcu. Dictum varius duis at consectetur lorem donec massa sapien faucibus. Eu feugiat pretium nibh ipsum consequat. Netus et malesuada fames ac turpis egestas. Mi eget mauris pharetra et ultrices neque ornare aenean. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Ultrices gravida dictum fusce ut. Egestas integer eget aliquet nibh. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Eget dolor morbi non arcu risus. Accumsan sit amet nulla facilisi morbi tempus iaculis urna. Pellentesque sit amet porttitor eget dolor morbi non arcu risus."
            tags={["typescript", "react", "css"]}
          />
        </div>
        <aside className="hidden sm:block sm:col-start-4 sm:col-end-5">
          <div>All</div>
          <div>React</div>
          <div>Next.js</div>
          <div>Typescript/Javascript</div>
          <div>CSS</div>
          <div>Python</div>
          <div>Three.js</div>
        </aside>
      </main>
    </>
  );
};

export default Projects;
