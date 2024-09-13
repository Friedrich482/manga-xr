import Link from "next/link";
import { MAIN_MANGA_ELEMENT_TITLE_LENGTH } from "@/lib/constants";
import { MainElementMangaType } from "@/zod-schema/schema";
import MainImage from "./MainImage";

const MangaElement = ({
  manga,
  link,
}: { manga: MainElementMangaType } & { link?: string }) => {
  const { image, lastChapter, title, altTitle } = manga;
  return (
    <Link href={link || `/manga/${altTitle}`}>
      <div className="group flex w-52 min-w-32 cursor-pointer flex-col items-center justify-center place-self-start transition ease-in-out hover:scale-110">
        <div className="w-full">
          <MainImage title={title} image={image} />
        </div>
        <div className="h-20 w-full">
          <div className="w-full text-wrap text-start text-base font-bold group-hover:text-primary">
            {title.slice(0, MAIN_MANGA_ELEMENT_TITLE_LENGTH) +
              `${title.length >= MAIN_MANGA_ELEMENT_TITLE_LENGTH ? "..." : ""}`}
          </div>
          <div className="text-start font-extralight">{`${lastChapter}`}</div>
        </div>
      </div>
    </Link>
  );
};
export default MangaElement;
