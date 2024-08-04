"use client";
import { ThemeMenuProps } from "@/types/navbar-types";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import { useTheme } from "next-themes";
import useToggleScroll from "@/hooks/useToggleScroll";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";
import { themeOptions } from "@/lib/constants";

const ThemeMenu = ({
  themeMenuVisibility,
  setThemeMenuVisibility,
}: ThemeMenuProps) => {
  const ref = useHandleOutsideClick(
    themeMenuVisibility,
    setThemeMenuVisibility,
  );
  useToggleScroll(themeMenuVisibility);
  const { theme, setTheme } = useTheme();
  return (
    themeMenuVisibility && (
      <DropDownMenu ref={ref} className="right-0 top-12 w-32">
        <ul className="w-full space-y-1">
          {themeOptions.map((option) => {
            const { themeName, Icon } = option;
            return (
              <DropDownMenuLi
                isActive={themeName.toLowerCase() === theme}
                onClick={() => {
                  setTheme(themeName.toLowerCase());
                }}
                key={themeName}
                className="flex gap-x-2"
              >
                <Icon className="size-6" />
                {themeName}
              </DropDownMenuLi>
            );
          })}
        </ul>
      </DropDownMenu>
    )
  );
};
export default ThemeMenu;
