import { Suspense } from "react";
import History from "./History";
import PrincipalSection from "@/components/lib/PrincipalSection";
import SectionTitle from "@/components/lib/SectionTitle";
import HistorySkeleton from "@/components/Skeleton/HistorySkeleton";

const HistoryTab = () => {
  return (
    <PrincipalSection className="w-full">
      <SectionTitle className="w-full">History</SectionTitle>
      <Suspense fallback={<HistorySkeleton />}>
        <History />
      </Suspense>
    </PrincipalSection>
  );
};
export default HistoryTab;
