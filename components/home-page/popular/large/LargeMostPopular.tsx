import FireIcon from "@/components/lib/FireIcon";
import LargePopularMangaList from "./LargePopularMangaList";
import LargePopularMangaSkeleton from "@/components/skeleton/LargePopularMangaSkeleton";
import Link from "next/link";
import PrincipalSection from "@/components/lib/PrincipalSection";
import SectionTitle from "@/components/lib/SectionTitle";
import { Suspense } from "react";
const LargeMostPopular = () => {
  return (
    <PrincipalSection className="hidden w-1/4 min-w-60 max-w-80 gap-8 place-self-end self-start large-nav:flex">
      <SectionTitle>
        <Link
          href="/popular"
          className="flex items-center justify-center gap-2"
        >
          <FireIcon />
          <span>Popular</span>
        </Link>
      </SectionTitle>
      <Suspense fallback={<LargePopularMangaSkeleton />}>
        <LargePopularMangaList />
      </Suspense>
    </PrincipalSection>
  );
};
export default LargeMostPopular;
