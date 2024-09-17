import LargePopularMangaElement from "./LargePopularMangaElement";
import { MAIN_URL } from "@/lib/constants";
import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";

const LargePopularMangaList = async () => {
  const popularMangaS = await fetchPopularManga(10, MAIN_URL);
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
export default LargePopularMangaList;
