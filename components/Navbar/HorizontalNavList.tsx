"use client";
import Link from "next/link";
import { BsFire } from "react-Icons/bs";
import { twMerge as tm } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { IoMdHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
export const links = [
  { name: "Home", path: "/", width: "w-3/12", Icon: IoMdHome },
  {
    name: "Popular",
    path: "/popular",
    width: "w-4/12",
    Icon: BsFire,
  },
  {
    name: "List",
    path: "/list",
    width: "w-3/12",
    Icon: FaClipboardList,
  },
];
const HorizontalNavList = () => {
  const pathName = usePathname();
  return (
    <ul className="hidden w-5/12 flex-row items-center justify-start gap-5 large-nav:flex">
      {links.map((link) => {
        const { Icon, name, path, width } = link;
        return (
          <li
            className={`flex text-neutral-800 ${width} group items-center justify-self-center text-center text-xl`}
            key={name}
          >
            <Link
              href={path}
              className={tm(
                "group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800",
                path === pathName &&
                  "border-b-2 border-l-[0.5px] border-r-2 border-t-[0.5px] border-b-amber-600 border-l-neutral-900 border-r-amber-600 border-t-neutral-900 group-hover:border-transparent dark:border-b-violet-800 dark:border-l-neutral-600 dark:border-r-violet-800 dark:border-t-neutral-600",
              )}
            >
              <Icon
                className={tm(
                  "size-6 text-neutral-800 group-hover:font-bold dark:text-neutral-400",
                  path === pathName && "text-black dark:text-white",
                )}
              />
              <span
                className={tm(
                  "text-neutral-800 dark:text-neutral-400",
                  path === pathName && "text-black dark:text-white",
                )}
              >
                {name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default HorizontalNavList;
