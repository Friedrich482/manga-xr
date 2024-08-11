import { DashBoardSubNavLinksSearchParam } from "@/lib/constants";
import { dashBoardSearchParamsSchema } from "@/zod-schema/schema";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useDashBoardSearchParams = () => {
  const [tab, setTab] = useState<DashBoardSubNavLinksSearchParam | null>();
  const searchParams = useSearchParams();
  useEffect(() => {
    const data = searchParams.get("tab");
    if (data) {
      const parsedData = dashBoardSearchParamsSchema.safeParse(data);
      if (!parsedData.success) {
        notFound();
      } else {
        setTab(parsedData.data);
      }
    } else {
      setTab(null);
    }
  }, [searchParams]);
  return tab;
};
export default useDashBoardSearchParams;
