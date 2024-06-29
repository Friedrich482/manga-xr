const MangaSectionSkeleton = () => {
  return (
    <section className="mt-20 flex w-full flex-col items-center justify-start self-start large-nav:w-3/4">
      <h2 className="h-8 w-[32rem] animate-pulse place-self-start rounded-lg bg-neutral-300 hover:text-default-black dark:border-neutral-500 dark:bg-neutral-600 dark:hover:text-default-white"></h2>
      <div className="mt-4 flex w-11/12 justify-start gap-x-4 place-self-start">
        <div className="h-72 min-h-32 w-52 min-w-32 animate-pulse cursor-pointer rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        <p className="h-80 w-[32rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></p>
      </div>
      <div className="mb-5 mt-10 flex w-11/12 flex-col gap-10 place-self-start">
        <div className=" flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-orange-400">Author</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>
        <div className=" flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-orange-400">Year of Release</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>
        <div className=" flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-orange-400">Updated at</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-5 place-self-start">
        <p className="text-xl text-orange-400">
          Genres<span className="text-white">:</span>
        </p>

        <div className="flex flex-wrap items-center justify-start gap-4 place-self-start">
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
        </div>
      </div>
    </section>
  );
};
export default MangaSectionSkeleton;
