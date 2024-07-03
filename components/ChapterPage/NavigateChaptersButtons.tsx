import { chapterType } from "@/zod-schema/schema";
import cleanChaptersArray from "@/utils/fetch/cleanChaptersArray";
import Link from "next/link";

const NavigateChaptersButtons = ({
  chapterTitleFromUrl,
  altTitle,
  chapters,
}: {
  chapterTitleFromUrl: string;
  altTitle: string;
  chapters: chapterType[];
}) => {
  const cleanedChapters = cleanChaptersArray(chapters);
  const chapterNumber = chapterTitleFromUrl.substring(
    chapterTitleFromUrl.indexOf(" ") + 1,
  );
  const chapterPosition = chapters.filter((chapter) =>
    chapter.chapterTitle.includes(chapterNumber),
  );
  return (
    <div className="flex gap-2">
      <Link
        href={`/manga/${altTitle}/chapter-${""}`}
        className="flex w-28 justify-center rounded-lg border border-neutral-800/50 px-4 py-1 disabled:cursor-not-allowed disabled:text-neutral-500 dark:border-neutral-500/50 dark:text-neutral-300 dark:hover:text-white dark:active:border-neutral-500"
      >
        Previous
      </Link>
      <Link
        href={`/manga/${altTitle}/chapter-${""}`}
        className="flex w-28 justify-center rounded-lg border border-neutral-800/50 px-4 py-1 disabled:cursor-not-allowed disabled:text-neutral-500 dark:border-neutral-500/50 dark:text-neutral-300 dark:hover:text-white dark:active:border-neutral-500"
      >
        Next
      </Link>
    </div>
  );
};
export default NavigateChaptersButtons;
