import NavSection from "@/components/ChapterPage/NavSection";
import { Suspense } from "react";
import ChapterImagesWrapper from "@/components/ChapterPage/ChapterImagesWrapper";
const page = ({
  params,
}: {
  params: { chapterSlug: string; altTitle: string };
}) => {
  const { chapterSlug, altTitle } = params;
  const chapterTitleFromUrl = chapterSlug.replace("-", " ");
  return (
    <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      <Suspense fallback={<div>Loading headers...</div>}>
        <NavSection
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
        />
      </Suspense>
      <Suspense fallback={<div>Loading images...</div>}>
        <ChapterImagesWrapper altTitle={altTitle} chapterSlug={chapterSlug} />
      </Suspense>
    </main>
  );
};
export default page;
