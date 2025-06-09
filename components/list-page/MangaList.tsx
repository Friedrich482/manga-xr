import { FETCH_LIST_FROM_LETTER_TAG } from "@/lib/cache-keys/unstable_cache";
import ReloadDataButton from "../lib/ReloadDataButton";
import ResultMainElement from "../search-page/ResultMainElement";
import { fetchSearchMangaResults } from "@/utils/fetch/fetchSearchMangaResults";

const MangaList = async ({ index }: { index: string }) => {
  const listOfManga = await fetchSearchMangaResults(
    index === "numbers" ? "" : index,
  );

  if (!listOfManga || listOfManga.length === 0) {
    return (
      <ReloadDataButton
        tag={`${FETCH_LIST_FROM_LETTER_TAG}:${index.toUpperCase()}`}
      />
    );
  }

  return (
    <section className="grid w-5/6 min-w-32 grid-cols-1 gap-x-6 gap-y-20 min-[450px]:grid-cols-2 min-[760px]:grid-cols-3 min-[1200px]:grid-cols-4">
      {listOfManga.map((manga) => (
        <ResultMainElement key={manga.title} manga={manga} />
      ))}
    </section>
  );
};
export default MangaList;
