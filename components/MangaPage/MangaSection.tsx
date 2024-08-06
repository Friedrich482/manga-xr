import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import Chapters from "./Chapters";
import { notFound } from "next/navigation";
import StartReadingButton from "./StartReadingButton";
import getGenres from "@/utils/getGenres";
import PrincipalSection from "../lib/PrincipalSection";
import ImageAndSynopSys from "./ImageAndSynopSys";
import AboutTheManga from "./AboutTheManga";
const MangaSection = async ({ altTitle }: { altTitle: string }) => {
  const mangaData = await fetchUnitMangaInfo(altTitle);
  if (mangaData) {
    const {
      author,
      chapters,
      genres,
      image,
      latestUpdateDate,
      releaseDate,
      synopsys,
      title,
    } = mangaData;
    const infos = [
      { title: "Author", content: author },
      { title: "Year of release", content: releaseDate },
      { title: "Updated at", content: latestUpdateDate },
    ];
    // get the genres
    const arrayOfGenres = getGenres(genres);
    const firstChapterTitle = chapters.at(-1)!.chapterTitle;
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
          />
        </div>
        <Chapters chapters={chapters} altTitle={altTitle} />
      </PrincipalSection>
    );
  } else {
    notFound();
  }
};
export default MangaSection;
