"use client";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction } from "react";
import WidthOption from "./WidthOption";
import { GapOption } from "./GapOption";
import ProgressBarDirectionOption from "./ProgressBarDirectionOption";
import { twMerge as tm } from "tailwind-merge";
import ChapterPagesDispositionOption from "./ChapterPagesDispositionOption";
import ReadingDirectionOption from "./ReadingDirectionOption";
import CloseButton from "@/components/lib/CloseButton";
import useMaxWidth from "@/hooks/useMaxWidth";
const OptionsMenu = ({
  optionsMenuVisibility,
  setOptionsMenuVisibility,
}: {
  optionsMenuVisibility: boolean;
  setOptionsMenuVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useHandleOutsideClick(
    optionsMenuVisibility,
    setOptionsMenuVisibility,
  );

  useToggleScroll(optionsMenuVisibility);

  useMaxWidth();
  return (
    <div
      className={tm(
        "fixed -top-2 z-50 flex max-h-screen min-h-[23.5rem] w-[77vw] min-w-56 flex-col overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-4 pb-5 pt-10 transition duration-500 ease-in-out dark:bg-default-black",
        !optionsMenuVisibility && "-translate-y-[800px]",
      )}
      ref={ref}
    >
      <CloseButton onClick={() => setOptionsMenuVisibility(false)} />
      <ul className="divide-primary/30 flex size-full flex-col gap-5 divide-y pt-2">
        <WidthOption />
        <GapOption />
        <ProgressBarDirectionOption />
        <ChapterPagesDispositionOption />
        <ReadingDirectionOption />
      </ul>
    </div>
  );
};
export default OptionsMenu;
