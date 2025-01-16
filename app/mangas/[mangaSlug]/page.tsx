import LargeMostPopular from "@/components/home-page/popular/large/LargeMostPopular";
import Main from "@/components/lib/Main";
import MangaSection from "@/components/manga-page/MangaSection";
import MangaSectionSkeleton from "@/components/skeleton/MangaSectionSkeleton";
import SmallMostPopular from "@/components/home-page/popular/small/SmallMostPopular";
import { Suspense } from "react";
import { metadata } from "@/app/layout";

const page = async (props: { params: Promise<{ mangaSlug: string }> }) => {
  const mangaSlug = (await props.params).mangaSlug;

  metadata.title = "MangaXR";

  return (
    <Main className="gap-y-6 max-large-nav:flex-col large-nav:justify-end">
      <Suspense fallback={<MangaSectionSkeleton />}>
        <MangaSection mangaSlug={mangaSlug} />
      </Suspense>
      <LargeMostPopular />
      <SmallMostPopular />
    </Main>
  );
};
export default page;
