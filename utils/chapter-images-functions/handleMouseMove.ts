import { CursorClass } from "@/zod-schema/schema";
import defineCursorShape from "../defineCursorShape";
import useStore from "@/hooks/zustand/store";

// detects and define the shape of the cursor
const handleMouseMove = (
  e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  images: string[],
  setCursorClass: React.Dispatch<React.SetStateAction<CursorClass>>,
) => {
  const { chapterPagesDisposition, currentPageIndex, readingDirection } =
    useStore.getState();

  const newCursorClass = defineCursorShape(
    e.nativeEvent,
    chapterPagesDisposition,
    currentPageIndex,
    images,
    readingDirection,
  );
  setCursorClass(newCursorClass);
};

export default handleMouseMove;
