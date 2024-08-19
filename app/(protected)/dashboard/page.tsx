import SubNavBar from "@/components/DashBoard/SubNavBar";
import TabWrapper from "@/components/DashBoard/TabWrapper";
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
