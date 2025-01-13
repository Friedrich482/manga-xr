"use client";

import useStore from "@/hooks/zustand/store";
import capitalize from "@/utils/capitalize";

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
    document.title = `${currentPageIndex + 1} | ${title}} | ${capitalize(currentChapterTitle)}`;
  }
  return <></>;
};
export default ClientUrlUpdater;
