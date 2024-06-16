"use client";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { twMerge as tm } from "tailwind-merge";
import { usePathname } from "next/navigation";
const HorizontalNavList = () => {
  const pathName = usePathname();
  return (
    <ul className="hidden w-5/12 flex-row items-center justify-start gap-5 large-nav:flex">
      <li className="text-neutral flex w-3/12 items-center justify-self-center text-center text-xl ring-0">
        <Link
          href={"/"}
          className="group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          <IoMdHome
            className={tm(
              "size-6 text-neutral-400 group-hover:font-bold",
              pathName === "/" && "text-white",
            )}
          />
          <span
            className={tm("text-neutral-400", pathName === "/" && "text-white")}
          >
            Home
          </span>
        </Link>
      </li>
      <li className="text-neutral flex w-4/12 items-center justify-self-center text-center text-xl">
        <Link
          href={"/"}
          className="group flex  w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black dark:text-neutral-300  dark:hover:bg-neutral-800"
        >
          <BsFire
            className={tm(
              "size-5 flex-shrink-0 text-neutral-400",
              pathName === "/popular" && "text-white",
            )}
          />
          <span
            className={tm(
              "text-neutral-400",
              pathName === "/popular" && "text-white",
            )}
          >
            Popular
          </span>
        </Link>
      </li>
      <li className="text-neutral flex w-3/12 items-center justify-self-center text-center text-xl">
        <Link
          href={"/"}
          className="group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black dark:text-neutral-300  dark:hover:bg-neutral-800"
        >
          <FaClipboardList
            className={tm(
              "size-5 text-neutral-400 group-hover:font-bold",
              pathName === "/list" && "text-white",
            )}
          />
          <span
            className={tm(
              "text-neutral-400",
              pathName === "/list" && "text-white",
            )}
          >
            List
          </span>
        </Link>
      </li>
    </ul>
  );
};
export default HorizontalNavList;
