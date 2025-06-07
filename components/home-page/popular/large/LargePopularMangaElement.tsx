import { ELEMENT_TITLE_MAX_LENGTH } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { PopularMangaType } from "@/zod-schema/schema";

const LargePopularMangaElement = ({
  manga: { image, lastChapter, title, chapterSlug, releaseDate },
}: {
  manga: PopularMangaType;
}) => (
  <Link
    href={`/chapters/${chapterSlug}`}
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
      <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold transition duration-300 ease-in-out group-hover:text-primary">
        {title.slice(0, ELEMENT_TITLE_MAX_LENGTH) +
          `${title.length >= ELEMENT_TITLE_MAX_LENGTH ? "..." : ""}`}
      </div>
      <div className="h-[40%] text-sm font-light">{lastChapter}</div>
      <div className="h-[40%] text-sm font-light">
        {releaseDate !== "just now" ? `${releaseDate} ago` : releaseDate}
      </div>
    </div>
  </Link>
);
export default LargePopularMangaElement;
