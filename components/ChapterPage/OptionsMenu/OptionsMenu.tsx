"use client";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction, useEffect } from "react";
import useStore from "@/hooks/store";
import WidthOption from "./WidthOption";
import GapOption from "./GapOption/GapOption";
import ProgressBarDirectionOption from "./ProgressBarDirectionOption";
import { twMerge as tm } from "tailwind-merge";
const OptionsMenu = ({
  optionsMenuVisibility,
  setOptionsMenuVisibility,
}: {
  optionsMenuVisibility: boolean;
  setOptionsMenuVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  // handle outside click to close the menu
  const ref = useHandleOutsideClick(
    optionsMenuVisibility,
    setOptionsMenuVisibility,
  );

  // disable the scroll when the menu is open
  useToggleScroll(optionsMenuVisibility);

  const { setMaxWidth } = useStore((state) => ({
    setMaxWidth: state.setMaxWidth,
  }));

  // control the max width at each screen resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMaxWidth(window.innerWidth);
    });
  }, [setMaxWidth]);
  return (
    <div className="h-0">
      <div
        className={tm(
          "fixed -top-1 z-50 flex w-[80vw] min-w-64 rounded-lg border border-neutral-800 bg-default-white px-4 pb-4 pt-12 transition duration-500 ease-in-out dark:bg-default-black",
          !optionsMenuVisibility && "-translate-y-96",
        )}
        ref={ref}
      >
        <ul className="w-full">
          <WidthOption />
          <GapOption />
          <ProgressBarDirectionOption />
        </ul>
      </div>
    </div>
  );
};
export default OptionsMenu;
