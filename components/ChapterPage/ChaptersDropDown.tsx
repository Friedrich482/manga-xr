"use client";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChaptersMenu from "./ChaptersMenu";
import { chapterType } from "@/zod-schema/schema";
import useStore from "@/hooks/store";

const ChaptersDropDown = ({ chapters }: { chapters: chapterType[] }) => {
  const [chaptersMenuVisibility, setChaptersMenuVisibility] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { setChaptersButtonPosition } = useStore((state) => ({
    setChaptersButtonPosition: state.setChaptersButtonPosition,
  }));
  const currentChapterTitle = chapters[0].chapterTitle;
  return (
    <div className="">
      <button
        ref={ref}
        className="flex items-center gap-x-1 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500 max-options-menu-breakpoint-2:text-base options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3"
        onClick={() => {
          setChaptersMenuVisibility((prev) => !prev);
        }}
        onMouseEnter={() => {
          const rect = ref?.current?.getBoundingClientRect();
          const position = rect?.top;
          if (position) {
            setChaptersButtonPosition(position);
          }
        }}
      >
        <div>{currentChapterTitle}</div>
        <div className="h-full">
          <FaCaretDown />
        </div>
      </button>
      <ChaptersMenu
        chaptersMenuVisibility={chaptersMenuVisibility}
        setChaptersMenuVisibility={setChaptersMenuVisibility}
        chapters={chapters}
        currentChapterTitle={currentChapterTitle}
      />
    </div>
  );
};
export default ChaptersDropDown;
