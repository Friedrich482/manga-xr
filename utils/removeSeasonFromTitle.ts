const removeSeasonFromTitle = (altTitle: string) => {
  const numberRegex = /\d+(?:\.\d+)?/g;
  const matches = Array.from(altTitle.matchAll(numberRegex));

  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const index = altTitle.lastIndexOf(lastMatch[0]);
    const dashIndex = altTitle.lastIndexOf("-", index - 1);

    if (dashIndex !== -1) {
      return altTitle.slice(0, dashIndex);
    }
  }

  return altTitle;
};

export default removeSeasonFromTitle;
