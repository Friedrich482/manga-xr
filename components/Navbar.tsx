import Link from "next/link";
import { BsFire } from "react-icons/bs";
import { RiUser3Fill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import SearchBar from "./SearchBar";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className="mt-2 flex w-full flex-row items-center justify-center">
      <Link
        href={"/"}
        className="flex w-3/12 cursor-pointer items-center justify-center gap-2"
      >
        <Image
          className="aspect-square rounded-full"
          src={`/assets/logo.svg`}
          alt={"logo"}
          width={40}
          height={40}
          priority={false}
        />
        <span className=" text-end text-3xl font-extrabold">Manga-R</span>
      </Link>
      <ul className="flex w-6/12 flex-row items-center justify-center">
        <li className="text-neutral flex w-1/3 items-center justify-self-center text-center text-xl">
          <Link
            href="/"
            className="group flex w-2/3 cursor-pointer items-center justify-center gap-1 rounded-lg py-2 text-neutral-600 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
          >
            <IoMdHome className="size-6 group-hover:font-bold" />
            <span>Home</span>
          </Link>
        </li>
        <li className="text-neutral  flex w-1/3 items-center justify-self-center text-center text-xl text-neutral-600">
          <Link
            href={"/"}
            className="group flex w-2/3 cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
          >
            <BsFire className="size-5 flex-shrink-0 transition group-hover:font-bold group-hover:text-orange-400" />
            <span>Popular</span>
          </Link>
        </li>
        <li className="text-neutral flex w-1/3 items-center justify-self-center text-center text-xl text-neutral-600">
          <Link
            href={"/"}
            className="group flex w-2/3 cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black"
          >
            <RiUser3Fill className="size-5 group-hover:font-bold" />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};
export default Navbar;
