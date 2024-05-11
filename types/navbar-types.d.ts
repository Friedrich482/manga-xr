export type ThemeMenuProps = {
  themeMenuVisibility: boolean;
  setThemeMenuVisibility: Dispatch<SetStateAction<boolean>>;
};

export type Theme = "light" | "dark" | "system";
