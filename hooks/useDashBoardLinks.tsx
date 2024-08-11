import { dashBoardSubNavLinks, MAX_WINDOW_DASHBOARD } from "@/lib/constants";
import useMaxWidth from "./useMaxWidth";
import { useEffect, useState } from "react";

const useDashBoardLinks = () => {
  const length = dashBoardSubNavLinks.length;
  const windowWidth = useMaxWidth();
  const averageLinkWidth = MAX_WINDOW_DASHBOARD / length;
  const [linksToDisplay, setLinksToDisplay] = useState(length);
  useEffect(() => {
    if (windowWidth > averageLinkWidth) {
      setLinksToDisplay(Math.floor(windowWidth / averageLinkWidth));
    }
  }, [windowWidth]);
  return { windowWidth, linksToDisplay };
};
export default useDashBoardLinks;
