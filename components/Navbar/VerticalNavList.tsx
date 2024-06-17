import Image from "next/image";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";

import { BsFire } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { usePathname } from "next/navigation";
import { VerticalNavProps } from "@/types/navbar-types";
import { elements } from "./HorizontalNavList";
const VerticalNavList = ({
  verticalNavVisibility,
  setVerticalNavVisibility,
}: VerticalNavProps) => {
  const ref = useHandleOutsideClick(
    verticalNavVisibility,
    setVerticalNavVisibility,
  );
  useToggleScroll(verticalNavVisibility);
  const pathName = usePathname();
  return (
    <nav
      ref={ref}
      className={tm(
        "absolute -left-1 -top-[9px] flex h-svh w-64 flex-col items-center justify-start border border-neutral-600 bg-default-white p-5 transition duration-500 ease-linear dark:bg-default-black large-nav:hidden",
        !verticalNavVisibility && "-translate-x-64",
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
      <ul className="mt-10 flex w-full flex-col gap-2 place-self-center">
        {elements.map((element) => (
          <li
            className={tm(
              "flex w-full items-center justify-center place-self-center text-center text-xl",
              pathName === element.pathName &&
                "rounded-md border-2 border-violet-500",
            )}
            key={element.name}
          >
            <Link
              href={element.pathName}
              className="group flex h-full w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 transition duration-500 ease-in-out hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
              <div className="flex w-1/2 items-center justify-center gap-1 text-neutral-400">
                <element.icon
                  className={tm(
                    "size-5 w-1/5",
                    pathName === element.pathName && "text-white",
                  )}
                />
                <span
                  className={tm(
                    "w-4/5 text-start hover:transition hover:duration-300 hover:ease-in-out",
                    pathName === element.pathName && "text-white",
                  )}
                >
                  {element.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default VerticalNavList;
