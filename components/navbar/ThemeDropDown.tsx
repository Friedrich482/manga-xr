"use client";
import { CiLight } from "react-icons/ci";
import DropDownWrapper from "../lib/DropDownWrapper";
import { MdDarkMode } from "react-icons/md";
import SquaredIcon from "../lib/SquaredIcon";
import SquaredIconButton from "../lib/SquaredIconButton";
import ThemeMenu from "./ThemeMenu";
import { useState } from "react";

const ThemeDropDown = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);

  return (
    <DropDownWrapper className="min-w-6 shrink-0">
      <SquaredIconButton
        aria-label="Toggle dark mode"
        onClick={() => {
          setThemeMenuVisibility((prev) => !prev);
        }}
      >
        <SquaredIcon icon={CiLight} className="flex dark:hidden" />
        <SquaredIcon icon={MdDarkMode} className="hidden dark:flex" />
      </SquaredIconButton>
      <ThemeMenu
        themeMenuVisibility={themeMenuVisibility}
        setThemeMenuVisibility={setThemeMenuVisibility}
      />
    </DropDownWrapper>
  );
};
export default ThemeDropDown;
