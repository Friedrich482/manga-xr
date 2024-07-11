import { MutableRefObject, useEffect, useState } from "react";

const useHandleMenuPosition = (
  visibility: boolean,
  ref: MutableRefObject<HTMLDivElement | null>,
) => {
  // define the position of the menu depending of the proximity of the screen boundaries
  type position = "top of the button" | "bottom of the button";
  const [menuPosition, setMenuPosition] = useState<position>(
    "bottom of the button",
  );
  const [rect, setRect] = useState<DOMRect | undefined>(undefined);
  useEffect(() => {
    if (visibility) {
      setRect(ref.current?.getBoundingClientRect());
      if (rect) {
        const viewportHeight = window.innerHeight;
        const position = viewportHeight - rect.top;
        setMenuPosition(
          position > viewportHeight / 2
            ? "bottom of the button"
            : "top of the button",
        );
      }
    }
  }, []);
  useEffect(() => {
    console.log(menuPosition);
  }, []);
  return menuPosition;
};
export default useHandleMenuPosition;
