import { Suspense } from "react";
import LastReleasesList from "./LastReleasesList";
import LatestUpdatesSkeleton from "@/components/Skeleton/LatestUpdatesSkeleton";
import SectionTitle from "@/components/lib/SectionTitle";
import PrincipalSection from "@/components/lib/PrincipalSection";
const LastReleases = () => {
  return (
    <PrincipalSection className="w-3/4 justify-start">
      <SectionTitle className="w-5/6">Last Releases</SectionTitle>
      <Suspense fallback={<LatestUpdatesSkeleton />}>
        <LastReleasesList />
      </Suspense>
    </PrincipalSection>
  );
};
export default LastReleases;
