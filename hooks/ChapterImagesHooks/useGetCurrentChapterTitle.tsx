import { ChapterType } from "@/zod-schema/schema";
import getSeasonFromTitle from "@/utils/getSeasonFromTitle";
import { useParams } from "next/navigation";

const numberRegex = /\d+(?:\.\d+)?/g;
const useGetCurrentChapterTitle = (chapters: ChapterType[]) => {
  const { altTitle, chapterSlug }: { altTitle: string; chapterSlug: string } =
    useParams();
  const { season } = getSeasonFromTitle(altTitle);
  const currentChapterNumber = chapterSlug.substring(
    chapterSlug.lastIndexOf("-") + 1,
  );
  if (!season) {
    for (const chapter of chapters.toReversed()) {
      const { chapterTitle } = chapter;
      if (chapterTitle.includes(currentChapterNumber)) {
        if (
          chapterTitle.charAt(
            chapterTitle.indexOf(currentChapterNumber) - 1,
          ) === "S" &&
          chapterTitle
            .slice(chapterTitle.lastIndexOf(" "))
            .includes(currentChapterNumber)
        ) {
          return chapterTitle;
        } else if (
          chapterTitle.charAt(
            chapterTitle.indexOf(currentChapterNumber) - 1,
          ) === " "
        ) {
          // this additional conditions make sure that the chapter number is not a part of an other chapter number.
          // For example, with "chapter 155" and "chapter 55" and "55" as currentChapterNumber, we will get exactly "chapter 55".
          // We take the chapter containing exactly the currentChapterNumber
          return chapterTitle;
        }
      }
    }
  }
  for (const chapter of chapters.toReversed()) {
    const { chapterTitle } = chapter;
    const matches = Array.from(chapterTitle.matchAll(numberRegex));
    if (matches.length >= 2) {
      const [chapterSeason, chapterNumber] = matches.map((match) => match[0]);
      if (
        currentChapterNumber === chapterNumber &&
        season === Number(chapterSeason)
      ) {
        return chapterTitle;
      }
      continue;
    }
    continue;
  }
  return chapters[0].chapterTitle;
};

export default useGetCurrentChapterTitle;
