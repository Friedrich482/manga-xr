import { fetchSearchMangaResults } from "@/utils/manga/fetchSearchMangaResults";
import MangaElement from "../MainMangaElement";

export const ResultList = async ({ mangaName }: { mangaName: string }) => {
  const searchResults = await fetchSearchMangaResults(mangaName);
  if (searchResults) {
    return (
      <div className="flex w-full flex-wrap items-center justify-start gap-x-6 gap-y-12">
        {searchResults.map((result) => (
          <MangaElement key={result.title} manga={result} />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-36 flex w-[116.67%] items-center justify-center text-2xl">
      No result found for {mangaName}
    </div>
  );
};
