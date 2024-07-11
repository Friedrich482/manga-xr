import { Suspense } from "react";
import ChaptersDropDown from "./ChaptersDropDown";
import ChapterPagesDropDownWrapper from "./ChapterPagesDropDownWrapper";
import NavigateChaptersButtons from "./NavigateChaptersButtons";
import { chapterType } from "@/zod-schema/schema";

const NavElements = ({
  chapters,
  altTitle,
  chapterTitleFromUrl,
}: {
  chapters: chapterType[];
  altTitle: string;
  chapterTitleFromUrl: string;
}) => {
  return (
    <div className="flex w-full flex-wrap justify-between gap-4">
      <ChaptersDropDown chapters={chapters} />
      <Suspense fallback={<div>Loading pages...</div>}>
        <ChapterPagesDropDownWrapper
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
        />
      </Suspense>
      <NavigateChaptersButtons
        chapterTitleFromUrl={chapterTitleFromUrl}
        altTitle={altTitle}
        chapters={chapters}
      />
    </div>
  );
};
export default NavElements;
