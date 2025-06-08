import ResultMainElement from "./ResultMainElement";
import { fetchSearchMangaResults } from "@/utils/fetch/fetchSearchMangaResults";

export const ResultList = async ({ mangaName }: { mangaName: string }) => {
  const searchResults = await fetchSearchMangaResults(mangaName);

  if (searchResults.length === 0) {
    return (
      <div className="flex w-[100%] flex-col items-center justify-center gap-4 text-2xl">
        <p>No result found for {mangaName}</p>
      </div>
    );
  }

  return (
    <div className="grid w-5/6 min-w-32 grid-cols-1 gap-x-6 gap-y-20 min-[450px]:grid-cols-2 min-[760px]:grid-cols-3 min-[1400px]:grid-cols-4">
      {searchResults.map((result) => (
        <ResultMainElement key={result.title} manga={result} />
      ))}
    </div>
  );
};
