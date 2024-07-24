"use client";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";

import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { VerticalNavProps } from "@/types/navbar-types";

import { links } from "./HorizontalNavList";
import { usePathname } from "next/navigation";
import { BsFire } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import Logo from "./Logo";
import CrossKatanaImage from "./CrossKatanaImage";

const VerticalNavList = ({
  verticalNavVisibility,
  setVerticalNavVisibility,
}: VerticalNavProps) => {
  const pathName = usePathname();
  const ref = useHandleOutsideClick(
    verticalNavVisibility,
    setVerticalNavVisibility,
  );
  useToggleScroll(verticalNavVisibility);
  return (
    <nav
      ref={ref}
      className={tm(
        "absolute -left-1 -top-2 flex h-[105lvh] w-64 flex-col items-center justify-start border border-neutral-600 bg-default-white p-5 transition duration-500 ease-linear dark:bg-default-black large-nav:hidden",
        !verticalNavVisibility && " -translate-x-64",
      )}
    >
      <div className="flex w-full items-center justify-center">
        <Link href="/">
          <Logo />
        </Link>
        <span className="w-4/6 text-2xl text-black dark:text-white">
          <Link href="/" className="flex">
            Manga
            <CrossKatanaImage />R
          </Link>
        </span>
        <button
          onClick={() => {
            setVerticalNavVisibility(false);
          }}
          className="size-8 cursor-pointer rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600/50"
        >
          <IoIosClose className="size-full text-neutral-700 dark:text-neutral-400" />
        </button>
      </div>

      <ul className="mt-10 flex w-full flex-col justify-start gap-2 place-self-center">
        {links.map((link) => {
          const { name, Icon, path } = link;
          return (
            <li
              className={tm(
                "text-neutral group flex items-center text-center text-xl",
                (path === pathName ||
                  (pathName.includes(path) && path !== "/")) &&
                  "rounded-lg border-2 border-violet-800",
              )}
              key={name}
            >
              <Link
                href={path}
                className="flex w-full cursor-pointer items-center justify-center py-2 text-neutral-600 transition duration-500 ease-in-out hover:text-black dark:text-neutral-300 dark:hover:text-white"
              >
                <div className="flex w-1/2 items-center justify-center gap-2 place-self-center">
                  <Icon
                    className={tm(
                      "size-6 w-2/5 group-hover:font-bold",
                      pathName === "/popular" &&
                        Icon === BsFire &&
                        "text-orange-400",
                    )}
                  />
                  <span className="w-3/5 text-start hover:transition hover:duration-300 hover:ease-in-out">
                    {name}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default VerticalNavList;
