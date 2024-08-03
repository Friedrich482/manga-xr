"use client";
import { Dispatch, SetStateAction } from "react";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import useHandleMenuPosition from "@/hooks/useHandleMenuPosition";
import useStore from "@/hooks/store";
import { chapterType } from "@/zod-schema/schema";
import Link from "next/link";
import { useParams } from "next/navigation";
import getCorrectUrl from "@/utils/getCorrectUrl";
import removeSeasonFromTitle from "@/utils/removeSeasonFromTitle";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";

const ChaptersMenu = ({
  chaptersMenuVisibility,
  setChaptersMenuVisibility,
  chapters,
  currentChapterTitle,
}: {
  chaptersMenuVisibility: boolean;
  setChaptersMenuVisibility: Dispatch<SetStateAction<boolean>>;
  chapters: chapterType[];
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
  const { altTitle }: { altTitle: string; chapterSlug: string } = useParams();
  return (
    chaptersMenuVisibility && (
      <DropDownMenu menuPosition={menuPosition} ref={ref}>
        <ul className="w-full">
          {chapters.map((chapter) => {
            const { chapterTitle } = chapter;
            const isActive = currentChapterTitle === chapterTitle;
            return (
              <DropDownMenuLi key={chapterTitle} isActive={isActive}>
                <Link
                  href={getCorrectUrl(
                    removeSeasonFromTitle(altTitle),
                    chapterTitle,
                  )}
                >
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
