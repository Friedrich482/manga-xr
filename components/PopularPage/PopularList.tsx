import { fetchPopularManga } from "@/utils/manga/fetchPopularManga";
import MangaElement from "../MainElement";

const PopularList = async () => {
  const popularMangaS = await fetchPopularManga(
    21,
    "https://mangasee123.com/hot.php",
  );
  if (popularMangaS) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-8">
        {popularMangaS.map((manga) => {
          return <MangaElement manga={manga} key={manga.title} />;
        })}
      </div>
    );
  }
};
export default PopularList;
