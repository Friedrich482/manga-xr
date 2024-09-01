import { Suspense } from "react";
import SectionTitle from "../lib/SectionTitle";
import History from "./History";
import PrincipalSection from "../lib/PrincipalSection";
import HistorySkeleton from "../Skeleton/HistorySkeleton";

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
