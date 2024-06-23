import { fetchSearchMangaResults } from "@/utils/manga/fetchSearchMangaResults";
import ResultElement from "./ResultElement";

export const ResultList = async ({ mangaName }: { mangaName: string }) => {
  const searchResults = await fetchSearchMangaResults(mangaName);
  if (searchResults) {
    return (
      <div className="flex w-full flex-wrap items-center justify-start gap-x-6 gap-y-12">
        {searchResults.map((result) => (
          <ResultElement key={result.title} result={result} />
        ))}
      </div>
    );
  }
};
