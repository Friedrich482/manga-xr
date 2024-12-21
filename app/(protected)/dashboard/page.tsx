import SubNavBar from "@/components/dashboard-page/SubNavBar";
import TabWrapper from "@/components/dashboard-page/TabWrapper";
import parseSearchparamsOnDashBoardPage from "@/utils/parseSearchParamsOnDashBoardPage";

const page = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const tab = parseSearchparamsOnDashBoardPage(searchParams);
  return (
    <>
      <SubNavBar tab={tab} />
      <TabWrapper tab={tab} />
    </>
  );
};
export default page;
