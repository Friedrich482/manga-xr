import useStore from "@/hooks/store";
import defineCursorShape from "../defineCursorShape";

const handleMouseMove = (
  e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  images: string[],
  setCursorClass: React.Dispatch<React.SetStateAction<string>>,
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
