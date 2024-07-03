"use client";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { chapterType } from "@/zod-schema/schema";
import getChapterNumber from "@/utils/getChapterNumber";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useParams } from "next/navigation";

const ChaptersMenu = ({
  chaptersMenuVisibility,
  setChaptersMenuVisibility,
  chapters,
}: {
  chaptersMenuVisibility: boolean;
  setChaptersMenuVisibility: Dispatch<SetStateAction<boolean>>;
  chapters: chapterType[];
}) => {
  const ref = useHandleOutsideClick(
    chaptersMenuVisibility,
    setChaptersMenuVisibility,
  );
  useToggleScroll(chaptersMenuVisibility);

  const { altTitle }: { altTitle: string } = useParams();
  return (
    chaptersMenuVisibility && (
      <div className="h-0">
        <div
          ref={ref}
          className="relative top-1 z-20 flex h-80 w-44 flex-none items-center justify-start overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black"
        >
          <ul className="flex h-full w-full flex-col items-center justify-start gap-[2px]">
            {chapters.map((chapter) => {
              const { chapterTitle } = chapter;
              const chapterNumber = getChapterNumber(chapterTitle);
              return (
                <li
                  key={chapterTitle}
                  className="flex w-full cursor-pointer items-center justify-start rounded-lg py-1 pl-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                >
                  <Link href={`/manga/${altTitle}/chapter-${chapterNumber}`}>
                    Chapter {chapterNumber}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
};
export default ChaptersMenu;
