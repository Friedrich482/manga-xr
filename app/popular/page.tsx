import { BsFire } from "react-icons/bs";
import { metadata } from "../layout";
import { Suspense } from "react";
import PopularList from "@/components/PopularPage/PopularList";

const PopularPage = () => {
  metadata.title = "Manga-R";
  return (
    <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      <section className="flex w-3/4 flex-col items-center justify-start self-center">
        <h2 className=" group flex w-full items-center justify-center gap-2 text-center text-5xl text-neutral-700 hover:text-default-black dark:border-neutral-500 dark:text-neutral-300 dark:hover:text-default-white">
          <BsFire className="text-orange-400 group-hover:cursor-pointer" />
          <span className="group-hover:cursor-pointer">Popular</span>
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <PopularList />
        </Suspense>
      </section>
    </main>
  );
};
export default PopularPage;
