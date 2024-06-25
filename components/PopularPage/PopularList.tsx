import { fetchPopularManga } from "@/utils/manga/fetchPopularManga";
import MangaElement from "../MainElement";

const PopularList = async () => {
  const popularMangaS = await fetchPopularManga(
    55,
    "https://mangasee123.com/hot.php",
  );
  if (popularMangaS) {
    return (
      <div className="flex w-full flex-wrap items-center justify-start gap-12">
        {popularMangaS.map((manga) => {
          return <MangaElement manga={manga} key={manga.title} />;
        })}
      </div>
    );
  }
};
export default PopularList;
