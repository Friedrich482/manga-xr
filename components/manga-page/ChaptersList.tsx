import BookMarkIcon from "../lib/BookMarkIcon";
import { BsPinAngleFill } from "react-icons/bs";
import { ChapterType } from "@/zod-schema/schema";
import Link from "next/link";
import { getAllMangaBookmarks } from "@/data-access/bookmarks";
import isChapterMatchBookmark from "@/utils/match-chapters/isChapterMatchBookmark";
import isChapterMatchChapterFromHistory from "@/utils/match-chapters/isChapterMatchChapterFromHistory";
import isChapterMatchLastChapterRead from "@/utils/match-chapters/isChapterMatchLastChapterRead";
import { twMerge as tm } from "tailwind-merge";

const ChaptersList = ({
  chapters,
  finalData,
  chaptersRead,
  lastChapterReadObject,
  bookmarkedChapters,
}: {
  chapters: ChapterType[];
  finalData: string;
  chaptersRead:
    | {
        mangaSlug: string;
        chapter: string;
      }[]
    | undefined;
  lastChapterReadObject: { mangaSlug: string; lastChapterRead: string };
  bookmarkedChapters:
    | Awaited<ReturnType<typeof getAllMangaBookmarks>>
    | undefined;
}) => {
  return chapters.length === 0 ? (
    <p className="flex gap-x-1 place-self-start self-start border border-transparent py-2 pl-6">
      No result found for <span className="text-primary">{finalData}</span>
    </p>
  ) : (
    <ul className="flex w-full flex-col items-center justify-start gap-y-5">
      {chapters.map(({ chapterReleaseDate, chapterTitle, chapterSlug }) => (
        <li key={chapterTitle} className="w-full cursor-pointer">
          <Link
            href={`/chapters/${chapterSlug}`}
            className={tm(
              "group relative flex w-full items-center justify-between rounded-lg border border-neutral-800/50 py-2 hover:border-neutral-800 hover:bg-neutral-300/25 dark:border-neutral-500/50 dark:hover:border-neutral-500 dark:hover:bg-neutral-700/25 max-chapters-breakpoint:flex-col",
              chaptersRead &&
                isChapterMatchChapterFromHistory(chaptersRead, chapterTitle) &&
                "text-neutral-600/40",
              chaptersRead &&
                isChapterMatchLastChapterRead(
                  chapterTitle,
                  lastChapterReadObject,
                ) &&
                "text-neutral-300/70",
            )}
          >
            <div className="flex justify-between gap-2 group-hover:text-primary chapters-breakpoint:pl-6">
              {chaptersRead &&
                isChapterMatchLastChapterRead(
                  chapterTitle,
                  lastChapterReadObject,
                ) && <BsPinAngleFill className="self-center text-primary" />}
              {bookmarkedChapters &&
                isChapterMatchBookmark(bookmarkedChapters, chapterTitle) && (
                  <BookMarkIcon className="absolute -right-1 -top-3" />
                )}
              {chapterTitle}
            </div>
            <span className="chapters-breakpoint:pr-6">
              {chapterReleaseDate}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default ChaptersList;
