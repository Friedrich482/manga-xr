export const getChapterNumber = (chapter: {
  chapterTitle: string;
  chapterReleaseDate: string;
}) => {
  // Sometimes, the manga doesn't use the word "chapter" to represent chapter but an another word such as volume, so we need to get that word and use it to get the number of the chapter

  const trimmedChapterTitle = chapter.chapterTitle
    .replace(/[\n\t]/g, "")
    .trim(); // purge characters like \t and \n by using a regex
  let altToChapterName = "";
  for (const char of trimmedChapterTitle) {
    if (/\d/.test(char)) {
      // get all the text before we meet a digit
      break;
    }
    altToChapterName += char;
  }
  const chapterNumber = trimmedChapterTitle.substring(
    trimmedChapterTitle.indexOf(altToChapterName) + altToChapterName.length,
  );
  return chapterNumber;
};
