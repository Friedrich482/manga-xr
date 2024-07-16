"use client";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { chapterType } from "@/zod-schema/schema";
import getChapterNumber from "@/utils/getChapterNumber";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useParams } from "next/navigation";
import useHandleMenuPosition from "@/hooks/useHandleMenuPosition";
import useStore from "@/hooks/store";
import { twMerge as tm } from "tailwind-merge";
import useHandleMenuHeight from "@/hooks/ChapterImagesHooks/useHandleMenuHeight";
import convertSlugToChapter from "@/utils/convertSlugToChapter";

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

  const { altTitle, chapterSlug }: { altTitle: string; chapterSlug: string } =
    useParams();
  const { chaptersButtonPosition } = useStore((state) => ({
    chaptersButtonPosition: state.chaptersButtonPosition,
  }));
  const menuPosition = useHandleMenuPosition(chaptersButtonPosition);
  const menuHeight = useHandleMenuHeight(chaptersMenuVisibility, ref);
  const actualChapterNumber = getChapterNumber(
    convertSlugToChapter(chapterSlug),
  );
  return (
    chaptersMenuVisibility && (
      <div className="h-0">
        <div
          ref={ref}
          className={tm(
            "relative z-20 flex max-h-80 min-w-44 flex-col overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black",
            menuPosition === "bottom of the button" && "top-1",
          )}
          style={
            menuPosition === "top of the button"
              ? { bottom: menuHeight + 43 }
              : undefined
          }
        >
          {chapters.map((chapter) => {
            const { chapterTitle } = chapter;
            const chapterNumber = getChapterNumber(chapterTitle);
            return (
              <div
                key={chapterTitle}
                className={tm(
                  "flex w-full cursor-pointer items-center justify-start rounded-lg border border-transparent py-1 pl-2 hover:bg-neutral-300 dark:hover:bg-neutral-700",
                  chapterNumber === actualChapterNumber &&
                    "rounded-lg border-orange-400 hover:border-orange-600 hover:bg-transparent dark:hover:bg-transparent",
                )}
              >
                <Link href={`/manga/${altTitle}/chapter-${chapterNumber}`}>
                  Chapter {chapterNumber}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};
export default ChaptersMenu;
