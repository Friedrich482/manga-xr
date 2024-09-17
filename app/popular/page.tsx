import FireIcon from "@/components/lib/FireIcon";
import Main from "@/components/lib/Main";
import PopularList from "@/components/popular-page/PopularList";
import PopularMangaPageSkeleton from "@/components/Skeleton/PopularMangaPageSkeleton";
import PrincipalSection from "@/components/lib/PrincipalSection";
import SectionTitle from "@/components/lib/SectionTitle";
import { Suspense } from "react";
import { metadata } from "../layout";

const PopularPage = () => {
  metadata.title = "Popular Manga";
  return (
    <Main>
      <PrincipalSection className="w-5/6 self-center">
        <SectionTitle className="flex justify-center gap-2">
          <FireIcon />
          <span>Popular</span>
        </SectionTitle>
        <Suspense fallback={<PopularMangaPageSkeleton />}>
          <PopularList />
        </Suspense>
      </PrincipalSection>
    </Main>
  );
};
export default PopularPage;
