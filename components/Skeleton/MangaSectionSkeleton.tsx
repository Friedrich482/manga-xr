const list = Array(20)
  .fill(0)
  .map((_, i) => i);
const MangaSectionSkeleton = () => {
  return (
    <section className="mt-20 flex w-full flex-col items-center justify-start self-start large-nav:w-3/4">
      {/*Manga title */}
      <h2 className="h-8 w-[32rem] animate-pulse place-self-start rounded-lg bg-neutral-300 hover:text-default-black dark:border-neutral-500 dark:bg-neutral-600 dark:hover:text-default-white"></h2>

      {/* Image && synopsys */}
      <div className="mt-4 flex w-11/12 justify-start gap-x-4 place-self-start">
        {/* Image */}
        <div className="h-72 min-h-32 w-52 min-w-32 animate-pulse cursor-pointer rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>

        {/* Synopsys */}
        <p className="h-80 w-[32rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></p>
      </div>

      {/* Author, year of release, updated at, genres */}
      <div className="mb-5 mt-10 flex w-11/12 flex-col gap-10 place-self-start">
        {/* Author : text and skeleton */}
        <div className=" flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-orange-400">Author</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>

        {/* Year of release : text and skeleton */}
        <div className=" flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-orange-400">Year of Release</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>

        {/* updated at : text and skeleton */}
        <div className=" flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-orange-400">Updated at</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>
      </div>
      {/* Genres */}
      <div className="flex flex-col items-start justify-center gap-5 place-self-start">
        <p className="text-xl text-orange-400">
          Genres<span className="text-white">:</span>
        </p>

        {/* Skeleton of genres (5) */}
        <div className="flex flex-wrap items-center justify-start gap-4 place-self-start">
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
          <div className="h-8 w-[10rem] animate-pulse rounded-lg bg-neutral-300 px-3 py-1 dark:bg-neutral-600"></div>
        </div>
      </div>

      {/* Chapters section*/}
      <section className="mt-6 flex w-11/12 flex-col items-start justify-start place-self-start text-xl very-small-nav:text-2xl">
        <h2 className="mb-6 w-full text-center text-3xl">Chapters:</h2>

        {/* Form */}
        <div className="mb-8 flex w-11/12 flex-wrap items-center justify-start gap-2 place-self-start">
          <div className="h-8 w-80 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
          <div className="h-8 w-32 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>

        {/* List of chapters */}
        <ul className="flex w-full flex-col items-center justify-start gap-y-5">
          {list.map((element) => (
            <li
              key={element}
              className="flex w-full items-center justify-between rounded-lg border border-neutral-800/50 py-2 hover:border-neutral-800 hover:bg-neutral-300/25 dark:border-neutral-500/50 dark:hover:border-neutral-500 dark:hover:bg-neutral-700/25 max-chapters-breakpoint:flex-col"
            >
              <span className="h-8 w-32 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600 chapters-breakpoint:ml-6"></span>
              <span className="h-8 w-40 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600 chapters-breakpoint:mr-6"></span>
            </li>
          ))}
        </ul>
      </section>
      {/* Show All chapters button */}
      <div className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 place-self-center rounded-lg border border-transparent px-4 hover:border-neutral-500 hover:text-orange-400">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
      </div>
    </section>
  );
};
export default MangaSectionSkeleton;
