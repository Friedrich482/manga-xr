import { metadata } from "@/app/layout";
import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import Main from "@/components/lib/Main";
import MangaSection from "@/components/MangaPage/MangaSection";
import MangaSectionSkeleton from "@/components/Skeleton/MangaSectionSkeleton";
import { Suspense } from "react";

const page = ({ params }: { params: { altTitle: string } }) => {
  const { altTitle } = params;
  metadata.title = `${altTitle} | MangaXR`;
  return (
    <Main className="gap-y-6 max-large-nav:flex-col large-nav:justify-end">
      <Suspense fallback={<MangaSectionSkeleton />}>
        <MangaSection altTitle={altTitle} />
      </Suspense>
      <LargeMostPopular />
      <SmallMostPopular />
    </Main>
  );
};
export default page;
