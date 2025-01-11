import Image from "next/image";
import Link from "next/link";
import { PopularMangaType } from "@/zod-schema/schema";
import { TITLE_LENGTH_SMALL_POPULAR_MANGA } from "@/lib/constants";

const SmallPopularMangaElement = async ({
  manga,
}: {
  manga: PopularMangaType;
}) => {
  const { image, title, lastChapter, chapterSlug } = manga;
  return (
    <Link
      href={`/chapters/${chapterSlug}`}
      className="group flex h-[90%] w-44 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-y-1 transition duration-300 ease-in-out hover:scale-110 large-nav:hidden"
    >
      <div className="flex h-3/4 w-full items-center justify-center">
        <Image
          className="h-[280.95px] w-44 rounded-lg"
          priority={false}
          alt={title}
          src={image}
          width={176}
          height={300}
        />
      </div>

      <div className="flex h-1/4 w-full flex-col items-start justify-center">
        <div className="h-3/5 w-full text-start text-[15px] font-bold hover:transition hover:duration-300 hover:ease-in-out group-hover:text-primary">
          {title.slice(0, TITLE_LENGTH_SMALL_POPULAR_MANGA) +
            `${title.length >= TITLE_LENGTH_SMALL_POPULAR_MANGA ? "..." : ""}`}
        </div>
        <div className="h-2/5 text-sm font-light">{lastChapter}</div>
      </div>
    </Link>
  );
};
export default SmallPopularMangaElement;
