const convertChapterToSlug = (chapter: string) => {
  return chapter.replace(" ", "-");
};

export default convertChapterToSlug;
