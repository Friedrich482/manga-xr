import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";

const NavList = () => {
  return (
    <ul className="hidden w-5/12 flex-row items-center justify-start gap-5 large-nav:flex">
      <li className="text-neutral flex w-3/12 items-center justify-self-center text-center text-xl ring-0">
        <Link
          href="/"
          className="group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 text-neutral-600 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          <IoMdHome className="size-6 group-hover:font-bold" />
          <span>Home</span>
        </Link>
      </li>
      <li className="text-neutral flex w-4/12 items-center justify-self-center text-center text-xl text-neutral-600">
        <Link
          href={"/"}
          className="group flex  w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black dark:text-neutral-300  dark:hover:bg-neutral-700"
        >
          <BsFire className="size-5 flex-shrink-0 transition duration-300 ease-in-out group-hover:font-bold group-hover:text-orange-400" />
          <span>Popular</span>
        </Link>
      </li>
      <li className="text-neutral flex w-3/12 items-center justify-self-center text-center text-xl text-neutral-600">
        <Link
          href={"/"}
          className="group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black dark:text-neutral-300  dark:hover:bg-neutral-700"
        >
          <FaClipboardList className="size-5 group-hover:font-bold" />
          <span>List</span>
        </Link>{" "}
      </li>
    </ul>
  );
};
export default NavList;
