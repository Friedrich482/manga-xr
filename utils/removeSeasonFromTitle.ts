const removeSeasonFromTitle = (mangaSlug: string) => {
  return mangaSlug.indexOf("_") !== -1
    ? mangaSlug.slice(0, mangaSlug.indexOf("_"))
    : mangaSlug;
};

export default removeSeasonFromTitle;
