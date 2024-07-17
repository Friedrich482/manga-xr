const getSeasonFromTitle = (
  mangaTitle: string,
): { title: string; season: number | null } => {
  const match = mangaTitle.match(/-?(\d+)$/);

  if (match) {
    const season = parseInt(match[1], 10);
    const title = mangaTitle.slice(0, -match[0].length);
    return { title, season };
  } else {
    return { title: mangaTitle, season: null };
  }
};

export default getSeasonFromTitle;
