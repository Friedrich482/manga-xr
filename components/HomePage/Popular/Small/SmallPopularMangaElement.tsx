import Image from "next/image";
import prisma from "@/lib/db";
import { popularMangaType } from "@/zod-schema/schema";
const SmallPopularMangaElement = async ({
  manga,
}: {
  manga: popularMangaType;
}) => {
  const { image, title, lastChapter } = manga;
  return (
    <div className=" group flex h-[90%] w-44 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-y-1 transition duration-300 ease-in-out hover:scale-110 large-nav:hidden">
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
        <div className="h-3/5 w-full text-start text-[15px] font-bold group-hover:text-orange-400 hover:transition hover:duration-300 hover:ease-in-out">
          {title.slice(0, 30) + `${title.length >= 30 ? "..." : ""}`}
        </div>
        <div className="h-2/5 text-sm font-light">{`${lastChapter}`}</div>
      </div>
    </div>
  );
};
export default SmallPopularMangaElement;
