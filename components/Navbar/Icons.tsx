"use client";
import { MdDarkMode } from "react-icons/md";
import ThemeMenu from "./ThemeMenu";
import { useState } from "react";
import useUser from "@/hooks/Auth/useUser";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import AvatarIcon from "./AvatarIcon";
const Icons = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);
  const { user, isLoading } = useUser();
  return (
    <>
      <div className="flex w-4/12 min-w-24 items-center justify-end gap-2 pr-2 max-large-nav:pr-4">
        <SquaredIconButton
          aria-label="Toggle dark mode"
          onClick={() => {
            setThemeMenuVisibility((prev) => !prev);
          }}
        >
          <SquaredIcon icon={MdDarkMode} />
        </SquaredIconButton>
        <AvatarIcon user={user} isLoading={isLoading} />
      </div>
      <ThemeMenu
        themeMenuVisibility={themeMenuVisibility}
        setThemeMenuVisibility={setThemeMenuVisibility}
      />
    </>
  );
};
export default Icons;
