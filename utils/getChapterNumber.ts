const getChapterNumber = (chapterTitle: string) => {
  return chapterTitle.substring(chapterTitle.indexOf(" ") + 1);
};

export default getChapterNumber;
