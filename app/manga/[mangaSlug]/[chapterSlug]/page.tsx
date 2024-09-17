import ChapterImagesWrapper from "@/components/chapter-page/ChapterImagesWrapper";
import ChapterImagesWrapperSkeleton from "@/components/Skeleton/ChapterPage/ChapterImagesWrapperSkeleton";
import EndSection from "@/components/chapter-page/EndSection";
import EndSectionSkeleton from "@/components/Skeleton/ChapterPage/EndSectionSkeleton";
import Main from "@/components/lib/Main";
import NavSection from "@/components/chapter-page/NavSection";
import NavSectionSkeleton from "@/components/Skeleton/ChapterPage/NavSectionSkeleton";
import { Suspense } from "react";
import convertSlugToChapter from "@/utils/convertSlugToChapter";
import isValidChapterFormat from "@/utils/isValidChapterSlug";
import { metadata } from "@/app/layout";
import { notFound } from "next/navigation";
const page = ({
  params,
}: {
  params: { chapterSlug: string; mangaSlug: string };
}) => {
  const { chapterSlug, mangaSlug } = params;
  if (!isValidChapterFormat(chapterSlug)) {
    notFound();
  }
  const chapterTitleFromUrl = convertSlugToChapter(chapterSlug);
  metadata.title = `${mangaSlug}: ${chapterTitleFromUrl}`;

  return (
    <Main className="flex-col gap-12">
      <Suspense fallback={<NavSectionSkeleton />}>
        <NavSection
          mangaSlug={mangaSlug}
          chapterTitleFromUrl={chapterTitleFromUrl}
        />
      </Suspense>
      <Suspense fallback={<ChapterImagesWrapperSkeleton />}>
        <ChapterImagesWrapper mangaSlug={mangaSlug} chapterSlug={chapterSlug} />
      </Suspense>
      <Suspense fallback={<EndSectionSkeleton />}>
        <EndSection
          mangaSlug={mangaSlug}
          chapterTitleFromUrl={chapterTitleFromUrl}
        />
      </Suspense>
    </Main>
  );
};
export default page;
