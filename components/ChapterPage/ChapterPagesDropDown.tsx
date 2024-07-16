"use client";

import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChapterPagesMenu from "./ChapterPagesMenu";
import useStore from "@/hooks/store";

const ChaptersPagesDropDown = ({ images }: { images: string[] }) => {
  const [chapterPagesMenuVisibility, setChapterPagesMenuVisibility] =
    useState(false);
  const { currentPageIndex, setChapterPagesButtonPosition } = useStore(
    (state) => ({
      currentPageIndex: state.currentPageIndex,
      setChapterPagesButtonPosition: state.setChapterPagesButtonPosition,
    }),
  );
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <button
        ref={ref}
        className="flex items-center gap-x-1 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500 max-options-menu-breakpoint-2:text-base options-menu-breakpoint-2:w-44 options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3"
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
