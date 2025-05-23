import {
  ChapterPagesDisposition,
  CursorClass,
  ReadingDirection,
} from "@/zod-schema/schema";

const defineCursorShape = (
  e: MouseEvent,
  chapterPagesDisposition: ChapterPagesDisposition,
  currentPageIndex: number,
  images: string[],
  readingDirection?: ReadingDirection,
): CursorClass => {
  const cursorX = e.clientX;
  const cursorY = e.clientY;
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const isUpperHalf = cursorY < viewportHeight / 2;
  const isLeftSide = cursorX < viewportWidth / 2;
  const isRightSide = cursorX >= viewportWidth / 2;

  if (chapterPagesDisposition === "Long Strip") {
    return isUpperHalf ? "cursor-up" : "cursor-down";
  }

  if (readingDirection === "From left to right") {
    if (isLeftSide && currentPageIndex !== 0) {
      return "cursor-left";
    } else if (isRightSide && currentPageIndex !== images.length - 1) {
      return "cursor-right";
    }
    return "cursor-default";
  }

  if (isLeftSide && currentPageIndex !== images.length - 1) {
    return "cursor-left";
  } else if (isRightSide && currentPageIndex !== 0) {
    return "cursor-right";
  }

  // Default cursor, if none of the conditions match
  return "cursor-default";
};
export default defineCursorShape;
