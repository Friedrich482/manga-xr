const getGenres = (genres: string) => {
  const arrayOfGenres: string[] = [];
  genres.split(", ").forEach((genre) => {
    arrayOfGenres.length < 9 ? arrayOfGenres.push(genre) : null;
  });
  return arrayOfGenres;
};

export default getGenres;
