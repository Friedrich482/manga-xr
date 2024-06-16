"use client";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { twMerge as tm } from "tailwind-merge";
import { usePathname } from "next/navigation";
export const elements = [
  {
    name: "Home",
    icon: IoMdHome,
    pathName: "/",
    width: "w-3/12",
  },
  {
    name: "Popular",
    icon: BsFire,
    pathName: "/popular",
    width: "w-4/12",
  },
  {
    name: "List",
    icon: FaClipboardList,
    pathName: "/list",
    width: "w-3/12",
  },
];
const HorizontalNavList = () => {
  const pathName = usePathname();
  return (
    <ul className="hidden w-5/12 flex-row items-center justify-start gap-5 large-nav:flex">
      {elements.map((element) => (
        <li
          className={`text-neutral flex ${element.width} items-center justify-self-center text-center text-xl`}
          key={element.name}
        >
          <Link
            href={element.pathName}
            className={tm(
              "group flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-out hover:bg-neutral-300 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800",
              pathName === element.pathName &&
                "border-b-[1px] border-r-[1px] border-b-violet-500 border-r-violet-500 hover:border-transparent",
            )}
          >
            <element.icon
              className={tm(
                "size-5 flex-shrink-0 text-neutral-400",
                pathName === element.pathName && "text-white",
              )}
            />
            <span
              className={tm(
                "text-neutral-400",
                pathName === element.pathName && "text-white",
              )}
            >
              {element.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default HorizontalNavList;
