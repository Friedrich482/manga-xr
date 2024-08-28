import useStore from "@/hooks/store";
import defineCursorShape from "../defineCursorShape";
import { CursorClass } from "@/zod-schema/schema";

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
