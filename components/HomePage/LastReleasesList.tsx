import lastReleasesFetch from "@/actions/lastReleasesFetch";
import LastReleasesElement from "./LastReleasesElement";
import getMangaInfo from "@/custom-manga-function/getMangaInfo";
import prisma from "@/lib/db";
import { IMangaResult } from "@consumet/extensions";
const LastReleasesList = async () => {
  // ! lastReleasesFetch();
  const data = await prisma.lastReleases.findMany();

  const lastReleasedMangaS = data[0].data as IMangaResult[];
  return (
    <div className="mt-4 flex w-full min-w-32 flex-wrap items-center justify-center gap-x-8 gap-y-8">
      {lastReleasedMangaS.map((lastReleasedManga: IMangaResult) => {
        const { englishTitle, lastCharacter, lastChapter } =
          getMangaInfo(lastReleasedManga);
        return (
          <LastReleasesElement
            key={lastReleasedManga.id}
            englishTitle={englishTitle}
            lastChapter={lastChapter}
            lastCharacter={lastCharacter}
            lastReleasedManga={lastReleasedManga}
          />
        );
      })}
    </div>
  );
};
export default LastReleasesList;
