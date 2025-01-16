import { getAllMangaBookmarks } from "@/data-access/bookmarks";

const isChapterMatchBookmark = (
  bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>>,
  chapterSlug: string,
) => {
  return bookmarkedChapters.some(
    (bookmarkedChapter) => bookmarkedChapter.chapterSlug === chapterSlug,
  );
};
export default isChapterMatchBookmark;
