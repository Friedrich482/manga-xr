const isChapterMatchChapterFromHistory = (
  historyChapters: string[] | undefined,
  chapterSlug: string,
) => {
  return historyChapters
    ? historyChapters.some(
        (chapterSlugFromHistory) => chapterSlugFromHistory === chapterSlug,
      )
    : false;
};
export default isChapterMatchChapterFromHistory;
