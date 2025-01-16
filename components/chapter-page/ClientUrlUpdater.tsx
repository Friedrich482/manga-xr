"use client";

import capitalize from "@/utils/capitalize";
import useStore from "@/hooks/zustand/store";

const ClientUrlUpdater = ({
  title,
  currentChapterTitle,
}: {
  title: string;
  currentChapterTitle: string;
}) => {
  const { currentPageIndex } = useStore((state) => ({
    currentPageIndex: state.currentPageIndex,
  }));
  if (typeof document !== "undefined") {
    document.title = `${currentPageIndex + 1} | ${title} | ${capitalize(currentChapterTitle)}`;
  }
  return <></>;
};
export default ClientUrlUpdater;
