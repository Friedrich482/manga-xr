import Main from "../lib/Main";

const list = Array(20)
  .fill(0)
  .map((_, i) => i);
const MangaSectionSkeleton = () => {
  return (
    <Main className="flex-col gap-10">
      {/*Manga title */}
      <h2 className="h-11 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></h2>

      {/* Image && synopsys */}
      <div className="flex w-11/12 flex-wrap justify-start gap-4 place-self-start">
        {/* Image */}
        <div className="float-left h-72 min-h-32 w-52 min-w-32 flex-shrink-0 animate-pulse cursor-pointer rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>

        {/* Synopsys */}
        <div className="flex w-96 animate-pulse flex-col gap-4 rounded-lg">
          <p className="h-5 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></p>
          <p className="h-5 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></p>
          <p className="h-5 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></p>
          <p className="h-5 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></p>
          <p className="h-5 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></p>
          <p className="h-5 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></p>
          <p className="h-5 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></p>
          <p className="h-5 w-[clamp(6rem,100%,32rem)] animate-pulse place-self-start rounded-lg bg-neutral-300 dark:border-neutral-500 dark:bg-neutral-600"></p>
        </div>
      </div>

      {/* Author, year of release, updated at, genres */}
      <div className="flex w-11/12 flex-col gap-10 place-self-start">
        {/* Author : text and skeleton */}
        <div className="flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-red-700">Author</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>

        {/* Year of release : text and skeleton */}
        <div className="flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-red-700">Year of Release</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>

        {/* updated at : text and skeleton */}
        <div className="flex gap-2 rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500 ">
          <span className="text-red-700">Updated at</span>:
          <div className="h-8 w-[16rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>
      </div>
      {/* Genres */}
      <div className="flex w-5/6 flex-col items-start justify-center gap-5 place-self-start">
        <p className="text-xl text-red-700">
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
      {/* Start Reading button */}
      <div className="h-10 w-36 animate-pulse place-self-start rounded-lg bg-neutral-300 dark:bg-neutral-600 options-menu-breakpoint-2:w-44 options-menu-breakpoint-2:justify-around"></div>
      {/* Chapters section*/}
      <section className="flex w-11/12 flex-col items-start justify-start gap-4 place-self-start text-xl very-small-nav:text-2xl">
        <h2 className="w-full text-center text-3xl">Chapters:</h2>

        {/* Form */}
        <div className="flex w-11/12 flex-wrap items-center justify-start gap-2 place-self-start">
          <div className="h-8 w-80 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
          <div className="h-8 w-32 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
        </div>

        {/* List of chapters */}
        <ul className="flex w-full flex-col items-center justify-start gap-y-5">
          {list.map((element) => (
            <li
              key={element}
              className="flex w-full items-center justify-between rounded-lg border border-neutral-800/50 px-3 py-2 hover:border-neutral-800 hover:bg-neutral-300/25 dark:border-neutral-500/50 dark:hover:border-neutral-500 dark:hover:bg-neutral-700/25 max-chapters-breakpoint:flex-col"
            >
              <span className="h-8 w-32 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></span>
              <span className="h-8 w-40 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></span>
            </li>
          ))}
        </ul>
      </section>
      {/* Show All chapters button */}
      <div className="flex w-11/12 cursor-pointer items-center justify-center gap-2 place-self-start rounded-lg border border-transparent px-4 py-1 hover:border-neutral-500 hover:text-red-700">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></div>
      </div>
    </Main>
  );
};
export default MangaSectionSkeleton;
