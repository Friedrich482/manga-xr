import { metadata } from "../layout";
import { Suspense } from "react";
import PopularList from "@/components/PopularPage/PopularList";
import PopularMangaPageSkeleton from "@/components/Skeleton/PopularMangaPageSkeleton";
import Main from "@/components/lib/Main";
import PrincipalSection from "@/components/lib/PrincipalSection";
import SectionTitle from "@/components/lib/SectionTitle";
import FireIcon from "@/components/lib/FireIcon";

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
