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
      { title: "Updated at", content: latestUpdateDate },
    ];

    // get the genres
    const arrayOfGenres = getGenres(genres);
    const firstChapterSlug = chapters.at(-1)!.chapterSlug;

    // chapters objects from history
    const allChaptersObjects = chaptersFromHistoryPromise.value?.flatMap(
      (manga) =>
        manga.chaptersRead.map((chapter) => ({
          mangaSlug: manga.slug,
          chapter: `chapter-${chapter.split(" ")[1]}`,
        })),
    );
    // last chapter object from history
    const lastChapterRead =
      chaptersFromHistoryPromise?.value?.at(0)!?.lastChapterRead;
    const lastChapterObject = {
      mangaSlug: chaptersFromHistoryPromise?.value?.at(0)!?.slug,
      lastChapterRead: lastChapterRead
        ? `chapter-${lastChapterRead.split(" ")[1]}`
        : "",
    };
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
            mangaSlug={mangaSlug}
            firstChapterSlug={firstChapterSlug}
            lastChapterReadObject={lastChapterObject}
          />
        </div>
        <Chapters
          chapters={chapters}
          chaptersRead={allChaptersObjects}
          lastChapterReadObject={lastChapterObject}
          bookmarkedChapters={mangaBookmarksPromise.value}
        />
      </PrincipalSection>
    );
  } else {
    <ReloadDataButton tag={`${FETCH_UNIT_MANGA_INFO_TAG}:${mangaSlug}`} />;
  }
};
export default MangaSection;
