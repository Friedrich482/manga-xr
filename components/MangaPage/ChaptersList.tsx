import getCorrectUrl from "@/utils/getCorrectUrl";
import { ChapterType } from "@/zod-schema/schema";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";
import { BsPinAngleFill } from "react-icons/bs";
const ChaptersList = ({
  chapters,
  altTitle,
  finalData,
  chaptersRead,
}: {
  chapters: ChapterType[];
  altTitle: string;
  finalData: string;
  chaptersRead: string[] | undefined;
}) => {
  return chapters.length === 0 ? (
    <p className="flex gap-x-1 place-self-start self-start border border-transparent py-2 pl-6">
      No result found for <span className="text-primary">{finalData}</span>
    </p>
  ) : (
    <ul className="flex w-full flex-col items-center justify-start gap-y-5">
      {chapters.map((chapter) => {
        const { chapterReleaseDate, chapterTitle } = chapter;
        getCorrectUrl(altTitle, chapterTitle);
        return (
          <li key={chapterTitle} className="w-full cursor-pointer">
            <Link
              href={getCorrectUrl(altTitle, chapterTitle)}
              className={tm(
                "group flex w-full items-center justify-between rounded-lg border border-neutral-800/50 py-2 hover:border-neutral-800 hover:bg-neutral-300/25 dark:border-neutral-500/50 dark:hover:border-neutral-500 dark:hover:bg-neutral-700/25 max-chapters-breakpoint:flex-col",
                chaptersRead &&
                  chapterTitle.toLowerCase() !== chaptersRead.at(-1) &&
                  chaptersRead.includes(chapterTitle.toLowerCase()) &&
                  "text-neutral-600/40",
                chaptersRead &&
                  chapterTitle.toLowerCase() === chaptersRead.at(-1) &&
                  "text-neutral-300/70",
              )}
            >
              <div className="flex justify-between gap-2 group-hover:text-primary chapters-breakpoint:pl-6">
                {chaptersRead &&
                  chapterTitle.toLowerCase() === chaptersRead.at(-1) && (
                    <BsPinAngleFill className="self-center text-primary" />
                  )}
                {chapterTitle}
              </div>
              <span className="chapters-breakpoint:pr-6">
                {chapterReleaseDate}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default ChaptersList;
