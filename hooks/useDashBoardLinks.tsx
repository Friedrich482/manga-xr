import { MAX_WINDOW_DASHBOARD, dashBoardSubNavLinks } from "@/lib/constants";
import { useEffect, useState } from "react";
import useMaxWidth from "./useMaxWidth";

const useDashBoardLinks = () => {
  const length = dashBoardSubNavLinks.length;
  const windowWidth = useMaxWidth();
  const averageLinkWidth = MAX_WINDOW_DASHBOARD / length;
  const [linksToDisplay, setLinksToDisplay] = useState(length);
  const numberOfLinks = Math.floor(windowWidth / averageLinkWidth);

  useEffect(() => {
    if (windowWidth > averageLinkWidth) {
      setLinksToDisplay(numberOfLinks > length ? length : numberOfLinks);
    } else {
      setLinksToDisplay(0);
    }
  }, [windowWidth]);

  return { windowWidth, linksToDisplay };
};
export default useDashBoardLinks;
