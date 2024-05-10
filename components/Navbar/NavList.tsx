import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";

const NavList = () => {
  return (
    <ul className="large-nav:flex hidden w-5/12 flex-row items-center justify-start gap-5">
      <li className="text-neutral flex w-3/12 items-center justify-self-center text-center text-xl">
        <Link
          href="/"
          className="group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 text-neutral-600 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
        >
          <IoMdHome className="size-6 group-hover:font-bold" />
          <span>Home</span>
        </Link>
      </li>
      <li className="text-neutral flex w-4/12 items-center justify-self-center text-center text-xl text-neutral-600">
        <Link
          href={"/"}
          className="group flex  w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
        >
          <BsFire className="size-5 flex-shrink-0 transition group-hover:font-bold group-hover:text-orange-400" />
          <span>Popular</span>
        </Link>
      </li>
      <li className="text-neutral flex w-3/12 items-center justify-self-center text-center text-xl text-neutral-600">
        <Link
          href={"/"}
          className="group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
        >
          <FaClipboardList className="size-5 group-hover:font-bold" />
          <span>List</span>
        </Link>
      </li>
    </ul>
  );
};
export default NavList;
