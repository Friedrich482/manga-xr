"use client";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const ChaptersMenu = ({
  chaptersMenuVisibility,
  setChaptersMenuVisibility,
  chapters,
}: {
  chaptersMenuVisibility: boolean;
  setChaptersMenuVisibility: Dispatch<SetStateAction<boolean>>;
  chapters: {
    chapterTitle: string;
    chapterReleaseDate: string;
  }[];
}) => {
  const ref = useHandleOutsideClick(
    chaptersMenuVisibility,
    setChaptersMenuVisibility,
  );
  useToggleScroll(chaptersMenuVisibility);
  return (
    chaptersMenuVisibility && (
      <div className="h-0">
        <div
          ref={ref}
          className="overflow-y relative top-1 z-20 flex h-80 w-44 flex-none items-center justify-start overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black"
        >
          <ul className="flex h-full w-full flex-col items-center justify-start gap-[2px]">
            {chapters.map((chapter) => (
              <li
                key={chapter.chapterTitle}
                className="flex w-full cursor-pointer items-center justify-start rounded-lg py-1 pl-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
              >
                {/* use usePathName to get the name of the manga instead of using prop drilling */}
                <Link href={""}>{chapter.chapterTitle}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};
export default ChaptersMenu;
