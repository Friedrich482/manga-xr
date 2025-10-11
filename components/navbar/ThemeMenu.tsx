"use client";
import { Dispatch, SetStateAction } from "react";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";
import { themeOptions } from "@/lib/constants";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import { useTheme } from "next-themes";
import useToggleScroll from "@/hooks/useToggleScroll";

const ThemeMenu = ({
  themeMenuVisibility,
  setThemeMenuVisibility,
}: {
  themeMenuVisibility: boolean;
  setThemeMenuVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useHandleOutsideClick(
    themeMenuVisibility,
    setThemeMenuVisibility,
  );
  useToggleScroll(themeMenuVisibility);
  const { theme, setTheme } = useTheme();
  return (
    themeMenuVisibility && (
      <DropDownMenu ref={ref} className="top-14 right-0 w-32">
        <ul className="w-full space-y-1">
          {themeOptions.map(({ themeName, Icon }) => (
            <DropDownMenuLi
              isActive={themeName.toLowerCase() === theme}
              onClick={() => {
                setTheme(themeName.toLowerCase());
              }}
              key={themeName}
              data-testid={themeName}
              className="flex gap-x-2"
            >
              <Icon className="size-6" />
              {themeName}
            </DropDownMenuLi>
          ))}
        </ul>
      </DropDownMenu>
    )
  );
};
export default ThemeMenu;
