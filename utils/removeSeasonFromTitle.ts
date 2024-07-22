const removeSeasonFromTitle = (altTitle: string) => {
  if (altTitle.indexOf("_") !== -1) {
    return altTitle.slice(0, altTitle.indexOf("_"));
  }
  return altTitle;
};

export default removeSeasonFromTitle;
