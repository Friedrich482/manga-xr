import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import { metadata } from "../layout";
import { mangaSearchSchema } from "@/zod-schema/schema";
import Main from "@/components/lib/Main";
import Results from "@/components/SearchPage/Results";
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
    <Main className="max-large-nav:flex-col large-nav:justify-end">
      <Results mangaName={mangaName} />
      <LargeMostPopular />
      <SmallMostPopular />
    </Main>
  );
};
export { SearchPage as default };
