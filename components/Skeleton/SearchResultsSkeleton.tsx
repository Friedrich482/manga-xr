import MainElementSkeleton from "./MainElementSkeleton";

const SearchResultsSkeleton = () => {
  const list = Array(21)
    .fill(0)
    .map((_, i) => i);

  return (
    <div className="flex w-full flex-wrap items-center justify-start gap-x-6 gap-y-12">
      {list.map((element) => (
        <MainElementSkeleton key={element} />
      ))}
    </div>
  );
};
export default SearchResultsSkeleton;
