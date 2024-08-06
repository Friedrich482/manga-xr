import { fetchSearchMangaResults } from "@/utils/fetch/fetchSearchMangaResults";
import MangaElement from "../MainMangaElement";

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
    <div className="flex w-[116.67%] items-center justify-center text-2xl">
      No result found for {mangaName}
    </div>
  );
};
