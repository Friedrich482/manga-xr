import { FETCH_POPULAR_MANGA_TAG } from "@/lib/cache-keys/unstable_cache";
import LargePopularMangaElement from "./LargePopularMangaElement";
import ReloadDataButton from "@/components/lib/ReloadDataButton";
import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";

const LargePopularMangaList = async () => {
  const popularMangaS = await fetchPopularManga(10);
  if (!popularMangaS || popularMangaS.length === 0) {
    return <ReloadDataButton tag={`${FETCH_POPULAR_MANGA_TAG}Sample`} />;
  } else {
    return (
      <div className="hidden flex-col items-center justify-center gap-8 large-nav:flex">
        {popularMangaS.map((manga) => (
          <LargePopularMangaElement manga={manga} key={manga.title} />
        ))}
      </div>
    );
  }
};
export default LargePopularMangaList;
