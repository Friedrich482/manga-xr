import Link from "next/link";
import { MAIN_MANGA_ELEMENT_TITLE_LENGTH } from "@/lib/constants";
import MainImage from "../MainImage";
import { SearchResultMangaType } from "@/zod-schema/schema";
import truncateTitle from "@/utils/truncateTitle";

const ResultMainElement = ({
  manga: { image, mangaSlug, yearOfRelease, title },
  link,
}: {
  manga: SearchResultMangaType;
  link?: string;
}) => (
  <Link href={link || `/mangas/${mangaSlug}`}>
    <div className="group flex aspect-[13/18] min-w-32 cursor-pointer flex-col items-center justify-center place-self-start transition ease-in-out hover:scale-110">
      <div className="w-full">
        <MainImage title={title} image={image} />
      </div>
      <div className="h-20 w-full">
        <div className="w-full text-wrap text-start text-base font-bold group-hover:text-primary">
          {truncateTitle(title, MAIN_MANGA_ELEMENT_TITLE_LENGTH)}
        </div>
        <div className="text-start font-extralight">{`${yearOfRelease}`}</div>
      </div>
    </div>
  </Link>
);

export default ResultMainElement;
