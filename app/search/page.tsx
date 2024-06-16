import Search from "@/components/SearchPage/Search";
import { metadata } from "../layout";
import { mangaSearchSchema } from "@/zod-schema/schema";
const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const mangaName = mangaSearchSchema
    .parse(searchParams.name)
    .replace("+", " ");

  metadata.title = `Search : ${mangaName}`;

  return <Search mangaName={mangaName} />;
};
export default SearchPage;
