import { getAllMangaBookmarks } from "@/data-access/bookmarks";

const isChapterMatchBookmark = (
  bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>>,
  chapterTitle: string,
) => {
  return bookmarkedChapters.some(({ chapterSlug, mangaSlug }) => {
    const bookmarkedChapterNumber = chapterSlug.slice(
      chapterSlug.lastIndexOf("-") + 1,
    );
    const currentChapterNumber = chapterTitle.toLowerCase().split(" ").pop();

    const isChapterNumberMatch =
      bookmarkedChapterNumber === currentChapterNumber;

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
  });
};
export default isChapterMatchBookmark;
