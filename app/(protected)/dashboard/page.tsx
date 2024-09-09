import SubNavBar from "@/components/DashBoard/SubNavBar";
import TabWrapper from "@/components/DashBoard/TabWrapper";
import { metadata } from "@/app/layout";
import parseSearchparamsOnDashBoardPage from "@/utils/parseSearchParamsOnDashBoardPage";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  metadata.title = "Dashboard | MangaXR";
  const tab = parseSearchparamsOnDashBoardPage(searchParams);
  return (
    <>
      <SubNavBar tab={tab} />
      <TabWrapper tab={tab} />
    </>
  );
};
export default page;
