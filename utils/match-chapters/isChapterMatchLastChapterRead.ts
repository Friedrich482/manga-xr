const isChapterMatchLastChapterRead = (
  chapterTitle: string,
  lastChapterObject: { mangaSlug: string; lastChapterRead: string },
) => {
  if (!lastChapterObject.mangaSlug || !lastChapterObject.lastChapterRead)
    return false;
  const { lastChapterRead, mangaSlug } = lastChapterObject;
  const lastChapterReadNumber = lastChapterRead.slice(
    lastChapterRead.lastIndexOf("-") + 1,
  );
  const currentChapterNumber = chapterTitle.toLowerCase().split(" ").pop();

  const isChapterNumberMatch = lastChapterReadNumber === currentChapterNumber;
  const mangaSeasonIndexOf_ = mangaSlug.lastIndexOf("_");

  const mangaNumberSeason = mangaSlug.slice(mangaSeasonIndexOf_ + 1);

  const chapterTitleSeason = chapterTitle.split(" ")[0].slice(1); // Assumes format like "S123 <chapter-title>"
  if (Number(chapterTitleSeason)) {
    // in this case there is a season
    return isChapterNumberMatch && mangaNumberSeason === chapterTitleSeason;
  }
  // there is no season in the current chapterTitle, the first condition
  // skips all the bookmarked chapters which have a season but match the chapter number
  return mangaSeasonIndexOf_ === -1 && isChapterNumberMatch;
};

export default isChapterMatchLastChapterRead;
