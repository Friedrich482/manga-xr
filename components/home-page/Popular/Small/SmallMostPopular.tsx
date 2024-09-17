import FireIcon from "@/components/lib/FireIcon";
import Link from "next/link";
import PrincipalSection from "@/components/lib/PrincipalSection";
import SectionTitle from "@/components/lib/SectionTitle";
import SmallPopularMangaList from "./SmallPopularMangaList";
import SmallPopularMangaSkeleton from "@/components/Skeleton/SmallPopularMangaSkeleton";
import { Suspense } from "react";

const SmallMostPopular = () => {
  return (
    <PrincipalSection className="w-full items-stretch large-nav:hidden">
      <SectionTitle>
        <Link
          href="/popular"
          className="flex items-center justify-center gap-2"
        >
          <FireIcon />
          <span>Popular now</span>
        </Link>
      </SectionTitle>
      <Suspense fallback={<SmallPopularMangaSkeleton />}>
        <SmallPopularMangaList />
      </Suspense>
    </PrincipalSection>
  );
};

export default SmallMostPopular;
