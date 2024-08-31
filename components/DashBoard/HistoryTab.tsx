import { Suspense } from "react";
import SectionTitle from "../lib/SectionTitle";
import History from "./History";
import PrincipalSection from "../lib/PrincipalSection";

const HistoryTab = () => {
  return (
    <PrincipalSection className="w-full">
      <SectionTitle className="w-full">History</SectionTitle>
      <Suspense fallback={<div>Loading...</div>}>
        <History />
      </Suspense>
    </PrincipalSection>
  );
};
export default HistoryTab;
