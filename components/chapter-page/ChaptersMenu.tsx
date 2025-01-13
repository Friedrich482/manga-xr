"use client";
import { Dispatch, SetStateAction } from "react";
import { ChapterType } from "@/zod-schema/schema";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";
import Link from "next/link";
import getCorrectUrl from "@/utils/getCorrectUrl";
import removeSeasonFromTitle from "@/utils/removeSeasonFromTitle";
import useHandleMenuPosition from "@/hooks/useHandleMenuPosition";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import { useParams } from "next/navigation";
import useStore from "@/hooks/zustand/store";
import useToggleScroll from "@/hooks/useToggleScroll";

const ChaptersMenu = ({
  chaptersMenuVisibility,
  setChaptersMenuVisibility,
  chapters,
  currentChapterTitle,
}: {
  chaptersMenuVisibility: boolean;
  setChaptersMenuVisibility: Dispatch<SetStateAction<boolean>>;
  chapters: ChapterType[];
  currentChapterTitle: string;
}) => {
  const ref = useHandleOutsideClick(
    chaptersMenuVisibility,
    setChaptersMenuVisibility,
  );
  useToggleScroll(chaptersMenuVisibility);

  const { chaptersButtonPosition } = useStore((state) => ({
    chaptersButtonPosition: state.chaptersButtonPosition,
  }));
  const menuPosition = useHandleMenuPosition(chaptersButtonPosition);

  return (
    chaptersMenuVisibility && (
      <DropDownMenu menuPosition={menuPosition} ref={ref}>
        <ul className="w-full space-y-1">
          {chapters.map(({ chapterTitle, chapterSlug }) => {
            const isActive = currentChapterTitle === chapterTitle;
            return (
              <DropDownMenuLi key={chapterTitle} isActive={isActive}>
                <Link href={`/chapters/${chapterSlug}`} className="flex w-full">
                  {chapterTitle}
                </Link>
              </DropDownMenuLi>
            );
          })}
        </ul>
      </DropDownMenu>
    )
  );
};
export default ChaptersMenu;
