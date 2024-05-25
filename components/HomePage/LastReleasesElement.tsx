import { fetchLastChapterAlt } from "@/custom-manga-function/fetchLastChapterAlt";
import { IMangaInfo } from "@consumet/extensions";
import Image from "next/image";
const LastReleasesElement = async ({
  lastReleasedManga,
  englishTitle,
  lastCharacter,
  lastChapter,
}: {
  lastReleasedManga: IMangaInfo;
  englishTitle: string | null;
  lastCharacter: number;
  lastChapter: unknown;
}) => {
  const lastChapterAlt: number | null =
    await fetchLastChapterAlt(lastReleasedManga);
  try {
    return (
      <div className="group flex w-52 min-w-32 cursor-pointer flex-col items-center justify-center place-self-start transition ease-in-out hover:scale-110 hover:duration-300 dark:bg-default-black">
        <div className="w-full">
          <Image
            className="h-72 min-h-32 w-52 min-w-32 rounded-lg"
            alt={
              (lastReleasedManga.title as string) || (englishTitle as string)
            }
            src={lastReleasedManga.image as string}
            width={300}
            height={200}
          ></Image>
        </div>
        <div className="h-20 w-full">
          <div className="w-full text-wrap text-start text-base font-bold group-hover:text-orange-400">
            {(lastReleasedManga.title as string).slice(0, lastCharacter + 1) ||
              (englishTitle as string).slice(0, lastCharacter + 1)}
          </div>
          <div className="text-start font-extralight">
            Chapter {`${lastChapter || lastChapterAlt}`}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};
export default LastReleasesElement;
