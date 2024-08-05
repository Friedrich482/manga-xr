import MainElementSkeleton from "./MainElementSkeleton";
import PopularMangaElementLargeSkeleton from "./PopularMangaElementLargeSkeleton";

const LargePopularMangaSkeleton = () => {
  const list = Array(10)
    .fill(0)
    .map((_, i) => i);

  return (
    <div className="flex w-5/6 min-w-32 flex-wrap items-center justify-start gap-x-8 gap-y-12">
      {list.map((element) => (
        <PopularMangaElementLargeSkeleton key={element} />
      ))}
    </div>
  );
};
export default LargePopularMangaSkeleton;
