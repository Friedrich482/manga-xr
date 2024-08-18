"use client";
import { useState } from "react";
import DropDownWrapper from "../lib/DropDownWrapper";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import { MdDarkMode } from "react-icons/md";
import ThemeMenu from "./ThemeMenu";
import { CiLight } from "react-icons/ci";

const ThemeDropDown = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);

  return (
    <DropDownWrapper className="min-w-6">
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
