"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChapterPagesMenu from "./ChapterPagesMenu";

const ChaptersPagesDropDown = ({ images }: { images: string[] }) => {
  const [chapterPagesMenuVisibility, setChapterPagesMenuVisibility] =
    useState(false);
  return (
    <div>
      <button
        className="flex w-44 items-center justify-around gap-x-3 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500"
        onClick={() => {
          setChapterPagesMenuVisibility((prev) => !prev);
        }}
      >
        <div>Page 1/{images.length}</div>
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