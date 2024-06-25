import PopularMangaElementSmallSkeleton from "./PopularMangaElementSmallSkeleton";

const SmallPopularMangaSkeleton = () => {
  const list = Array(10)
    .fill(0)
    .map((_, i) => i);

  return (
    <div className="mx-2 flex h-[27rem] items-center justify-start gap-6 overflow-x-scroll rounded-lg rounded-bl-lg bg-neutral-100 px-4 scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-neutral-600 dark:bg-neutral-900 dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-200 large-nav:hidden">
      {list.map((element) => (
        <PopularMangaElementSmallSkeleton key={element} />
      ))}
    </div>
  );
};
export default SmallPopularMangaSkeleton;
