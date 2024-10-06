import LastReleasesList from "./LastReleasesList";
import LatestUpdatesSkeleton from "@/components/skeleton/LatestUpdatesSkeleton";
import PrincipalSection from "@/components/lib/PrincipalSection";
import SectionTitle from "@/components/lib/SectionTitle";
import { Suspense } from "react";
const LastReleases = () => {
  return (
    <PrincipalSection className="w-3/4 justify-start max-large-nav:w-full">
      <SectionTitle className="w-5/6">Last Releases</SectionTitle>
      <Suspense fallback={<LatestUpdatesSkeleton />}>
        <LastReleasesList />
      </Suspense>
    </PrincipalSection>
  );
};
export default LastReleases;
