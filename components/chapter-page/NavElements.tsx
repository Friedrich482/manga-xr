import { ChapterType } from "@/zod-schema/schema";
import ChaptersDropDown from "./ChaptersDropDown";
import ChaptersPagesDropDown from "./ChapterPagesDropDown";
import NavigateChaptersButtons from "./NavigateChaptersButtons";

const NavElements = ({
  chapters,
  mangaSlug,
  chapterTitleFromUrl,
  images,
}: {
  chapters: ChapterType[];
  mangaSlug: string;
  chapterTitleFromUrl: string;
  images: string[];
}) => {
  return (
    <div className="flex w-full flex-wrap gap-1 options-menu-breakpoint-2:justify-between options-menu-breakpoint-2:gap-4">
      <ChaptersDropDown chapters={chapters} />
      <ChaptersPagesDropDown images={images} />
      <NavigateChaptersButtons
        chapterTitleFromUrl={chapterTitleFromUrl}
        mangaSlug={mangaSlug}
        chapters={chapters}
      />
    </div>
  );
};
export default NavElements;
