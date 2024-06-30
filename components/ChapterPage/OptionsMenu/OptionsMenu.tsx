"use client";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction, useEffect } from "react";
import useStore from "@/hooks/store";
import WidthOption from "./WidthOption";
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

  const { setMaxWidth } = useStore();

  // control the max width at each screen resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMaxWidth(window.innerWidth);
    });
  }, [setMaxWidth]);
  return (
    optionsMenuVisibility && (
      <div className="h-0">
        <div
          className="relative top-1 z-20 flex rounded-lg border border-neutral-800 bg-default-white px-4 py-4 dark:bg-default-black"
          ref={ref}
        >
          <ul className="w-full">
            <WidthOption />
          </ul>
        </div>
      </div>
    )
  );
};
export default OptionsMenu;
