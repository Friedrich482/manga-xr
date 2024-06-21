import Link from "next/link";
import { BsFire } from "react-icons/bs";
import SmallPopularMangaList from "./SmallPopularMangaList";
const SmallMostPopular = () => {
  return (
    <section className="overflow-x mt-16 flex w-full flex-col large-nav:hidden">
      <h2 className="mb-6 w-full text-3xl text-neutral-700 hover:text-default-black dark:text-neutral-300 dark:hover:text-default-white">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <BsFire className="text-orange-400" />
          <span>Popular now</span>
        </Link>
      </h2>
      <SmallPopularMangaList />
    </section>
  );
};

export default SmallMostPopular;
