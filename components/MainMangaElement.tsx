import Link from "next/link";
import { MAIN_MANGA_ELEMENT_TITLE_LENGTH } from "@/lib/constants";
import { MainElementMangaType } from "@/zod-schema/schema";
import MainImage from "./MainImage";
import truncateTitle from "@/utils/truncateTitle";

const MangaElement = ({
  manga,
  link,
}: { manga: MainElementMangaType } & { link?: string }) => {
  const { image, lastChapter, title, chapterSlug } = manga;

  return (
    <Link href={link || `/chapters/${chapterSlug}`}>
      <div className="group flex aspect-13/18 min-w-32 cursor-pointer flex-col items-center justify-center transition ease-in-out hover:scale-110">
        <div className="w-full">
          <MainImage title={title} image={image} />
        </div>
        <div className="h-20 w-full">
          <div className="w-full text-wrap text-start text-base font-bold group-hover:text-primary">
            {truncateTitle(title, MAIN_MANGA_ELEMENT_TITLE_LENGTH)}
          </div>
          <div className="text-start font-extralight">{`${lastChapter}`}</div>
        </div>
      </div>
    </Link>
  );
};
export default MangaElement;
