import Image from "next/image";
import { IMangaResult } from "@consumet/extensions";
import { fetchLastChapterAlt } from "@/custom-manga-function/fetchLastChapterAlt";
import getMangaInfo, {
  maxTitleLength,
} from "@/custom-manga-function/getMangaInfo";
import getAltsChapAndCover from "@/custom-manga-function/getAltsChapAndCover";
const ResultElement = async ({
  mangaResult,
}: {
  mangaResult: IMangaResult;
}) => {
  const lastChapterAlt: number | null | string =
    await fetchLastChapterAlt(mangaResult);
  const { lastChapterAlt2, cover } = await getAltsChapAndCover(mangaResult);
  const { englishTitle, lastCharacter, lastChapter } =
    getMangaInfo(mangaResult);
  return (
    <div className="group flex w-52 min-w-32 cursor-pointer flex-col items-center justify-center place-self-start transition ease-in-out hover:scale-110 hover:duration-300 dark:bg-default-black">
      <div className="w-full">
        <Image
          className="h-72 min-h-32 w-52 min-w-32 rounded-lg"
          alt={(mangaResult.title as string) || (englishTitle as string)}
          src={
            (mangaResult.image as string) ||
            `https://uploads.mangadex.org/covers/${mangaResult.id}/${cover}`
          }
          width={208}
          height={288}
          loading="eager"
          priority={true}
        ></Image>
      </div>
      <div className="h-20 w-full">
        <div className="w-full text-wrap text-start text-base font-bold group-hover:text-orange-400">
          {(mangaResult.title as string)
            .slice(0, lastCharacter + 1)
            .slice(0, maxTitleLength) +
            `${(mangaResult.title as string).length > maxTitleLength ? "..." : ""}` ||
            (englishTitle as string).slice(0, lastCharacter + 1)}
        </div>
        <div className="text-start font-extralight">
          Chapter {`${lastChapter || lastChapterAlt || lastChapterAlt2}`}
        </div>
      </div>
    </div>
  );
};
export default ResultElement;
