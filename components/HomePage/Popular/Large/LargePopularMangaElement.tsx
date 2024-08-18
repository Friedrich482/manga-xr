import Image from "next/image";
import { PopularMangaType } from "@/zod-schema/schema";
import Link from "next/link";
import getGenres from "@/utils/getGenres";
import { TITLE_LENGTH_LARGE_POPULAR_MANGA } from "@/lib/constants";
const LargePopularMangaElement = async ({
  manga,
}: {
  manga: PopularMangaType;
}) => {
  const { genres, image, lastChapter, title, altTitle } = manga;
  const arrayOfGenres = getGenres(genres).slice(0, 3);
  return (
    <Link
      href={`/manga/${altTitle}`}
      className="group hidden w-full flex-shrink-0 cursor-pointer items-center justify-center gap-2 large-nav:flex"
    >
      <div className="h-24 w-3/12">
        <Image
          className="h-24 w-16 rounded-lg"
          priority={false}
          alt={title}
          src={image}
          width={64}
          height={96}
        />
      </div>
      <div className="flex h-24 w-9/12 flex-col items-start justify-center">
        <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold transition duration-300 ease-in-out group-hover:text-red-700">
          {title.slice(0, TITLE_LENGTH_LARGE_POPULAR_MANGA) +
            `${title.length >= TITLE_LENGTH_LARGE_POPULAR_MANGA ? "..." : ""}`}
        </div>

        <div className="h-[40%] text-sm font-light">{`${lastChapter}`}</div>
        <div className="h-[40%] text-sm font-extralight">
          {arrayOfGenres.map((genre) => (
            <span key={genre}>
              {arrayOfGenres.indexOf(genre) === arrayOfGenres.length - 1
                ? genre
                : `${genre}, `}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
export default LargePopularMangaElement;
