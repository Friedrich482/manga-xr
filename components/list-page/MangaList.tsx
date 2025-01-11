import { FETCH_LIST_FROM_LETTER_TAG } from "@/lib/cache-keys/unstable_cache";
import ReloadDataButton from "../lib/ReloadDataButton";
import { fetchSearchMangaResults } from "@/utils/fetch/fetchSearchMangaResults";
import ResultMainElement from "../search-page/ResultMainElement";

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
  } else {
    return (
      <section className="flex w-5/6 flex-wrap items-center justify-start gap-12">
        {listOfManga.map((manga) => (
          <ResultMainElement key={manga.title} manga={manga} />
        ))}
      </section>
    );
  }
};
export default MangaList;
