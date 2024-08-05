import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import { metadata } from "../layout";
import { mangaSearchSchema } from "@/zod-schema/schema";
import { ResultList } from "@/components/SearchPage/ResultList";
import { Suspense } from "react";
import SearchResultsSkeleton from "@/components/Skeleton/SearchResultsSkeleton";
import Main from "@/components/lib/Main";
const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let mangaName: string;
  if (!searchParams.name) {
    mangaName = "";
  } else {
    mangaName = mangaSearchSchema.parse(searchParams.name).replace("+", " ");
  }
  metadata.title = `Search : ${mangaName}`;
  return (
    <Main>
      <section className="mt-20 flex w-3/4 flex-col items-center justify-start self-start">
        <h2 className="mb-10 w-full text-center text-3xl text-neutral-700  hover:text-default-black dark:text-neutral-300 dark:hover:text-default-white">
          Results of research :{" "}
          <span className="text-orange-400 hover:text-orange-700">
            {mangaName !== "" ? mangaName : "' '"}
          </span>
        </h2>
        <div className="flex w-5/6 place-self-center">
          <Suspense fallback={<SearchResultsSkeleton />} key={mangaName}>
            <ResultList mangaName={mangaName} />
          </Suspense>
        </div>
      </section>
      <LargeMostPopular />
      <SmallMostPopular />
    </Main>
  );
};
export { SearchPage as default };
