"use client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChaptersMenu from "./ChaptersMenu";
import { chapterType } from "@/zod-schema/schema";

const ChapterDropDown = ({
  chapterTitleFromUrl,
  chapters,
}: {
  chapterTitleFromUrl: string;
  chapters: chapterType[];
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
        <div>
          {chapterTitleFromUrl.charAt(0).toUpperCase() +
            chapterTitleFromUrl.slice(1)}
        </div>
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
