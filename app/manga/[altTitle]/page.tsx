import { metadata } from "@/app/layout";
import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import MangaSection from "@/components/MangaPage/MangaSection";
import MangaSectionSkeleton from "@/components/Skeleton/MangaSectionSkeleton";
import { Suspense } from "react";

const page = ({ params }: { params: { altTitle: string } }) => {
  const { altTitle } = params;
  metadata.title = `${altTitle} | Manga-R`;
  return (
    <main className="flex min-h-lvh w-11/12 justify-center gap-x-5 max-large-nav:flex-col large-nav:justify-end">
      <Suspense fallback={<MangaSectionSkeleton />}>
        <MangaSection altTitle={altTitle} />
      </Suspense>
      <LargeMostPopular />
      <SmallMostPopular />
    </main>
  );
};
export default page;
