import AddMangaToHistoryClientComponent from "./AddMangaToHistory";
import ClientUrlUpdater from "./ClientUrlUpdater";
import { FETCH_CHAPTER_PAGES_TAG } from "@/lib/cache-keys/unstable_cache";
import Link from "next/link";
import NavElements from "./NavElements";
import OptionsButton from "./OptionsButton";
import PrincipalSection from "../lib/PrincipalSection";
import ReloadDataButton from "../lib/ReloadDataButton";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";

const NavSection = async ({ chapterSlug }: { chapterSlug: string }) => {
  const imagesData = await fetchChapterPages(chapterSlug);

  if (!imagesData) {
    return (
      <ReloadDataButton tag={`${FETCH_CHAPTER_PAGES_TAG}:${chapterSlug}`} />
    );
  }

  const { images, mangaSlug, currentChapterTitle } = imagesData;

  const mangaData = await fetchUnitMangaInfo(mangaSlug);

  if (!mangaData || mangaData === 404) {
    return (
      <ReloadDataButton tag={`${FETCH_CHAPTER_PAGES_TAG}:${chapterSlug}`} />
    );
  }

  const { title, chapters, image } = mangaData;
  return (
    <PrincipalSection className="w-5/6 self-center text-xl">
      <h2 className="w-full text-center text-xl hover:text-primary hover:underline options-menu-breakpoint-2:text-2xl">
        <Link href={`/mangas/${mangaSlug}`}>{title}</Link>
      </h2>
      <NavElements
        mangaSlug={mangaSlug}
        chapters={chapters}
        images={images}
        currentChapterTitle={currentChapterTitle}
      />
      <ClientUrlUpdater
        title={title}
        currentChapterTitle={currentChapterTitle}
      />
      <AddMangaToHistoryClientComponent
        currentChapterTitle={currentChapterTitle}
        title={title}
        chapterSlug={chapterSlug}
        image={image}
        mangaSlug={mangaSlug}
      />
      <OptionsButton
        image={image}
        name={title}
        mangaSlug={mangaSlug}
        currentChapterTitle={currentChapterTitle}
      />
    </PrincipalSection>
  );
};
export default NavSection;
