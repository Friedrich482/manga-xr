import SubNavBar from "@/components/dashboard-page/SubNavBar";
import TabWrapper from "@/components/dashboard-page/TabWrapper";
import parseSearchparamsOnDashBoardPage from "@/utils/parseSearchParamsOnDashBoardPage";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const tab = parseSearchparamsOnDashBoardPage(searchParams);
  return (
    <>
      <SubNavBar tab={tab} />
      <TabWrapper tab={tab} />
    </>
  );
};
export default page;
