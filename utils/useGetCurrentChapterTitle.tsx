import convertSlugToChapter from "@/utils/convertSlugToChapter";
import getSeasonFromTitle from "@/utils/getSeasonFromTitle";
import { chapterType } from "@/zod-schema/schema";
import { useParams } from "next/navigation";
import capitalize from "./capitalize";

const numberRegex = /\d+(?:\.\d+)?/g;
const useGetCurrentChapterTitle = (chapters: chapterType[]) => {
  const { altTitle, chapterSlug }: { altTitle: string; chapterSlug: string } =
    useParams();
  const { season } = getSeasonFromTitle(altTitle);
  if (!season) {
    return capitalize(convertSlugToChapter(chapterSlug));
  }
  const currentChapterNumber = chapterSlug.substring(
    chapterSlug.lastIndexOf("-") + 1,
  );
  for (const chapter of chapters) {
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
