"use client";
import { dashBoardSubNavLinks } from "@/lib/constants";
import { twMerge as tm } from "tailwind-merge";
import SubNavBarDropDown from "./SubNavBarDropDown";
import useDashBoardLinks from "@/hooks/useDashBoardLinks";
import { DashBoardSubNavLinksSearchParam } from "@/zod-schema/schema";
import { useRouter } from "next/navigation";

const SubNavBar = ({
  tab,
}: {
  tab: DashBoardSubNavLinksSearchParam | null;
}) => {
  // I could use useSearchParams to get the searchParams, but it is better to have only one source of truth
  const { windowWidth, linksToDisplay } = useDashBoardLinks();
  const router = useRouter();
  return (
    <nav className="flex w-full gap-4 place-self-start border-b border-b-neutral-700">
      <ul className="flex gap-4 pl-6">
        {dashBoardSubNavLinks.slice(0, linksToDisplay).map((option) => {
          const { name, searchParam } = option;
          const isActive = tab
            ? searchParam === tab
            : searchParam === undefined;
          return (
            <li className="flex flex-col gap-2" key={name}>
              <button
                onClick={() => {
                  router.push(
                    `dashboard${searchParam ? `?tab=${searchParam}` : ""}`,
                  );
                  router.refresh();
                }}
                className="rounded-lg border-b border-transparent px-4 py-2 text-neutral-800 hover:bg-neutral-300 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                {name}
              </button>
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
        tab={tab}
        windowWidth={windowWidth}
        linksToDisplay={linksToDisplay}
      />
    </nav>
  );
};
export default SubNavBar;
