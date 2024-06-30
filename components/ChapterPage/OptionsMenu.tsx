"use client";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useStore from "@/hooks/store";
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

  const {
    width,
    setWidth,
    maxWidth,
    setMaxWidth,
    isResizable,
    setIsResizable,
  } = useStore();

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
          className="relative top-1 z-20 flex min-w-80 rounded-lg border border-neutral-800 bg-default-white px-4 py-4 dark:bg-default-black"
          ref={ref}
        >
          <ul className="w-full">
            <li className="w-full">
              <div className="mb-2 flex items-center">
                <label htmlFor="imagesWidth">Change pages width:</label>
                <input
                  checked={isResizable}
                  onChange={() => {
                    setIsResizable(isResizable);
                  }}
                  type="checkbox"
                  id="imagesWidth"
                  className="ml-4 size-6 accent-orange-400"
                />
              </div>
              <input
                type="range"
                disabled={!isResizable}
                aria-label="Change width..."
                className="w-5/6 accent-orange-400"
                min={100}
                max={maxWidth}
                value={width}
                onChange={(e) => {
                  setWidth(Number(e.target.value));
                }}
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
