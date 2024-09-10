"use client";

import getSeasonFromTitle from "@/utils/getSeasonFromTitle";
import useStore from "@/hooks/zustand/store";

const ClientUrlUpdater = ({
  title,
  chapterTitleFromUrl,
  altTitle,
}: {
  title: string;
  chapterTitleFromUrl: string;
  altTitle: string;
}) => {
  const { currentPageIndex } = useStore((state) => ({
    currentPageIndex: state.currentPageIndex,
  }));
  const { season } = getSeasonFromTitle(altTitle);
  if (typeof document !== "undefined") {
    document.title = `${currentPageIndex + 1} | ${title} ${season ? `${season}` : ""} | ${chapterTitleFromUrl.charAt(0).toUpperCase() + chapterTitleFromUrl.slice(1)}`;
  }
  return <></>;
};
export default ClientUrlUpdater;
