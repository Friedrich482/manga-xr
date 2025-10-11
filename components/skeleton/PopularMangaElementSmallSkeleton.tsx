const PopularMangaElementSmallSkeleton = () => {
  return (
    <div className="flex h-[90%] w-44 shrink-0 flex-col items-center justify-center gap-y-1 large-nav:hidden">
      <div className="flex h-3/4 w-full animate-pulse items-center justify-center rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>

      <div className="flex h-1/4 w-full flex-col items-start justify-center gap-3">
        <div className="flex h-2/4 w-full animate-pulse items-center justify-start rounded-lg bg-neutral-300 text-[15px] font-bold dark:bg-neutral-600"></div>
        <div className="h-1/4 w-3/4 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
      </div>
    </div>
  );
};
export default PopularMangaElementSmallSkeleton;
