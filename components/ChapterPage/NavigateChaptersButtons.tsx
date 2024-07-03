import { chapterType } from "@/zod-schema/schema";
import Link from "next/link";
import getChapterNumber from "@/utils/getChapterNumber";
import { twMerge as tm } from "tailwind-merge";
import { GrNext, GrPrevious } from "react-icons/gr";

const NavigateChaptersButtons = ({
  chapterTitleFromUrl,
  altTitle,
  chapters,
}: {
  chapterTitleFromUrl: string;
  altTitle: string;
  chapters: chapterType[];
}) => {
  const chapterNumber = getChapterNumber(chapterTitleFromUrl);
  const [currentChapter] = chapters.filter((chapter) => {
    const { chapterTitle } = chapter;
    return getChapterNumber(chapterTitle) === chapterNumber;
  });
  const currentChapterIndex = chapters.indexOf(currentChapter);
  const previousChapter =
    currentChapterIndex < chapters.length - 1
      ? chapters[currentChapterIndex + 1]
      : null; // + 1 : because the chapters array is in descending order

  const nextChapter =
    currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null; // -1 : same reason

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={
          previousChapter
            ? `/manga/${altTitle}/chapter-${getChapterNumber(previousChapter.chapterTitle)}`
            : ""
        }
        className={tm(
          "flex w-36 justify-center gap-1 rounded-lg border border-neutral-800/50 px-4 py-1 disabled:cursor-not-allowed dark:border-neutral-500/50 dark:text-neutral-300 dark:hover:text-white dark:active:border-neutral-500",
          !previousChapter && "pointer-events-none",
        )}
      >
        <GrPrevious
          className={tm(
            "size-4 self-center",
            !previousChapter && "text-neutral-500/40",
          )}
        />
        <span className={tm(!previousChapter && "text-neutral-500/40", "")}>
          Previous
        </span>
      </Link>
      <Link
        href={
          nextChapter
            ? `/manga/${altTitle}/chapter-${getChapterNumber(nextChapter.chapterTitle)}`
            : ""
        }
        className={tm(
          "flex w-36 justify-center gap-1 rounded-lg border border-neutral-800/50 px-4 py-1 disabled:cursor-not-allowed dark:border-neutral-500/50 dark:text-neutral-300 dark:hover:text-white dark:active:border-neutral-500",
          !nextChapter && "pointer-events-none",
        )}
      >
        <span className={tm(!nextChapter && "text-neutral-500/40")}>Next</span>
        <GrNext
          className={tm(
            "size-4 self-center",
            !nextChapter && "text-neutral-500/40",
          )}
        />
      </Link>
    </div>
  );
};
export default NavigateChaptersButtons;
