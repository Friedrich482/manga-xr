import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";
import MangaElement from "../MainMangaElement";
import { numberToFetchOnPopularPage } from "@/lib/constants";

const PopularList = async () => {
  const popularMangaS = await fetchPopularManga(
    numberToFetchOnPopularPage,
    "https://mangasee123.com/hot.php",
  );
  if (popularMangaS) {
    return (
      <section className="flex w-full flex-wrap items-center justify-start gap-12">
        {popularMangaS.map((manga) => {
          return <MangaElement manga={manga} key={manga.title} />;
        })}
      </section>
    );
  }
};
export default PopularList;
