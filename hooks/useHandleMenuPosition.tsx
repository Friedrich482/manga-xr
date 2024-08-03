import { MenuPosition } from "@/zod-schema/schema";
import { useEffect, useState } from "react";

const useHandleMenuPosition = (buttonPosition: number) => {
  // define the position of the menu depending of the proximity of the screen boundaries
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(
    "bottom of the button",
  );

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    setMenuPosition(
      buttonPosition > viewportHeight / 2
        ? "top of the button"
        : "bottom of the button",
    );
  }, [buttonPosition]);
  return menuPosition;
};
export default useHandleMenuPosition;
