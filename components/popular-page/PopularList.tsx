import { FETCH_POPULAR_MANGA_TAG } from "@/lib/cache-keys/unstable_cache";
import MangaElement from "../MainMangaElement";
import { NUMBER_TO_FETCH_ON_POPULAR_PAGE } from "@/lib/constants";
import ReloadDataButton from "../lib/ReloadDataButton";
import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";

const PopularList = async () => {
  const popularMangaS = await fetchPopularManga(
    NUMBER_TO_FETCH_ON_POPULAR_PAGE,
  );

  if (!popularMangaS || popularMangaS.length === 0) {
    return <ReloadDataButton tag={FETCH_POPULAR_MANGA_TAG} />;
  }

  return (
    <section className="grid w-full min-w-32 grid-cols-1 gap-x-6 gap-y-20 min-[450px]:grid-cols-2 min-[760px]:grid-cols-3 min-[1200px]:grid-cols-4">
      {popularMangaS.map((manga) => (
        <MangaElement manga={manga} key={manga.title} />
      ))}
    </section>
  );
};
export default PopularList;
