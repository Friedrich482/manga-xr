import {
  ChapterPagesDisposition,
  ProgressBarDirection,
  ReadingDirection,
} from "@/zod-schema/schema";
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

export const windowResizeRatio = 55 / 72;

export const arrayOfDirections: {
  content: ReadingDirection;
  id: string;
  value: ReadingDirection;
}[] = [
  {
    content: "From left to right",
    id: "fromLeftToRight",
    value: "From left to right",
  },
  {
    content: "From right to left",
    id: "fromRightToLeft",
    value: "From right to left",
  },
];

export const pagesDispositions: {
  content: ChapterPagesDisposition;
  id: string;
  value: ChapterPagesDisposition;
}[] = [
  { content: "Long Strip", id: "longStrip", value: "Long Strip" },
  { content: "Single Page", id: "singlePage", value: "Single Page" },
];

export const arrayOfPBDirections: {
  content: ProgressBarDirection;
  id: string;
  value: ProgressBarDirection;
}[] = [
  { content: "Horizontal", id: "horizontal", value: "Horizontal" },
  { content: "Vertical", id: "vertical", value: "Vertical" },
];
