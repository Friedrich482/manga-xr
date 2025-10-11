import { FETCH_POPULAR_MANGA_TAG } from "@/lib/cache-keys/unstable_cache";
import ReloadDataButton from "@/components/lib/ReloadDataButton";
import SmallPopularMangaElement from "./SmallPopularMangaElement";
import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";

const SmallPopularMangaList = async () => {
  const popularMangaS = await fetchPopularManga(10);
  if (!popularMangaS || popularMangaS.length === 0) {
    return <ReloadDataButton tag={`${FETCH_POPULAR_MANGA_TAG}Sample`} />;
  }
  return (
    <div className="flex h-108 items-center justify-start gap-6 overflow-x-scroll rounded-lg bg-neutral-100 px-4 dark:bg-neutral-900 large-nav:hidden">
      {popularMangaS.map((manga) => (
        <SmallPopularMangaElement manga={manga} key={manga.title} />
      ))}
    </div>
  );
};

export default SmallPopularMangaList;
