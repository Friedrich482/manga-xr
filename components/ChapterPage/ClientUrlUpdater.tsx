"use client";

import useStore from "@/hooks/store";

const ClientUrlUpdater = ({
  title,
  chapterTitleFromUrl,
}: {
  title: string;
  chapterTitleFromUrl: string;
}) => {
  const { currentPageIndex } = useStore((state) => ({
    currentPageIndex: state.currentPageIndex,
  }));
  if (typeof document !== "undefined") {
    document.title = `${currentPageIndex + 1} | ${title} | ${chapterTitleFromUrl.charAt(0).toUpperCase() + chapterTitleFromUrl.slice(1)}`;
  }
  return <></>;
};
export default ClientUrlUpdater;
