"use client";

import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChapterPagesMenu from "./ChapterPagesMenu";
import useStore from "@/hooks/store";

const ChaptersPagesDropDown = ({ images }: { images: string[] }) => {
  const [chapterPagesMenuVisibility, setChapterPagesMenuVisibility] =
    useState(false);
  const {
    currentPageIndex,
    setCurrentPageIndex,
    setChapterPagesButtonPosition,
  } = useStore((state) => ({
    currentPageIndex: state.currentPageIndex,
    setCurrentPageIndex: state.setCurrentPageIndex,
    setChapterPagesButtonPosition: state.setChapterPagesButtonPosition,
  }));
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // Always initialize it to 0, because this state cans be conserved between chapters
    setCurrentPageIndex(0);
  }, []);
  return (
    <div>
      <button
        ref={ref}
        className="flex min-w-44 items-center justify-around gap-x-3 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500"
        onClick={() => {
          setChapterPagesMenuVisibility((prev) => !prev);
        }}
        onMouseEnter={() => {
          const rect = ref?.current?.getBoundingClientRect();
          const position = rect?.top;
          if (position) {
            setChapterPagesButtonPosition(position);
          }
        }}
      >
        <div>
          Page {currentPageIndex + 1}/{images.length}
        </div>
        <div className="h-full">
          <FaCaretDown />
        </div>
      </button>
      <ChapterPagesMenu
        chapterPagesMenuVisibility={chapterPagesMenuVisibility}
        setChapterPagesMenuVisibility={setChapterPagesMenuVisibility}
        images={images}
      />
    </div>
  );
};

export default ChaptersPagesDropDown;
