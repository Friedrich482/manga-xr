import Link from "next/link";
import { FaFire } from "react-icons/fa6";
import SearchBar from "./SearchBar";
const Navbar = () => {
  return (
    <nav className="mt-2 flex w-full flex-row items-center justify-center">
      <div className="flex w-3/12 cursor-pointer items-center justify-center -indent-9 text-3xl font-extrabold">
        Manga-R
      </div>
      <ul className="flex w-6/12 flex-row items-center justify-center">
        <li className="text-neutral  flex w-1/3 items-center justify-self-center text-center text-xl">
          <Link
            href="/"
            className="flex w-2/3 cursor-pointer items-center justify-center rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
          >
            <span>Home</span>
          </Link>
        </li>
        <li className="text-neutral  flex w-1/3 items-center justify-self-center text-center text-xl">
          <Link
            href={"/"}
            className="flex w-2/3 cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
          >
            <span>Popular</span>
            <FaFire className="size-4 flex-shrink-0 text-orange-400" />
          </Link>
        </li>
        <li className="text-neutral  flex w-1/3 items-center justify-self-center text-center text-xl">
          <Link
            href={"/"}
            className="flex w-2/3 cursor-pointer items-center justify-center rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
          >
            <span>Profile</span>
          </Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};
export default Navbar;
