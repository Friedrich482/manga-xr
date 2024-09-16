const isChapterMatchChapterFromHistory = (
  historyChapters:
    | {
        slug: string;
        chapter: string;
      }[]
    | undefined,
  chapterTitle: string,
) => {
  return historyChapters
    ? historyChapters.some(({ slug: mangaSlug, chapter: chapterSlug }) => {
        const historyChapterNumber = chapterSlug.slice(
          chapterSlug.lastIndexOf("-") + 1,
        );
        const currentChapterNumber = chapterTitle
          .toLowerCase()
          .split(" ")
          .pop();

        const isChapterNumberMatch =
          historyChapterNumber === currentChapterNumber;

        const mangaSeasonIndexOf_ = mangaSlug.lastIndexOf("_");

        const mangaNumberSeason = mangaSlug.slice(mangaSeasonIndexOf_ + 1);

        const chapterTitleSeason = chapterTitle.split(" ")[0].slice(1); // Assumes format like "S123 Chapter Title"

        if (Number(chapterTitleSeason)) {
          // in this case there is a season
          return (
            isChapterNumberMatch && mangaNumberSeason === chapterTitleSeason
          );
        }
        // there is no season in the chapterTitle, let's make that there is no season in the mangaSlug
        return mangaSeasonIndexOf_ === -1 && isChapterNumberMatch;
      })
    : false;
};
export default isChapterMatchChapterFromHistory;
