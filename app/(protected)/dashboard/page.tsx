import SubNavBar from "@/components/dashboard-page/SubNavBar";
import TabWrapper from "@/components/dashboard-page/TabWrapper";
import parseSearchParamsOnDashBoardPage from "@/utils/parseSearchParamsOnDashBoardPage";

const page = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const tab = parseSearchParamsOnDashBoardPage(searchParams);

  return (
    <>
      <SubNavBar tab={tab} />
      <TabWrapper tab={tab} />
    </>
  );
};
export default page;
