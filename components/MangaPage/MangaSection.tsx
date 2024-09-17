import AboutTheManga from "./AboutTheManga";
import Chapters from "./Chapters";
import ImageAndSynopsys from "./ImageAndSynopSys";
import PrincipalSection from "../lib/PrincipalSection";
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
    const {
      author,
      chapters,
      genres,
      image,
      latestUpdateDate,
      releaseDate,
      synopsys,
      title,
    } = mangaDataPromise.value;
    const infos = [
      { title: "Author", content: author },
      { title: "Year of release", content: releaseDate },
      { title: "Updated at", content: latestUpdateDate },
    ];

    // get the genres
    const arrayOfGenres = getGenres(genres);
    const firstChapterTitle = chapters[chapters.length - 1].chapterTitle;

    // chapters objects from history
    const allChaptersObjects = chaptersFromHistoryPromise.value?.flatMap(
      (manga) =>
        manga.chaptersRead.map((chapter) => ({
          mangaSlug: manga.slug,
          chapter: `chapter-${chapter.split(" ")[1]}`,
        })),
    );
    // last chapter object from history
    const lastChapterObject = {
      mangaSlug: chaptersFromHistoryPromise?.value?.at(0)!?.slug,
      lastChapterRead:
        chaptersFromHistoryPromise?.value?.at(0)!?.lastChapterRead,
    };
    return (
      <PrincipalSection className="w-full justify-start self-start large-nav:w-3/4">
        <h2 className="w-11/12 place-self-start text-start text-3xl text-neutral-700 hover:text-default-black dark:border-neutral-500 dark:text-neutral-300 dark:hover:text-default-white">
          {title}
        </h2>
        <ImageAndSynopsys image={image} synopsys={synopsys} title={title} />
        <AboutTheManga arrayOfGenres={arrayOfGenres} infos={infos} />
        <div className="w-full">
          <StartReadingButton
            mangaSlug={mangaSlug}
            firstChapterTitle={firstChapterTitle}
            lastChapterReadObject={lastChapterObject}
          />
        </div>
        <Chapters
          chapters={chapters}
          mangaSlug={mangaSlug}
          chaptersRead={allChaptersObjects}
          lastChapterReadObject={lastChapterObject}
          bookmarkedChapters={mangaBookmarksPromise.value}
        />
      </PrincipalSection>
    );
  } else {
    notFound();
  }
};
export default MangaSection;
