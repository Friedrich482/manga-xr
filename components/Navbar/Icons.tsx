"use client";
import { MdDarkMode } from "react-icons/md";
import ThemeMenu from "./ThemeMenu";
import { useState } from "react";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import AvatarIcon from "./AvatarIcon";
import DropDownWrapper from "../lib/DropDownWrapper";
const Icons = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);
  return (
    <div className="flex w-4/12 min-w-24 items-center justify-center gap-2 pr-2 max-large-nav:pr-4">
      <DropDownWrapper className="min-w-6">
        <SquaredIconButton
          aria-label="Toggle dark mode"
          onClick={() => {
            setThemeMenuVisibility((prev) => !prev);
          }}
        >
          <SquaredIcon icon={MdDarkMode} />
        </SquaredIconButton>
        <ThemeMenu
          themeMenuVisibility={themeMenuVisibility}
          setThemeMenuVisibility={setThemeMenuVisibility}
        />
      </DropDownWrapper>
      <AvatarIcon />
    </div>
  );
};
export default Icons;
