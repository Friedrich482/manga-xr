import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import { notFound } from "next/navigation";
import Link from "next/link";
import OptionsButton from "./OptionsButton";
import NavElements from "./NavElements";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import ClientUrlUpdater from "./ClientUrlUpdater";
import convertChapterToSlug from "@/utils/convertChapterToSlug";
import removeSeasonFromTitle from "@/utils/removeSeasonFromTitle";
import PrincipalSection from "../lib/PrincipalSection";
import addMangaToHistoryAction from "@/actions/historyActions/addMangaToHistoryAction";

const NavSection = async ({
  altTitle,
  chapterTitleFromUrl,
}: {
  altTitle: string;
  chapterTitleFromUrl: string;
}) => {
  const [mangaDataPromise, imagesPromise] = await Promise.allSettled([
    fetchUnitMangaInfo(altTitle),
    fetchChapterPages(convertChapterToSlug(chapterTitleFromUrl), altTitle),
  ]);
  if (
    mangaDataPromise.status === "fulfilled" &&
    mangaDataPromise.value &&
    imagesPromise.status === "fulfilled" &&
    imagesPromise.value &&
    imagesPromise.value.length > 0
  ) {
    const { title, image, chapters } = mangaDataPromise.value;
    await addMangaToHistoryAction({
      name: title,
      slug: altTitle,
      lastChapter: chapterTitleFromUrl,
      image: image,
    });
    return (
      <PrincipalSection className="w-5/6 self-center text-xl">
        <h2 className="w-full text-center text-xl hover:text-primary hover:underline options-menu-breakpoint-2:text-2xl">
          <Link href={`/manga/${removeSeasonFromTitle(altTitle)}`}>
            {title}
          </Link>
        </h2>
        <NavElements
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
          chapters={chapters}
          images={imagesPromise.value}
        />
        <OptionsButton />
        <ClientUrlUpdater
          chapterTitleFromUrl={chapterTitleFromUrl}
          title={title}
          altTitle={altTitle}
        />
      </PrincipalSection>
    );
  } else {
    notFound();
  }
};
export default NavSection;
