import { FETCH_POPULAR_MANGA_TAG } from "@/lib/cache-keys/unstable_cache";
import LargePopularMangaElement from "./LargePopularMangaElement";
import { MAIN_URL } from "@/lib/constants";
import ReloadDataButton from "@/components/lib/ReloadDataButton";
import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";

const LargePopularMangaList = async () => {
  const popularMangaS = await fetchPopularManga(10, MAIN_URL);
  if (!popularMangaS || popularMangaS.length === 0) {
    return <ReloadDataButton tag={`${FETCH_POPULAR_MANGA_TAG} sample`} />;
  } else {
    return (
      <div className="hidden flex-col items-center justify-center gap-8 large-nav:flex">
        {popularMangaS.map((manga) => {
          return <LargePopularMangaElement manga={manga} key={manga.title} />;
        })}
      </div>
    );
  }
};
export default LargePopularMangaList;
