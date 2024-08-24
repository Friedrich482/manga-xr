import Main from "../lib/Main";
import PrincipalSection from "../lib/PrincipalSection";
import AboutMeTab from "./AboutMeTab";
import HistoryTab from "./HistoryTab";
import { DashBoardSubNavLinksSearchParam } from "@/zod-schema/schema";

const TabWrapper = ({
  tab,
}: {
  tab: DashBoardSubNavLinksSearchParam | null;
}) => {
  return (
    <Main className="pt-8">
      <PrincipalSection className="w-5/6 flex-col justify-start text-xl">
        {!tab && <AboutMeTab />}
        {tab === "bookmarks" && <>bookmarks</>}
        {tab === "history" && <HistoryTab />}
      </PrincipalSection>
    </Main>
  );
};
export default TabWrapper;
