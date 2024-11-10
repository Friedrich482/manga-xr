import PopularMangaElementSmallSkeleton from "./PopularMangaElementSmallSkeleton";

const list = Array(10)
  .fill(0)
  .map((_, i) => i);
const SmallPopularMangaSkeleton = () => {
  return (
    <div className="flex h-[27rem] items-center justify-start gap-6 overflow-x-scroll rounded-lg rounded-bl-lg bg-neutral-100 px-4 dark:bg-neutral-900 large-nav:hidden">
      {list.map((element) => (
        <PopularMangaElementSmallSkeleton key={element} />
      ))}
    </div>
  );
};
export default SmallPopularMangaSkeleton;
