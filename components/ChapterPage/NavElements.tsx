import ChaptersDropDown from "./ChaptersDropDown";
import NavigateChaptersButtons from "./NavigateChaptersButtons";
import { chapterType } from "@/zod-schema/schema";
import ChaptersPagesDropDown from "./ChapterPagesDropDown";

const NavElements = ({
  chapters,
  altTitle,
  chapterTitleFromUrl,
  images,
}: {
  chapters: chapterType[];
  altTitle: string;
  chapterTitleFromUrl: string;
  images: string[];
}) => {
  return (
    <div className="flex w-full flex-wrap justify-between gap-4">
      <ChaptersDropDown chapters={chapters} />
      <ChaptersPagesDropDown images={images} />
      <NavigateChaptersButtons
        chapterTitleFromUrl={chapterTitleFromUrl}
        altTitle={altTitle}
        chapters={chapters}
      />
    </div>
  );
};
export default NavElements;
