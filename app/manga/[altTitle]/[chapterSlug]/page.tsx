import NavSection from "@/components/ChapterPage/NavSection";
import { Suspense } from "react";
import ChapterImagesWrapper from "@/components/ChapterPage/ChapterImagesWrapper";
import EndSection from "@/components/ChapterPage/EndSection";
import NavSectionSkeleton from "@/components/Skeleton/ChapterPage/NavSectionSkeleton";
import ChapterImagesWrapperSkeleton from "@/components/Skeleton/ChapterPage/ChapterImagesWrapperSkeleton";
import EndSectionSkeleton from "@/components/Skeleton/ChapterPage/EndSectionSkeleton";
import { metadata } from "@/app/layout";
import convertSlugToChapter from "@/utils/convertSlugToChapter";
import isValidChapterFormat from "@/utils/isValidChapterSlug";
import { notFound } from "next/navigation";
import Main from "@/components/lib/Main";
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
    <Main>
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
