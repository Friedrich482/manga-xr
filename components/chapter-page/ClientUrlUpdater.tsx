"use client";

import getSeasonFromTitle from "@/utils/getSeasonFromTitle";
import useStore from "@/hooks/zustand/store";

const ClientUrlUpdater = ({
  title,
  chapterTitleFromUrl,
  mangaSlug,
}: {
  title: string;
  chapterTitleFromUrl: string;
  mangaSlug: string;
}) => {
  const { currentPageIndex } = useStore((state) => ({
    currentPageIndex: state.currentPageIndex,
  }));
  const { season } = getSeasonFromTitle(mangaSlug);
  if (typeof document !== "undefined") {
    document.title = `${currentPageIndex + 1} | ${title} ${season ? `${season}` : ""} | ${chapterTitleFromUrl.charAt(0).toUpperCase() + chapterTitleFromUrl.slice(1)}`;
  }
  return <></>;
};
export default ClientUrlUpdater;
