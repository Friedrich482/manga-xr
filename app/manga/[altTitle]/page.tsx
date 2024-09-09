import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import Main from "@/components/lib/Main";
import MangaSection from "@/components/MangaPage/MangaSection";
import MangaSectionSkeleton from "@/components/Skeleton/MangaSectionSkeleton";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import { Suspense } from "react";
import { metadata } from "@/app/layout";
import { redirect } from "next/navigation";

const page = ({ params }: { params: { altTitle: string } }) => {
  // removes the season if there is one in the title (when navigating from the chapter page back to the altTitle page with a season)
  const hasUnderscore = params.altTitle.includes("_");
  const altTitle = hasUnderscore
    ? params.altTitle.split("_")[0]
    : params.altTitle;

  if (hasUnderscore) {
    redirect(`/manga/${altTitle}`);
  }

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
