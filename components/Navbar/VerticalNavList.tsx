import Image from "next/image";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";

import { BsFire } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";

import { VerticalNavProps } from "@/types/navbar-types";

const VerticalNavList = ({
  verticalNavVisibility,
  setVerticalNavVisibility,
}: VerticalNavProps) => {
  const ref = useHandleOutsideClick(
    verticalNavVisibility,
    setVerticalNavVisibility,
  );
  useToggleScroll(verticalNavVisibility);
  return (
    <nav
      ref={ref}
      className={tm(
        "absolute -left-1 -top-[9px] flex h-svh w-64 flex-col items-center justify-start border border-neutral-600 bg-default-white p-5 transition duration-500 ease-linear dark:bg-default-black large-nav:hidden",
        !verticalNavVisibility && " -translate-x-64",
      )}
    >
      <div className="flex w-full items-center justify-center">
        <Link href={"/"} className="w-1/6">
          <Image
            className="aspect-square min-w-10 rounded-full"
            src={`/assets/logo.svg`}
            alt={"logo"}
            width={40}
            height={40}
            priority={false}
          />
        </Link>
        <span className="w-4/6 indent-4 text-2xl text-black dark:text-white">
          <Link href={"/"}>Manga-R</Link>
        </span>
        <IoIosCloseCircleOutline
          className="size-6 w-1/6 cursor-pointer text-neutral-700 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          onClick={() => {
            setVerticalNavVisibility(false);
          }}
        />
      </div>
      <ul className="mt-10 flex w-32 flex-col gap-2 place-self-center">
        <li className="text-neutral group flex items-center justify-self-center text-center text-xl ring-0">
          <Link
            href="/"
            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-neutral-600 transition duration-500 ease-in-out hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            <IoMdHome className="size-6 w-1/5 group-hover:font-bold" />
            <span className="w-4/5 text-start hover:transition hover:duration-300 hover:ease-in-out">
              Home
            </span>
          </Link>
        </li>
        <li className="text-neutral flex items-center justify-self-center text-center text-xl text-neutral-600">
          <Link
            href={"/"}
            className="group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 text-neutral-600 transition duration-500 ease-in-out hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            <BsFire className="size-5 w-1/5 hover:transition hover:duration-300 hover:ease-in-out group-hover:font-bold group-hover:text-orange-400" />
            <span className="w-4/5 text-start hover:transition hover:duration-300 hover:ease-in-out">
              Popular
            </span>
          </Link>
        </li>
        <li className="text-neutral flex items-center justify-self-center text-center text-xl text-neutral-600">
          <Link
            href={"/"}
            className="group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 text-neutral-600 transition duration-500 ease-in-out hover:text-black dark:text-neutral-300 dark:hover:text-white "
          >
            <FaClipboardList className="size-5 w-1/5 group-hover:font-bold" />
            <span className="w-4/5 text-start hover:transition hover:duration-300 hover:ease-in-out">
              List
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default VerticalNavList;