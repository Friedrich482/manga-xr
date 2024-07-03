import { metadata } from "@/app/layout";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import { notFound } from "next/navigation";
import ChapterDropDown from "./ChapterDropDown";
import Link from "next/link";
import OptionsButton from "./OptionsButton";
import NavigateChaptersButtons from "./NavigateChaptersButtons";

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
        <div className="flex w-full flex-wrap justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <h2 className="text-2xl hover:text-default-black dark:hover:text-default-white">
              <Link href={`/manga/${altTitle}`}>{title}</Link>
            </h2>
            <ChapterDropDown
              chapterTitleFromUrl={chapterTitleFromUrl}
              chapters={chapters}
            />
          </div>
          <OptionsButton />
          <NavigateChaptersButtons
            chapterTitleFromUrl={chapterTitleFromUrl}
            altTitle={altTitle}
            chapters={chapters}
          />
        </div>
      </section>
    );
  } else {
    notFound();
  }
};
export default NavSection;
