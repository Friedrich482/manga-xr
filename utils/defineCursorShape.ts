import { chapterPagesDisposition } from "@/hooks/store";

const defineCursorShape = (
  e: MouseEvent,
  chapterPagesDisposition: chapterPagesDisposition,
) => {
  const cursorX = e.clientX;
  const cursorY = e.clientY;
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const isUpperHalf = cursorY < viewportHeight / 2;
  const isLowerHalf = cursorY >= viewportHeight / 2;
  const isLeftSide = cursorX < viewportWidth / 2;
  const isRightSide = cursorX >= viewportWidth / 2;

  // const isNearVerticalCenter = Math.abs(cursorX - viewportWidth / 2) <= 200;

  if (chapterPagesDisposition === "Long Strip") {
    return isUpperHalf ? "cursor-up" : "cursor-down";
  } else {
    if (isLeftSide) {
      return "cursor-left";
    } else if (isRightSide) {
      return "cursor-right";
    }
    // Default cursor, if none of the conditions match
    return "cursor-default";
  }
};
export default defineCursorShape;
