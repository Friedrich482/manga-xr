const getGenres = (genres: string) => genres.split(",").slice(0, 9);
export default getGenres;
