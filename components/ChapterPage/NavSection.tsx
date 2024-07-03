import { metadata } from "@/app/layout";
import { fetchUnitMangaInfo } from "@/utils/manga/fetchUnitMangaInfo";
import { notFound } from "next/navigation";
import ChapterDropDown from "./ChapterDropDown";
import Link from "next/link";
import OptionsButton from "./OptionsButton";

const NavSection = async ({
  altTitle,
  chapter,
}: {
  altTitle: string;
  chapter: string;
}) => {
  const mangaData = await fetchUnitMangaInfo(altTitle);
  if (mangaData) {
    const { title, chapters } = mangaData;
    metadata.title = `${title}: ${chapter}`;

    return (
      <section className="mb-8 flex w-5/6 flex-col justify-start gap-4 self-center text-xl text-neutral-700 dark:text-neutral-300">
        <div className="flex flex-wrap gap-4">
          <h2 className="text-2xl hover:text-default-black dark:hover:text-default-white">
            <Link href={`/manga/${altTitle}`}>{title}</Link>
          </h2>
          <ChapterDropDown chapter={chapter} chapters={chapters} />
        </div>
        <OptionsButton />
      </section>
    );
  } else {
    notFound();
  }
};
export default NavSection;
