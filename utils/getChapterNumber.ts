const getChapterNumber = (chapterTitle: string) => {
  return chapterTitle.split(" ").pop();
};

export default getChapterNumber;
