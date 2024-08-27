import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import { metadata } from "../layout";
import Main from "@/components/lib/Main";
import Results from "@/components/SearchPage/Results";
import { mangaSearchFormSchema } from "@/zod-schema/schema";
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
