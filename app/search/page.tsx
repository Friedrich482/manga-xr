import Search from "@/components/SearchPage/Search";
const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <Search searchParams={searchParams} />;
};
export default SearchPage;
