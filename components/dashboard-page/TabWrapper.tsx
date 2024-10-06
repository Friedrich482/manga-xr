import AboutMeTab from "./overview/AboutMeTab";
import BookmarkTab from "./bookmarks/BookmarkTab";
import { DashBoardSubNavLinksSearchParam } from "@/zod-schema/schema";
import HistoryTab from "./history/HistoryTab";
import Main from "../lib/Main";
import PrincipalSection from "../lib/PrincipalSection";

const TabWrapper = ({ tab }: { tab: DashBoardSubNavLinksSearchParam }) => {
  return (
    <Main className="pt-8">
      <PrincipalSection className="w-5/6 flex-col justify-start text-xl">
        {!tab && <AboutMeTab />}
        {tab === "history" && <HistoryTab />}
        {tab === "bookmarks" && <BookmarkTab />}
      </PrincipalSection>
    </Main>
  );
};
export default TabWrapper;
