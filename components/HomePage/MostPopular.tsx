import Link from "next/link";
import { BsFire } from "react-icons/bs";
import PopularMangaList from "./popularMangaList";
const MostPopular = () => {
  return (
    <section className="my-14 mr-10 flex w-1/4 min-w-60 max-w-80 flex-col items-center justify-center gap-8 place-self-end text-neutral-700 dark:text-neutral-300">
      <h2 className="w-full text-xl">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <BsFire />
          <span>Popular</span>
        </Link>
      </h2>
      <PopularMangaList />
    </section>
  );
};
export default MostPopular;
