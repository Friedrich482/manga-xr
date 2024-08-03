"use client";

import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChapterPagesMenu from "./ChapterPagesMenu";
import useStore from "@/hooks/store";
import DropDownButton from "../lib/DropDownButton";

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
    <>
      <DropDownButton
        ref={ref}
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
        Page {currentPageIndex + 1}/{images.length}
        <FaCaretDown className="self-center" />
      </DropDownButton>
      <ChapterPagesMenu
        chapterPagesMenuVisibility={chapterPagesMenuVisibility}
        setChapterPagesMenuVisibility={setChapterPagesMenuVisibility}
        images={images}
      />
    </>
  );
};

export default ChaptersPagesDropDown;
