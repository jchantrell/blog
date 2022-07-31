import Link from "next/link";

function NavBar() {
  const navigateToExternalUrl = (
    url: string,
    shouldOpenNewTab: boolean = true
  ) =>
    shouldOpenNewTab
      ? window.open(url, "_blank")
      : (window.location.href = url);
  return (
    <div className="navbar">
      <Link href="/">
        <button className=" navbar-start">jchantrell</button>
      </Link>
      <div className="navbar-end">
        <Link href="/projects">
          <button className="btn btn-ghost">Projects</button>
        </Link>
        <button
          className="btn btn-ghost"
          onClick={() => navigateToExternalUrl("https://github.com/jchantrell")}
        >
          Github
        </button>
        <Link href="/technology">
          <button className="btn btn-ghost">Tools</button>
        </Link>
        <Link href="/contact">
          <button className="btn btn-ghost">Contact</button>
        </Link>
        <label className="btn btn-circle swap swap-rotate">
          <input type="checkbox" />

          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
    </div>
  );
}

export default NavBar;
