import LargeMostPopular from "@/components/home-page/popular/large/LargeMostPopular";
import Main from "@/components/lib/Main";
import MangaSection from "@/components/manga-page/MangaSection";
import MangaSectionSkeleton from "@/components/skeleton/MangaSectionSkeleton";
import SmallMostPopular from "@/components/home-page/popular/small/SmallMostPopular";
import { Suspense } from "react";
import { metadata } from "@/app/layout";
import { redirect } from "next/navigation";

const page = async (props: { params: Promise<{ mangaSlug: string }> }) => {
  const params = await props.params;
  // this part must disappear since the mangaSlug is now an id
  // removes the season if there is one in the title (when navigating from the chapter page back to the mangaSlug page with a season)
  const hasUnderscore = params.mangaSlug.includes("_");
  const mangaSlug = hasUnderscore
    ? params.mangaSlug.split("_")[0]
    : params.mangaSlug;

  if (hasUnderscore) {
    redirect(`/mangas/${mangaSlug}`);
  }

  metadata.title = `${mangaSlug} | MangaXR`;
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
