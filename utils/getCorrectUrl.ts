const getCorrectUrl = (mangaSlug: string, chapterTitle: string) => {
  const numberRegex = /\d+(?:\.\d+)?/g;
  const matches = Array.from(chapterTitle.matchAll(numberRegex));

  if (matches.length >= 2) {
    const [chapterSeason, chapterNumber] = matches.map((match) => match[0]);
    if (Number(chapterSeason) > 1) {
      return `/manga/${mangaSlug}_${chapterSeason}/chapter-${chapterNumber}`;
    } else {
      return `/manga/${mangaSlug}/chapter-${chapterNumber}`;
    }
  } else if (matches.length === 1) {
    const [chapterNumber] = matches.map((match) => match[0]);
    return `/manga/${mangaSlug}/chapter-${chapterNumber}`;
  }
  return ``;
};

export default getCorrectUrl;
