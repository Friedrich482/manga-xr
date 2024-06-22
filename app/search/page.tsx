import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import { metadata } from "../layout";
import { mangaSearchSchema } from "@/zod-schema/schema";
import { ResultList } from "@/components/SearchPage/ResultList";
import { Suspense } from "react";

const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const mangaName = mangaSearchSchema
    .parse(searchParams.name)
    .replace("+", " ");

  metadata.title = `Search : ${mangaName}`;

  return (
    <main className="flex min-h-lvh w-full flex-col-reverse items-center justify-center gap-6 px-5 large-nav:flex-row">
      <section className="mt-20 flex w-3/4 flex-col items-start justify-start self-start px-3">
        <h2 className="mb-10 w-full text-center text-3xl text-neutral-700  hover:text-default-black dark:text-neutral-300 dark:hover:text-default-white">
          Results of research :{" "}
          <span className="text-orange-400 hover:text-orange-700">
            {mangaName}
          </span>
        </h2>
        <div className="flex w-5/6 place-self-center">
          <Suspense fallback={<div>Fetching results...</div>}>
            <ResultList mangaName={mangaName} />
          </Suspense>
        </div>
      </section>
      <LargeMostPopular />
      <SmallMostPopular />
    </main>
  );
};
export default SearchPage;
