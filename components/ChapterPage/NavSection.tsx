import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import { notFound } from "next/navigation";
import Link from "next/link";
import OptionsButton from "./OptionsButton";
import NavElements from "./NavElements";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import ClientUrlUpdater from "./ClientUrlUpdater";
import convertChapterToSlug from "@/utils/convertChapterToSlug";
import removeSeasonFromTitle from "@/utils/removeSeasonFromTitle";

const NavSection = async ({
  altTitle,
  chapterTitleFromUrl,
}: {
  altTitle: string;
  chapterTitleFromUrl: string;
}) => {
  const [mangaData, images] = await Promise.all([
    fetchUnitMangaInfo(altTitle),
    fetchChapterPages(convertChapterToSlug(chapterTitleFromUrl), altTitle),
  ]);
  if (mangaData && images && images.length > 0) {
    const { title, chapters } = mangaData;
    return (
      <section className="mb-8 flex w-5/6 flex-wrap gap-4 self-center text-xl text-neutral-700 dark:text-neutral-300">
        <h2 className="mb-4 w-full text-center text-xl hover:text-default-black dark:hover:text-default-white options-menu-breakpoint-2:text-2xl">
          <Link href={`/manga/${removeSeasonFromTitle(altTitle)}`}>
            {title}
          </Link>
        </h2>
        <NavElements
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
          chapters={chapters}
          images={images}
        />
        <OptionsButton />
        <ClientUrlUpdater
          chapterTitleFromUrl={chapterTitleFromUrl}
          title={title}
        />
      </section>
    );
  } else {
    notFound();
  }
};
export default NavSection;
