import { metadata } from "@/app/layout";
import SubNavBar from "@/components/DashBoard/SubNavBar";
import Main from "@/components/lib/Main";
import { dashBoardSearchParamsSchema } from "@/zod-schema/schema";
import { notFound } from "next/navigation";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let parsedTab: string | undefined;

  const { tab } = searchParams;
  if (tab) {
    const parsedSearchParams = dashBoardSearchParamsSchema.safeParse(tab);
    if (!parsedSearchParams.success) {
      notFound();
    }
    parsedTab = parsedSearchParams.data;
  }

  metadata.title = "Dashboard | MangaXR";
  return (
    <>
      <SubNavBar tab={parsedTab} />
      <Main>Dashboard</Main>
    </>
  );
};
export default page;
