const getGenres = (genres: string) => {
  const arrayOfGenres: string[] = [];
  let i = 0;
  let index = 0;
  let substring = genres;
  while (i < 9) {
    index = substring.indexOf(",");
    if (index === -1) {
      arrayOfGenres.push(substring);
      break;
    }
    let genre = substring.slice(0, index);
    substring = substring.substring(index + 2, substring.length);
    arrayOfGenres.push(genre);
    i++;
  }
  return arrayOfGenres;
};

export default getGenres;
