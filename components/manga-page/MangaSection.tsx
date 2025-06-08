import AboutTheManga from "./AboutTheManga";
import Chapters from "./Chapters";
import ClientTitleUpdater from "./ClientTitleUpdater";
import { FETCH_UNIT_MANGA_INFO_TAG } from "@/lib/cache-keys/unstable_cache";
import ImageAndSynopsis from "./ImageAndSynopsis";
import PrincipalSection from "../lib/PrincipalSection";
import ReloadDataButton from "../lib/ReloadDataButton";
import StartReadingButton from "./StartReadingButton";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import getGenres from "@/utils/getGenres";
import getMangaBookmarks from "@/lib/getMangaBookmarks";
import getMangaChaptersFromHistory from "@/lib/getMangaChaptersFromHistory";
import { metadata } from "@/app/layout";
import { notFound } from "next/navigation";

const MangaSection = async ({ mangaSlug }: { mangaSlug: string }) => {
  const [mangaDataPromise, chaptersFromHistoryPromise, mangaBookmarksPromise] =
    await Promise.allSettled([
      fetchUnitMangaInfo(mangaSlug),
      getMangaChaptersFromHistory(mangaSlug),
      getMangaBookmarks(mangaSlug),
    ]);

  if (
    mangaDataPromise.status === "fulfilled" &&
    mangaDataPromise.value &&
    chaptersFromHistoryPromise.status === "fulfilled" &&
    mangaBookmarksPromise.status === "fulfilled"
  ) {
    if (mangaDataPromise.value === 404) {
      // 404 manga not found
      notFound();
    }
    const {
      author,
      chapters,
      genres,
      image,
      latestUpdateDate,
      releaseDate,
      synopsis,
      title,
    } = mangaDataPromise.value;

    const infos = [
      { title: "Author", content: author },
      { title: "Year of release", content: releaseDate },
      { title: "Last updated", content: latestUpdateDate },
    ] as const;

    // get the genres
    const arrayOfGenres = getGenres(genres);
    const firstChapterSlug = chapters.at(-1)!.chapterSlug;

    const allChaptersFromHistory =
      chaptersFromHistoryPromise.value?.chaptersRead;
    const lastChapterReadSlug =
      chaptersFromHistoryPromise?.value?.lastChapterReadSlug;

    metadata.title = `${title} | MangaXR`;

    return (
      <PrincipalSection className="w-full justify-start self-start large-nav:w-3/4">
        <ClientTitleUpdater title={title} />
        <h2 className="w-11/12 place-self-start text-start text-3xl text-neutral-700 hover:text-default-black dark:border-neutral-500 dark:text-neutral-300 dark:hover:text-default-white">
          {title}
        </h2>
        <ImageAndSynopsis image={image} synopsis={synopsis} title={title} />
        <AboutTheManga arrayOfGenres={arrayOfGenres} infos={infos} />
        <div className="w-full">
          <StartReadingButton
            firstChapterSlug={firstChapterSlug}
            lastChapterReadSlug={lastChapterReadSlug}
          />
        </div>
        <Chapters
          chapters={chapters}
          chaptersRead={allChaptersFromHistory}
          lastChapterReadSlug={lastChapterReadSlug}
          bookmarkedChapters={mangaBookmarksPromise.value}
        />
      </PrincipalSection>
    );
  } else {
    return (
      <div className="w-full pt-5">
        <ReloadDataButton tag={`${FETCH_UNIT_MANGA_INFO_TAG}:${mangaSlug}`} />
      </div>
    );
  }
};
export default MangaSection;
