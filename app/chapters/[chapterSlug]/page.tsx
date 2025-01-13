import ChapterImagesWrapper from "@/components/chapter-page/ChapterImagesWrapper";
import ChapterImagesWrapperSkeleton from "@/components/skeleton/chapter-page/ChapterImagesWrapperSkeleton";
import EndSection from "@/components/chapter-page/EndSection";
import EndSectionSkeleton from "@/components/skeleton/chapter-page/EndSectionSkeleton";
import Main from "@/components/lib/Main";
import NavSection from "@/components/chapter-page/NavSection";
import NavSectionSkeleton from "@/components/skeleton/chapter-page/NavSectionSkeleton";
import { Suspense } from "react";
import { metadata } from "@/app/layout";

const page = async (props: { params: Promise<{ chapterSlug: string }> }) => {
  const chapterSlug = (await props.params).chapterSlug;

  metadata.title = "Loading...";

  return (
    <Main className="flex-col gap-12">
      <Suspense fallback={<NavSectionSkeleton />}>
        <NavSection chapterSlug={chapterSlug} />
      </Suspense>
      <Suspense fallback={<ChapterImagesWrapperSkeleton />}>
        <ChapterImagesWrapper chapterSlug={chapterSlug} />
      </Suspense>
      <Suspense fallback={<EndSectionSkeleton />}>
        <EndSection chapterSlug={chapterSlug} />
      </Suspense>
    </Main>
  );
};
export default page;
