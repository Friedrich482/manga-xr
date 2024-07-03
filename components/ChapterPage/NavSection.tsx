import { metadata } from "@/app/layout";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import { notFound } from "next/navigation";
import ChaptersDropDown from "./ChaptersDropDown";
import Link from "next/link";
import OptionsButton from "./OptionsButton";
import NavigateChaptersButtons from "./NavigateChaptersButtons";
import ChapterPagesDropDownWrapper from "./ChapterPagesDropDownWrapper";

const NavSection = async ({
  altTitle,
  chapterTitleFromUrl,
}: {
  altTitle: string;
  chapterTitleFromUrl: string;
}) => {
  const mangaData = await fetchUnitMangaInfo(altTitle);
  if (mangaData) {
    const { title, chapters } = mangaData;
    metadata.title = `${title}: ${chapterTitleFromUrl}`;

    return (
      <section className="mb-8 flex w-5/6 flex-wrap gap-4 self-center text-xl text-neutral-700 dark:text-neutral-300">
        <h2 className="mb-4 w-full text-center text-2xl hover:text-default-black dark:hover:text-default-white">
          <Link href={`/manga/${altTitle}`}>{title}</Link>
        </h2>
        <div className="flex w-full flex-wrap justify-between gap-4">
          <ChaptersDropDown chapters={chapters} />
          <ChapterPagesDropDownWrapper
            altTitle={altTitle}
            chapterTitleFromUrl={chapterTitleFromUrl}
          />
          <NavigateChaptersButtons
            chapterTitleFromUrl={chapterTitleFromUrl}
            altTitle={altTitle}
            chapters={chapters}
          />
          <OptionsButton />
        </div>
      </section>
    );
  } else {
    notFound();
  }
};
export default NavSection;
