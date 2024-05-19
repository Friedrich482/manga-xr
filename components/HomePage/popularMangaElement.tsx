import Image from "next/image";
import { IMangaInfo } from "@consumet/extensions";
import { fetchLastChapterAlt } from "./fetchLastChapterAlt";

const PopularMangaElement = async ({
  popularManga,
  englishTitle,
  lastCharacter,
  lastChapter,
  genres,
}: {
  popularManga: IMangaInfo;
  englishTitle: string | null;
  lastCharacter: number;
  lastChapter: string | undefined;
  genres: string[] | undefined;
}) => {
  // sometimes the chapters is an empty array so I use the native api to get the lastChapter here.
  //   the function `fetchLastChapterAlt` does that and so when the lastChapterAlt is defined, it is cached
  // with state I can't get that benefit except when using react Query but next js cache is better

  const lastChapterAlt: number | null = await fetchLastChapterAlt(popularManga);
  return (
    <div className="group flex w-full cursor-pointer items-center justify-center gap-2">
      <div className="h-24 w-3/12">
        <Image
          className="h-24 w-16 rounded-lg"
          priority={true}
          alt={(popularManga.title as string) || (englishTitle as string)}
          src={popularManga.image as string}
          width={300}
          height={400}
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
              <span key={genre}>{`${genre}, ...`}</span>
            ),
          )}
        </div>
      </div>
    </div>
  );
};
export default PopularMangaElement;
