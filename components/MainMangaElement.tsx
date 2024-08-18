import { MainElementMangaType } from "@/zod-schema/schema";
import Link from "next/link";
import MainImage from "./MainImage";

const MangaElement = async ({ manga }: { manga: MainElementMangaType }) => {
  const { image, lastChapter, title, altTitle } = manga;
  return (
    <Link href={`/manga/${altTitle}`}>
      <div className="group flex w-52 min-w-32 cursor-pointer flex-col items-center justify-center place-self-start transition ease-in-out hover:scale-110">
        <div className="w-full">
          <MainImage title={title} image={image} />
        </div>
        <div className="h-20 w-full">
          <div className="group-hover:text-primary w-full text-wrap text-start text-base font-bold">
            {title.slice(0, 45) + `${title.length >= 45 ? "..." : ""}`}
          </div>
          <div className="text-start font-extralight">{`${lastChapter}`}</div>
        </div>
      </div>
    </Link>
  );
};
export default MangaElement;
