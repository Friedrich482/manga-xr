import LargeMostPopular from "@/components/home-page/Popular/Large/LargeMostPopular";
import Main from "@/components/lib/Main";
import Results from "@/components/search-page/Results";
import SmallMostPopular from "@/components/home-page/Popular/Small/SmallMostPopular";
import { mangaSearchFormSchema } from "@/zod-schema/schema";
import { metadata } from "../layout";
const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let mangaName: string;
  if (!searchParams.name) {
    mangaName = "";
  } else {
    const parsedData = mangaSearchFormSchema.safeParse(searchParams);
    if (!parsedData.success) {
      mangaName = "";
    } else {
      mangaName = parsedData.data.name;
    }
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
