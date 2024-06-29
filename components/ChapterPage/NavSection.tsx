import { metadata } from "@/app/layout";
import { fetchUnitMangaInfo } from "@/utils/manga/fetchUnitMangaInfo";
import { notFound } from "next/navigation";
import ChapterDropDown from "./ChapterDropDown";

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
      <section className="flex">
        <div className="mb-12 flex w-full flex-wrap gap-x-3 text-xl text-neutral-700 dark:text-neutral-300 ">
          <h2 className="hover:text-default-black dark:hover:text-default-white">
            {title}
          </h2>
          <ChapterDropDown chapter={chapter} chapters={chapters} />
        </div>
      </section>
    );
  } else {
    notFound();
  }
};
export default NavSection;
