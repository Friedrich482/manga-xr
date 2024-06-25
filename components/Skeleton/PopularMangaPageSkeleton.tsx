import MainElementSkeleton from "./MainElementSkeleton";

const PopularMangaPageSkeleton = () => {
  const list = Array(55)
    .fill(0)
    .map((_, i) => i);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-11">
      {list.map((element) => (
        <MainElementSkeleton key={element} />
      ))}
    </div>
  );
};
export default PopularMangaPageSkeleton;
