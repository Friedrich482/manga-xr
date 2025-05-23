import LargeMostPopular from "@/components/home-page/popular/large/LargeMostPopular";
import Main from "@/components/lib/Main";
import Results from "@/components/search-page/Results";
import SmallMostPopular from "@/components/home-page/popular/small/SmallMostPopular";
import { mangaSearchFormSchema } from "@/zod-schema/schema";
import { metadata } from "../layout";
const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  let mangaName: string;

  if (!(await searchParams).name) {
    mangaName = "";
  } else {
    const parsedData = mangaSearchFormSchema.safeParse(await searchParams);
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
export default SearchPage;
