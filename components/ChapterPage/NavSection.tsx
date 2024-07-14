import { metadata } from "@/app/layout";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import { notFound } from "next/navigation";
import Link from "next/link";
import OptionsButton from "./OptionsButton";
import NavElements from "./NavElements";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";

const NavSection = async ({
  altTitle,
  chapterTitleFromUrl,
}: {
  altTitle: string;
  chapterTitleFromUrl: string;
}) => {
  const [mangaData, images] = await Promise.all([
    fetchUnitMangaInfo(altTitle),
    fetchChapterPages(chapterTitleFromUrl.replace(" ", "-"), altTitle),
  ]);
  if (mangaData && images) {
    const { title, chapters } = mangaData;
    metadata.title = `${title}: ${chapterTitleFromUrl}`;

    return (
      <section className="mb-8 flex w-5/6 flex-wrap gap-4 self-center text-xl text-neutral-700 dark:text-neutral-300">
        <h2 className="mb-4 w-full text-center text-2xl hover:text-default-black dark:hover:text-default-white">
          <Link href={`/manga/${altTitle}`}>{title}</Link>
        </h2>
        <NavElements
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
          chapters={chapters}
          images={images}
        />
        <OptionsButton />
      </section>
    );
  } else {
    notFound();
  }
};
export default NavSection;
