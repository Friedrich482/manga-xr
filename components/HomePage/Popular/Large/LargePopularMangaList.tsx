import { Suspense } from "react";
import LargePopularMangaElement from "./LargePopularMangaElement";
import PopularMangaElementLargeSkeleton from "@/components/Skeleton/PopularMangaElementSmallSkeleton";

const LargePopularMangaList = () => {
  const list = Array(10)
    .fill(0)
    .map((_, i) => i);

  return (
    <>
      <div className="hidden flex-col items-center justify-center gap-8 large-nav:flex">
        {list.map((element) => {
          return (
            <Suspense
              key={element}
              fallback={<PopularMangaElementLargeSkeleton />}
            >
              <LargePopularMangaElement key={element} id={element} />
            </Suspense>
          );
        })}
      </div>
    </>
  );
};
export { LargePopularMangaList as default };
