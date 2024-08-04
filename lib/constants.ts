import { CiDesktop, CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export const gapOptions = [
  { name: "No gap", value: "0rem" },
  { name: "Small", value: "0.5rem" },
  { name: "Medium", value: "1rem" },
  { name: "Large", value: "3rem" },
];

export const themeOptions = [
  { themeName: "Light", Icon: CiLight },
  { themeName: "Dark", Icon: MdDarkMode },
  { themeName: "System", Icon: CiDesktop },
];
