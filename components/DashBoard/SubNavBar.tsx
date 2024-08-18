"use client";
import useDashBoardSearchParams from "@/hooks/useDashBoardSearchParams";
import { dashBoardSubNavLinks } from "@/lib/constants";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";
import SubNavBarDropDown from "./SubNavBarDropDown";
import useDashBoardLinks from "@/hooks/useDashBoardLinks";

const SubNavBar = () => {
  const tab = useDashBoardSearchParams();
  const { windowWidth, linksToDisplay } = useDashBoardLinks();
  return (
    <nav className="flex w-full gap-4 place-self-start border-b border-b-neutral-700">
      <ul className="flex gap-4 pl-6">
        {dashBoardSubNavLinks.slice(0, linksToDisplay).map((option) => {
          const { name, searchParam } = option;
          const isActive = tab ? searchParam === tab : searchParam === "";
          return (
            <li className={tm("flex flex-col gap-2")} key={name}>
              <Link
                href={
                  "/dashboard" +
                  (searchParam.length > 0 ? `?tab=${searchParam}` : "")
                }
                className="rounded-lg border-b border-transparent px-4 py-2 text-neutral-800 hover:bg-neutral-300 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                {name}
              </Link>
              <div
                className={tm(
                  "h-[2px] w-full rounded-t-lg bg-transparent",
                  isActive && "bg-primary",
                )}
              />
            </li>
          );
        })}
      </ul>
      <SubNavBarDropDown
        windowWidth={windowWidth}
        linksToDisplay={linksToDisplay}
      />
    </nav>
  );
};
export default SubNavBar;
