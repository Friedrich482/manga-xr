"use client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChaptersMenu from "./ChaptersMenu";

const ChapterDropDown = ({
  chapter,
  chapters,
}: {
  chapter: string;
  chapters: {
    chapterTitle: string;
    chapterReleaseDate: string;
  }[];
}) => {
  const [chaptersMenuVisibility, setChaptersMenuVisibility] = useState(false);
  return (
    <div className="">
      <button
        className="flex w-44 items-center justify-around gap-x-3 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500"
        onClick={() => {
          setChaptersMenuVisibility((prev) => !prev);
        }}
      >
        <div>{chapter.charAt(0).toUpperCase() + chapter.slice(1)}</div>
        <div className="h-full">
          <FaCaretDown />
        </div>
      </button>
      <ChaptersMenu
        chaptersMenuVisibility={chaptersMenuVisibility}
        setChaptersMenuVisibility={setChaptersMenuVisibility}
        chapters={chapters}
      />
    </div>
  );
};
export default ChapterDropDown;
