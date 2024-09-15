import AboutTheManga from "./AboutTheManga";
import Chapters from "./Chapters";
import ImageAndSynopSys from "./ImageAndSynopSys";
import PrincipalSection from "../lib/PrincipalSection";
import StartReadingButton from "./StartReadingButton";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import getGenres from "@/utils/getGenres";
import getMangaBookmarks from "@/lib/getMangaBookmarks";
import getMangaChaptersFromHistory from "@/lib/getMangaChaptersFromHistory";
import { notFound } from "next/navigation";

const MangaSection = async ({ altTitle }: { altTitle: string }) => {
  const [mangaDataPromise, chaptersFromHistoryPromise, mangaBookmarksPromise] =
    await Promise.allSettled([
      fetchUnitMangaInfo(altTitle),
      getMangaChaptersFromHistory(altTitle),
      getMangaBookmarks(altTitle),
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
    // chapters from history
    return (
      <PrincipalSection className="w-full justify-start self-start large-nav:w-3/4">
        <h2 className="w-11/12 place-self-start text-start text-3xl text-neutral-700 hover:text-default-black dark:border-neutral-500 dark:text-neutral-300 dark:hover:text-default-white">
          {title}
        </h2>
        <ImageAndSynopSys image={image} synopsys={synopsys} title={title} />
        <AboutTheManga arrayOfGenres={arrayOfGenres} infos={infos} />
        <div className="w-full">
          <StartReadingButton
            altTitle={altTitle}
            firstChapterTitle={firstChapterTitle}
            lastChapterRead={chaptersFromHistoryPromise.value?.lastChapterRead}
          />
        </div>
        <Chapters
          chapters={chapters}
          altTitle={altTitle}
          chaptersRead={chaptersFromHistoryPromise.value?.chaptersRead}
          lastChapterRead={chaptersFromHistoryPromise.value?.lastChapterRead}
          bookmarkedChapters={mangaBookmarksPromise.value}
        />
      </PrincipalSection>
    );
  } else {
    notFound();
  }
};
export default MangaSection;
