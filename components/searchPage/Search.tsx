import { mangaSearchSchema } from "@/zod-schema/schema";
import { metadata } from "@/app/layout";
import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import ResultElement from "@/components/SearchPage/ResultElement";
import { Suspense } from "react";
import { MostPopular } from "@/components/HomePage";

const Search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const mangaName = mangaSearchSchema.parse(searchParams.name);
  metadata.title = `Search : ${mangaName}`;
  const mangaDex = new MangaDex();
  const results = (await mangaDex.search(mangaName)).results;
  return (
    <main className="flex min-h-lvh w-full flex-col-reverse items-center justify-center gap-6 px-5 large-nav:flex-row">
      <section className="mt-20 flex w-3/4 flex-col items-center justify-center px-3">
        <h2 className="mb-10 w-full text-center text-3xl text-neutral-700  hover:text-default-black dark:text-neutral-300 dark:hover:text-default-white">
          Results of research :{" "}
          <span className="text-orange-400 hover:text-orange-700">
            {mangaName}
          </span>
        </h2>
        <div className="flex w-full flex-wrap items-center justify-center  gap-x-6 gap-y-12">
          {results.map((result) => (
            <Suspense key={result.id} fallback={<div>Loading...</div>}>
              <ResultElement key={result.id} mangaResult={result} />
            </Suspense>
          ))}
        </div>
      </section>
      <MostPopular />
    </main>
  );
};
export default Search;
