import { MAIN_URL, NUMBER_TO_FETCH_ON_POPULAR_PAGE } from "@/lib/constants";
import MangaElement from "../MainMangaElement";
import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";

const PopularList = async () => {
  const popularMangaS = await fetchPopularManga(
    NUMBER_TO_FETCH_ON_POPULAR_PAGE,
    `${MAIN_URL}/hot.php`,
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
