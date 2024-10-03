import { FETCH_SEARCH_MANGA_RESULTS_TAG } from "@/lib/cache-keys/unstable_cache";
import MangaElement from "../MainMangaElement";
import ReloadDataButton from "../lib/ReloadDataButton";
import { fetchSearchMangaResults } from "@/utils/fetch/fetchSearchMangaResults";

export const ResultList = async ({ mangaName }: { mangaName: string }) => {
  const searchResults = await fetchSearchMangaResults(mangaName);
  if (searchResults) {
    return (
      <div className="flex w-5/6 min-w-32 flex-wrap items-center justify-start gap-x-6 gap-y-12">
        {searchResults.map((result) => (
          <MangaElement key={result.title} manga={result} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex w-[100%] flex-col items-center justify-center gap-4 text-2xl">
      <p>No result found for {mangaName}</p>
      <ReloadDataButton
        tag={`${FETCH_SEARCH_MANGA_RESULTS_TAG}:${mangaName}`}
      />
    </div>
  );
};
