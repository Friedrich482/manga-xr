import { dashBoardSubNavLinks } from "@/lib/constants";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";

const SubNavBar = ({ tab }: { tab: string | undefined }) => {
  return (
    <nav className="flex w-full place-self-start border-b border-b-neutral-700">
      <ul className="flex gap-4 pl-6">
        {dashBoardSubNavLinks.map((option) => {
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
              {isActive && (
                <div className="h-[2px] w-full rounded-t-lg bg-red-700" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default SubNavBar;
