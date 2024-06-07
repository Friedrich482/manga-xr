import { mangaSearchSchema } from "@/zod-schema/schema";
import { metadata } from "../layout";
import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import ResultElement from "@/components/searchPage/ResultElement";
import { Suspense } from "react";
const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const mangaName = mangaSearchSchema.parse(searchParams.name);
  metadata.title = `Search : ${mangaName}`;
  const mangaDex = new MangaDex();
  const results = (await mangaDex.search(mangaName)).results;
  console.log(results);
  return (
    <main className="mt-10 flex min-h-lvh items-center justify-center">
      <h1>Results of research</h1>
      {results.map((result) => (
        <Suspense key={result.id} fallback={<div>Loading...</div>}>
          <ResultElement key={result.id} mangaResult={result} />
        </Suspense>
      ))}
      <div></div>
    </main>
  );
};
export default SearchPage;
