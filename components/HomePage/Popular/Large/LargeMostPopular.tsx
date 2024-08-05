import Link from "next/link";
import LargePopularMangaList from "./LargePopularMangaList";
import { BsFire } from "react-icons/bs";
import { Suspense } from "react";
import LargePopularMangaSkeleton from "@/components/Skeleton/LargePopularMangaSkeleton";
import SectionTitle from "@/components/lib/SectionTitle";
import PrincipalSection from "@/components/lib/PrincipalSection";
import FireIcon from "@/components/lib/FireIcon";
const MostPopular = () => {
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
export default MostPopular;
