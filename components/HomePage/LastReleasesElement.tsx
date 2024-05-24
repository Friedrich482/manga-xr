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
  return (
    <div className="flex w-64 flex-col items-center justify-center">
      <div className="w-full">
        <Image
          className="h-80 w-64 rounded-lg"
          alt={(lastReleasedManga.title as string) || (englishTitle as string)}
          src={lastReleasedManga.image as string}
          width={300}
          height={400}
        ></Image>
      </div>
      <div className="h-20 w-full">
        <div className="w-full text-wrap text-center text-base">
          {(lastReleasedManga.title as string).slice(0, lastCharacter + 1) ||
            (englishTitle as string).slice(0, lastCharacter + 1)}
        </div>
        <div className="text-center">
          Chapter {`${lastChapter || lastChapterAlt}`}
        </div>
      </div>
    </div>
  );
};
export default LastReleasesElement;
