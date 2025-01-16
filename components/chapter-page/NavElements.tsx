import { ChapterType } from "@/zod-schema/schema";
import ChaptersDropDown from "./ChaptersDropDown";
import ChaptersPagesDropDown from "./ChapterPagesDropDown";
import NavigateChaptersButtons from "./NavigateChaptersButtons";

const NavElements = ({
  chapters,
  mangaSlug,
  images,
  currentChapterTitle,
}: {
  chapters: ChapterType[];
  mangaSlug: string;
  images: string[];
  currentChapterTitle: string;
}) => {
  return (
    <div className="flex w-full flex-wrap gap-1 options-menu-breakpoint-2:justify-between options-menu-breakpoint-2:gap-4">
      <ChaptersDropDown
        chapters={chapters}
        currentChapterTitle={currentChapterTitle}
      />
      <ChaptersPagesDropDown images={images} />
      <NavigateChaptersButtons
        mangaSlug={mangaSlug}
        chapters={chapters}
        currentChapterTitle={currentChapterTitle}
      />
    </div>
  );
};
export default NavElements;
