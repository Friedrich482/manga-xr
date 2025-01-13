"use client";
import { useRef, useState } from "react";
import { ChapterType } from "@/zod-schema/schema";
import ChaptersMenu from "./ChaptersMenu";
import DropDownButton from "../lib/DropDownButton";
import DropDownWrapper from "../lib/DropDownWrapper";
import { FaCaretDown } from "react-icons/fa";
import useStore from "@/hooks/zustand/store";

const ChaptersDropDown = ({
  chapters,
  currentChapterTitle,
}: {
  chapters: ChapterType[];
  currentChapterTitle: string;
}) => {
  const [chaptersMenuVisibility, setChaptersMenuVisibility] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { setChaptersButtonPosition } = useStore((state) => ({
    setChaptersButtonPosition: state.setChaptersButtonPosition,
  }));
  return (
    <DropDownWrapper>
      <DropDownButton
        ref={ref}
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
        {currentChapterTitle}
        <FaCaretDown className="self-center" />
      </DropDownButton>
      <ChaptersMenu
        chaptersMenuVisibility={chaptersMenuVisibility}
        setChaptersMenuVisibility={setChaptersMenuVisibility}
        chapters={chapters}
        currentChapterTitle={currentChapterTitle}
      />
    </DropDownWrapper>
  );
};
export default ChaptersDropDown;
