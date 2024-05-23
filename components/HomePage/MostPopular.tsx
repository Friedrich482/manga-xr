import Link from "next/link";
import { BsFire } from "react-icons/bs";
import PopularMangaList from "./popularMangaList";
const MostPopular = () => {
  return (
    <>
      {/* large screens (more than 860px)*/}
      <section className="my-14 mr-10 hidden w-1/4 min-w-60 max-w-80 flex-col items-center justify-center gap-8 place-self-end text-neutral-700 dark:text-neutral-300 large-nav:flex">
        <h2 className="mb-2 w-full text-3xl text-neutral-700 hover:text-default-black dark:text-neutral-300 dark:hover:text-default-white">
          <Link href={"/"} className="flex items-center justify-center gap-2">
            <BsFire />
            <span>Popular</span>
          </Link>
        </h2>
        <PopularMangaList />
      </section>

      {/*   smaller screens (less than 860px)*/}
      <section className="overflow-x mt-12 flex w-full flex-col large-nav:hidden">
        <h2 className="mb-6 w-full text-3xl text-neutral-700 hover:text-default-black dark:text-neutral-300 dark:hover:text-default-white">
          <Link href={"/"} className="flex items-center justify-center gap-2">
            <BsFire />
            <span>Popular now</span>
          </Link>
        </h2>
        <PopularMangaList />
      </section>
    </>
  );
};
export default MostPopular;
