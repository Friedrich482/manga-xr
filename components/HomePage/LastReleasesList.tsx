import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import LastReleasesElement from "./LastReleasesElement";
import getMangaInfo from "@/custom-manga-function/getMangaInfo";

const LastReleasesList = async () => {
  const mangaDex = new MangaDex();
  const response = (await mangaDex.fetchLatestUpdates(1, 21)).results;
  const lastReleasesPromises = response.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );
  const lastReleasedMangaS = await Promise.all(lastReleasesPromises);
  return (
    <div className="mt-4 flex w-full min-w-32 flex-wrap items-center justify-center gap-x-8 gap-y-8">
      {/* <div className="flex w-full flex-wrap items-center justify-start gap-x-5 gap-y-6"> */}
      {lastReleasedMangaS.map((lastReleasedManga) => {
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
      {/* </div> */}
    </div>
  );
};
export default LastReleasesList;
