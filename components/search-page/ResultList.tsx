import ResultMainElement from "./ResultMainElement";
import { fetchSearchMangaResults } from "@/utils/fetch/fetchSearchMangaResults";
import { notFound } from "next/navigation";

export const ResultList = async ({ mangaName }: { mangaName: string }) => {
  const searchResults = await fetchSearchMangaResults(mangaName);

  if (!searchResults) notFound();

  if (searchResults.length === 0) {
    return (
      <div className="flex w-[100%] flex-col items-center justify-center gap-4 text-2xl">
        <p>No result found for {mangaName}</p>
      </div>
    );
  }

  return (
    <div className="flex w-5/6 min-w-32 flex-wrap items-center justify-start gap-x-6 gap-y-12">
      {searchResults.map((result) => (
        <ResultMainElement key={result.title} manga={result} />
      ))}
    </div>
  );
};
