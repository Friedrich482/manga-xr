import { Suspense } from "react";
import PopularMangaElement from "./PopularMangaElement";
import PopularMangaElementSmallSkeleton from "../Skeleton/PopularMangaElementSmallSkeleton";
import PopularMangaElementLargeSkeleton from "../Skeleton/PopularMangaElementLargeSkeleton";
const popularMangaNumber = 10;

const PopularMangaList = async () => {
  const list = Array(popularMangaNumber)
    .fill(0)
    .map((_, i) => i);

  return (
    <>
      {/* large screens (more than 860px)*/}

      <div className="hidden flex-col items-center justify-center gap-8 large-nav:flex">
        {list.map((element) => {
          return (
            <Suspense
              key={element}
              fallback={<PopularMangaElementLargeSkeleton />}
            >
              <PopularMangaElement key={element} id={element} />
            </Suspense>
          );
        })}
      </div>

      {/*   smaller screens (less than 860px)*/}

      <div className="mx-2 flex h-[27rem] items-center justify-start gap-6 overflow-x-scroll rounded-lg rounded-bl-lg bg-neutral-100 px-4 scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-neutral-600 dark:bg-neutral-900 dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-200 large-nav:hidden">
        {list.map((element) => {
          return (
            <Suspense
              key={element}
              fallback={<PopularMangaElementSmallSkeleton />}
            >
              <PopularMangaElement key={element} id={element} />
            </Suspense>
          );
        })}
      </div>
    </>
  );
};
export { PopularMangaList as default, popularMangaNumber };
