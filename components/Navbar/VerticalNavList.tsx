"use client";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";

import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";

import { usePathname } from "next/navigation";
import { BsFire } from "react-icons/bs";
import Logo from "./Logo";
import CrossKatanaImage from "./CrossKatanaImage";
import CloseButton from "../lib/CloseButton";
import { links } from "@/lib/constants";
import { Dispatch, SetStateAction } from "react";

const VerticalNavList = ({
  verticalNavVisibility,
  setVerticalNavVisibility,
}: {
  verticalNavVisibility: boolean;
  setVerticalNavVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
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
        "absolute -left-1 -top-2 z-10 flex h-[105lvh] w-64 flex-col items-center justify-start gap-12 border border-neutral-600 bg-default-white p-5 transition duration-500 ease-linear dark:bg-default-black large-nav:hidden",
        !verticalNavVisibility && " -translate-x-64",
      )}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <Link href="/" className="flex gap-3">
          <Logo className="size-8" />
          <span className="flex text-2xl text-black dark:text-white">
            Manga
            <CrossKatanaImage className="max-small-nav:size-8" />R
          </span>
        </Link>
        <CloseButton onClick={() => setVerticalNavVisibility(false)} />
      </div>

      <ul className="flex w-full flex-col justify-start gap-2 place-self-center">
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
                        "text-primary",
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
