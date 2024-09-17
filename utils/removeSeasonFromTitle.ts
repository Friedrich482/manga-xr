const removeSeasonFromTitle = (mangaSlug: string) => {
  if (mangaSlug.indexOf("_") !== -1) {
    return mangaSlug.slice(0, mangaSlug.indexOf("_"));
  }
  return mangaSlug;
};

export default removeSeasonFromTitle;
