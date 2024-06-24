import LargePopularMangaElement from "./LargePopularMangaElement";
import { fetchPopularManga } from "@/utils/manga/fetchPopularManga";

const LargePopularMangaList = async () => {
  const popularMangaS = await fetchPopularManga();
  if (popularMangaS) {
    return (
      <>
        <div className="hidden flex-col items-center justify-center gap-8 large-nav:flex">
          {popularMangaS.map((manga) => {
            return <LargePopularMangaElement manga={manga} key={manga.title} />;
          })}
        </div>
      </>
    );
  }
};
export { LargePopularMangaList as default };
