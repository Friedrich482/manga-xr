import ClientUrlUpdater from "./ClientUrlUpdater";
import Link from "next/link";
import NavElements from "./NavElements";
import OptionsButton from "./OptionsButton";
import PrincipalSection from "../lib/PrincipalSection";
import addMangaToHistoryAction from "@/actions/historyActions/addMangaToHistoryAction";
import convertChapterToSlug from "@/utils/convertChapterToSlug";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import { notFound } from "next/navigation";
import removeSeasonFromTitle from "@/utils/removeSeasonFromTitle";

const NavSection = async ({
  mangaSlug,
  chapterTitleFromUrl,
}: {
  mangaSlug: string;
  chapterTitleFromUrl: string;
}) => {
  const [mangaDataPromise, imagesPromise] = await Promise.allSettled([
    fetchUnitMangaInfo(mangaSlug),
    fetchChapterPages(convertChapterToSlug(chapterTitleFromUrl), mangaSlug),
  ]);
  if (
    mangaDataPromise.status === "fulfilled" &&
    mangaDataPromise.value &&
    imagesPromise.status === "fulfilled" &&
    imagesPromise.value &&
    imagesPromise.value.length > 0
  ) {
    if (typeof mangaDataPromise.value === "number") {
      // 404 manga not found
      notFound();
    }
    const { title, image, chapters } = mangaDataPromise.value;
    await addMangaToHistoryAction({
      name: title,
      slug: mangaSlug,
      lastChapter: chapterTitleFromUrl,
      image,
    });
    return (
      <PrincipalSection className="w-5/6 self-center text-xl">
        <h2 className="w-full text-center text-xl hover:text-primary hover:underline options-menu-breakpoint-2:text-2xl">
          <Link href={`/manga/${removeSeasonFromTitle(mangaSlug)}`}>
            {title}
          </Link>
        </h2>
        <NavElements
          mangaSlug={mangaSlug}
          chapterTitleFromUrl={chapterTitleFromUrl}
          chapters={chapters}
          images={imagesPromise.value}
        />
        <OptionsButton image={image} name={title} />
        <ClientUrlUpdater
          chapterTitleFromUrl={chapterTitleFromUrl}
          title={title}
          mangaSlug={mangaSlug}
        />
      </PrincipalSection>
    );
  } else {
    notFound();
  }
};
export default NavSection;
