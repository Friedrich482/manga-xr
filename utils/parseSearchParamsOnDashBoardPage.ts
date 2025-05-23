import {
  DashBoardSubNavLinksSearchParam,
  dashBoardSearchParamsSchema,
} from "@/zod-schema/schema";
import { notFound } from "next/navigation";

const parseSearchParamsOnDashBoardPage = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  let tab: DashBoardSubNavLinksSearchParam = null;
  const data = searchParams.tab;

  if (data) {
    const parsedSearchParams = dashBoardSearchParamsSchema.safeParse(
      searchParams.tab,
    );

    if (!parsedSearchParams.success) {
      return notFound();
    }

    tab = parsedSearchParams.data;
  } else {
    tab = null;
  }

  return tab;
};

export default parseSearchParamsOnDashBoardPage;
