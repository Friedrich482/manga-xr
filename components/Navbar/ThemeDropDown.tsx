import { useState } from "react";
import DropDownWrapper from "../lib/DropDownWrapper";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import { MdDarkMode } from "react-icons/md";
import ThemeMenu from "./ThemeMenu";
import { useTheme } from "next-themes";
import { CiLight } from "react-icons/ci";

const ThemeDropDown = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <DropDownWrapper className="min-w-6">
      <SquaredIconButton
        aria-label="Toggle dark mode"
        onClick={() => {
          setThemeMenuVisibility((prev) => !prev);
        }}
      >
        <SquaredIcon icon={resolvedTheme === "dark" ? MdDarkMode : CiLight} />
      </SquaredIconButton>
      <ThemeMenu
        themeMenuVisibility={themeMenuVisibility}
        setThemeMenuVisibility={setThemeMenuVisibility}
      />
    </DropDownWrapper>
  );
};
export default ThemeDropDown;
