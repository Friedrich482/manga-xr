const PopularMangaElementLargeSkeleton = () => {
  return (
    <div className="hidden h-24 w-64 shrink-0 items-center justify-center gap-2 large-nav:flex">
      <div className="flex h-24 w-3/12 animate-pulse items-center justify-center rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>

      <div className="flex h-24 w-9/12 flex-col items-start justify-center gap-3">
        <div className="flex h-[41.67%] w-full animate-pulse items-start justify-start rounded-lg bg-neutral-300 text-[15px] font-bold dark:bg-neutral-600"></div>
        <div className="h-[33.33%] w-3/4 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        <div className="h-[25%] w-3/4 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
      </div>
    </div>
  );
};
export default PopularMangaElementLargeSkeleton;
