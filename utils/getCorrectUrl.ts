const getCorrectUrl = (altTitle: string, chapterTitle: string) => {
  const numberRegex = /\d+(?:\.\d+)?/g;
  const matches = Array.from(chapterTitle.matchAll(numberRegex));

  if (matches.length >= 2) {
    const [chapterSeason, chapterNumber] = matches.map((match) => match[0]);
    return `/manga/${altTitle}-${chapterSeason}/chapter-${chapterNumber}`;
  } else if (matches.length === 1) {
    const [chapterNumber] = matches.map((match) => match[0]);
    return `/manga/${altTitle}/chapter-${chapterNumber}`;
  }
  return ``;
};

export default getCorrectUrl;