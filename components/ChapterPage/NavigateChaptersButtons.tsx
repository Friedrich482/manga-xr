import { GrNext, GrPrevious } from "react-icons/gr";
import { ChapterType } from "@/zod-schema/schema";
import Link from "next/link";
import getChapterNumber from "@/utils/getChapterNumber";
import { twMerge as tm } from "tailwind-merge";

const NavigateChaptersButtons = ({
  chapterTitleFromUrl,
  mangaSlug,
  chapters,
}: {
  chapterTitleFromUrl: string;
  mangaSlug: string;
  chapters: ChapterType[];
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

  const navigationElements = [
    {
      name: "Previous",
      chapter: previousChapter,
      Icon: GrPrevious,
    },
    {
      name: "Next",
      chapter: nextChapter,
      Icon: GrNext,
    },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {navigationElements.map(({ name, chapter, Icon }) => (
        <Link
          key={name}
          href={
            chapter
              ? `/manga/${mangaSlug}/chapter-${getChapterNumber(chapter.chapterTitle)}`
              : chapter === nextChapter
                ? `/manga/${mangaSlug}`
                : ""
          }
          className={tm(
            "flex items-center justify-center gap-x-1 rounded-lg border border-neutral-800/50 px-2 py-1 hover:border-neutral-500 disabled:cursor-not-allowed dark:border-neutral-500/50 dark:text-neutral-300 dark:hover:text-white dark:active:border-neutral-500 max-options-menu-breakpoint-2:text-base options-menu-breakpoint-2:w-36 options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3 options-menu-breakpoint-2:px-4",
            !chapter && name === "Previous" && "pointer-events-none",
            chapter === nextChapter && "flex-row-reverse",
          )}
        >
          <Icon
            className={tm(
              "size-4 self-center",
              !chapter && name === "Previous" && "text-neutral-500/40",
            )}
          />
          <span
            className={tm(
              !chapter && name === "Previous" && "text-neutral-500/40",
            )}
          >
            {name}
          </span>
        </Link>
      ))}
    </div>
  );
};
export default NavigateChaptersButtons;
