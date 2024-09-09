import ChapterImagesWrapper from "@/components/ChapterPage/ChapterImagesWrapper";
import ChapterImagesWrapperSkeleton from "@/components/Skeleton/ChapterPage/ChapterImagesWrapperSkeleton";
import EndSection from "@/components/ChapterPage/EndSection";
import EndSectionSkeleton from "@/components/Skeleton/ChapterPage/EndSectionSkeleton";
import Main from "@/components/lib/Main";
import NavSection from "@/components/ChapterPage/NavSection";
import NavSectionSkeleton from "@/components/Skeleton/ChapterPage/NavSectionSkeleton";
import { Suspense } from "react";
import convertSlugToChapter from "@/utils/convertSlugToChapter";
import isValidChapterFormat from "@/utils/isValidChapterSlug";
import { metadata } from "@/app/layout";
import { notFound } from "next/navigation";
const page = ({
  params,
}: {
  params: { chapterSlug: string; altTitle: string };
}) => {
  const { chapterSlug, altTitle } = params;
  if (!isValidChapterFormat(chapterSlug)) {
    notFound();
  }
  const chapterTitleFromUrl = convertSlugToChapter(chapterSlug);
  metadata.title = `${altTitle}: ${chapterTitleFromUrl}`;

  return (
    <Main className="flex-col gap-12">
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
    </Main>
  );
};
export default page;
