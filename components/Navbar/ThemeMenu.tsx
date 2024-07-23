"use client";
import { ThemeMenuProps } from "@/types/navbar-types";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { CiDesktop } from "react-icons/ci";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";

import { useTheme } from "next-themes";
import useToggleScroll from "@/hooks/useToggleScroll";

const themeOptions = [
  { themeName: "Light", Icon: CiLight },
  { themeName: "Dark", Icon: MdDarkMode },
  { themeName: "System", Icon: CiDesktop },
];
const ThemeMenu = ({
  themeMenuVisibility,
  setThemeMenuVisibility,
}: ThemeMenuProps) => {
  const ref = useHandleOutsideClick(
    themeMenuVisibility,
    setThemeMenuVisibility,
  );
  useToggleScroll(themeMenuVisibility);
  const { setTheme } = useTheme();
  return (
    themeMenuVisibility && (
      <div
        ref={ref}
        className="absolute right-16 top-[4.5rem] z-10 w-32 rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black"
      >
        <ul className="flex flex-col items-center justify-center gap-[2px]">
          {themeOptions.map((option) => {
            const { themeName, Icon } = option;
            return (
              <li
                className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg py-1 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                onClick={() => {
                  setTheme(themeName.toLowerCase());
                }}
                key={themeName}
              >
                <Icon className="size-6" />
                <div className="w-4/5 text-start">{themeName}</div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};
export default ThemeMenu;
