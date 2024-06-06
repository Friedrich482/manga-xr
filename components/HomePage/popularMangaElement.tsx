import Image from "next/image";
import { IMangaResult } from "@consumet/extensions";
import { fetchLastChapterAlt } from "@/custom-manga-function/fetchLastChapterAlt";
import prisma from "@/lib/db";
import getMangaInfo from "@/custom-manga-function/getMangaInfo";
const PopularMangaElement = async ({ id }: { id: number }) => {
  const data = await prisma.mostPopular.findMany();

  const popularManga = (data[0].data as IMangaResult[])[id];

  const lastChapterAlt: number | null | string =
    await fetchLastChapterAlt(popularManga);

  const { englishTitle, lastCharacter, lastChapter, genres } =
    getMangaInfo(popularManga);

  return (
    <>
      {/* large screens (more than 860px)*/}

      <div className="group hidden w-full flex-shrink-0 cursor-pointer items-center justify-center gap-2 large-nav:flex">
        <div className="h-24 w-3/12">
          <Image
            className="h-24 w-16 rounded-lg"
            priority={true}
            alt={(popularManga.title as string) || (englishTitle as string)}
            src={popularManga.image as string}
            width={64}
            height={96}
          />
        </div>
        <div className="flex h-24 w-9/12 flex-col items-start justify-center">
          {popularManga.title ? (
            <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold transition duration-300 ease-in-out group-hover:text-orange-400">
              {`${(popularManga.title as string).slice(0, lastCharacter + 1)} `}
            </div>
          ) : englishTitle ? (
            <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold transition duration-300 ease-in-out group-hover:text-orange-400">
              {`${(englishTitle as string).slice(0, lastCharacter + 1)}`}
            </div>
          ) : (
            <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold group-hover:text-orange-400">
              {""}
            </div>
          )}
          <div className="h-1/4 text-sm font-light">
            Chapter {`${lastChapter || lastChapterAlt}`}
          </div>
          <div className="h-1/4 text-sm font-light">
            {genres?.map((genre) =>
              genres.indexOf(genre) < 2 ? (
                <span key={genre}>{`${genre}, `}</span>
              ) : (
                <span key={genre}>{`${genre} `}</span>
              ),
            )}
          </div>
        </div>
      </div>

      {/*smaller screens (less than 860px)*/}

      <div className="flex h-[90%] w-44 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-y-1 transition duration-300 ease-in-out hover:scale-110 large-nav:hidden">
        <div className="flex h-3/4 w-full items-center justify-center">
          <Image
            className="h-full w-full rounded-lg"
            priority={true}
            alt={(popularManga.title as string) || (englishTitle as string)}
            src={popularManga.image as string}
            width={176}
            height={300}
          />
        </div>

        <div className="flex h-1/4 w-full flex-col items-start justify-center">
          {popularManga.title ? (
            <div className="flex h-2/3 w-full items-center justify-start text-[15px] font-bold group-hover:text-orange-400 hover:transition hover:duration-300 hover:ease-in-out">
              {`${(popularManga.title as string).slice(0, lastCharacter + 1)} `}
            </div>
          ) : englishTitle ? (
            <div className="flex h-2/3 w-full items-center justify-start text-[15px] font-bold group-hover:text-orange-400 hover:transition hover:duration-300 hover:ease-in-out">
              {`${(englishTitle as string).slice(0, lastCharacter + 1)}`}
            </div>
          ) : (
            <div className="flex h-3/4 w-full items-center justify-start text-[15px] font-bold group-hover:text-orange-400">
              {""}
            </div>
          )}
          <div className="h-1/3 text-sm font-light">
            Chapter {`${lastChapter || lastChapterAlt}`}
          </div>
        </div>
      </div>
    </>
  );
};
export default PopularMangaElement;
