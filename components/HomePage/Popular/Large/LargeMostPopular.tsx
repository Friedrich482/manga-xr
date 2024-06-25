import Link from "next/link";
import LargePopularMangaList from "./LargePopularMangaList";
import { BsFire } from "react-icons/bs";
import { Suspense } from "react";
import LargePopularMangaSkeleton from "@/components/Skeleton/LargePopularMangaSkeleton";
const MostPopular = () => {
  return (
    <section className="my-14 mr-5 mt-20 hidden w-1/4 min-w-60 max-w-80 flex-col items-center justify-center gap-8 place-self-end self-start text-neutral-700 dark:text-neutral-300 large-nav:flex">
      <h2 className="mb-2 w-full text-3xl text-neutral-700 hover:text-default-black dark:text-neutral-300 dark:hover:text-default-white">
        <Link
          href="/popular"
          className="flex items-center justify-center gap-2"
        >
          <BsFire className="text-orange-400" />
          <span>Popular</span>
        </Link>
      </h2>
      <Suspense fallback={<LargePopularMangaSkeleton />}>
        <LargePopularMangaList />
      </Suspense>
    </section>
  );
};
export default MostPopular;
