import { MainElementMangaType } from "@/zod-schema/schema";
import Image from "next/image";
import Link from "next/link";

const MangaElement = async ({ manga }: { manga: MainElementMangaType }) => {
  const { image, lastChapter, title, altTitle } = manga;
  return (
    <Link href={`/manga/${altTitle}`}>
      <div className="group flex w-52 min-w-32 cursor-pointer flex-col items-center justify-center place-self-start transition ease-in-out hover:scale-110">
        <div className="w-full">
          <Image
            className="h-72 min-h-32 w-52 min-w-32 rounded-lg"
            alt={title}
            src={image}
            width={208}
            height={288}
            priority={true}
          />
        </div>
        <div className="h-20 w-full">
          <div className="w-full text-wrap text-start text-base font-bold group-hover:text-orange-400">
            {title.slice(0, 45) + `${title.length >= 45 ? "..." : ""}`}
          </div>
          <div className="text-start font-extralight">{`${lastChapter}`}</div>
        </div>
      </div>
    </Link>
  );
};
export default MangaElement;
