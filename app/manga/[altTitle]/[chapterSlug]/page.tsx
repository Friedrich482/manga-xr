import NavSection from "@/components/ChapterPage/NavSection";
import { Suspense } from "react";
import ChapterImagesWrapper from "@/components/ChapterPage/ChapterImagesWrapper";
import EndSection from "@/components/ChapterPage/EndSection";
import NavSectionSkeleton from "@/components/Skeleton/ChapterPage/NavSectionSkeleton";
import ChapterImagesWrapperSkeleton from "@/components/Skeleton/ChapterPage/ChapterImagesWrapperSkeleton";
import EndSectionSkeleton from "@/components/Skeleton/ChapterPage/EndSectionSkeleton";
import { metadata } from "@/app/layout";
import convertSlugToChapter from "@/utils/convertSlugToChapter";
const page = ({
  params,
}: {
  params: { chapterSlug: string; altTitle: string };
}) => {
  const { chapterSlug, altTitle } = params;
  const chapterTitleFromUrl = convertSlugToChapter(chapterSlug);
  metadata.title = `${convertSlugToChapter(altTitle)}: ${chapterTitleFromUrl}`;

  return (
    <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      <Suspense fallback={<NavSectionSkeleton />}>
        <NavSection
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
        />
      </Suspense>
      <Suspense fallback={<ChapterImagesWrapperSkeleton />}>
        <ChapterImagesWrapper altTitle={altTitle} chapterSlug={chapterSlug} />
      </Suspense>
      <Suspense fallback={<EndSectionSkeleton />}>
        <EndSection
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
        />
      </Suspense>
    </main>
  );
};
export default page;
