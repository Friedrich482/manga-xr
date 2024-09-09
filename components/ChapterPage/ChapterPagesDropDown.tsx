"use client";

import { useRef, useState } from "react";
import ChapterPagesMenu from "./ChapterPagesMenu";
import DropDownButton from "../lib/DropDownButton";
import DropDownWrapper from "../lib/DropDownWrapper";
import { FaCaretDown } from "react-icons/fa";
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
    <DropDownWrapper>
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
    </DropDownWrapper>
  );
};

export default ChaptersPagesDropDown;
