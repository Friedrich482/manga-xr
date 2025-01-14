const isChapterMatchLastChapterRead = (
  chapterSlug: string,
  lastChapterReadSlug: string | undefined,
) => {
  return chapterSlug === lastChapterReadSlug;
};

export default isChapterMatchLastChapterRead;
