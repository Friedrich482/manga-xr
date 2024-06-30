import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useMaxWidth from "@/hooks/useMaxWidth";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const maxWidth = useMaxWidth();
  return (
    optionsMenuVisibility && (
      <div className="h-0">
        <div
          className="relative top-1 z-20 flex rounded-lg border border-neutral-800 bg-default-white px-4 py-4 dark:bg-default-black"
          ref={ref}
        >
          <ul className="w-full">
            <li className="w-full">
              <label htmlFor="imagesWidth">Change pages width:</label>
              <input
                id="imagesWidth"
                type="range"
                aria-label="Change width..."
                className="w-5/6"
                min={100}
                max={maxWidth}
              />
              <div className="flex w-11/12 justify-between">
                <span>100</span>
                <span>{maxWidth}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};
export default OptionsMenu;
