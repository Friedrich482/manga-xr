import { useEffect, useState } from "react";

const useHandleMenuPosition = (buttonPosition: number) => {
  // define the position of the menu depending of the proximity of the screen boundaries
  type position = "top of the button" | "bottom of the button";
  const [menuPosition, setMenuPosition] = useState<position | null>(
    "bottom of the button",
  );
  const viewportHeight = window.innerHeight;

  useEffect(() => {
    setMenuPosition(
      buttonPosition > viewportHeight / 2
        ? "top of the button"
        : "bottom of the button",
    );
  }, [buttonPosition]);
  return menuPosition;
};
export default useHandleMenuPosition;
