import { useCallback, useEffect } from "react";
import useStore from "./zustand/store";

const useMaxWidth = () => {
  const { maxWidth, setMaxWidth } = useStore((state) => ({
    setMaxWidth: state.setMaxWidth,
    maxWidth: state.maxWidth,
  }));

  const handleResize = useCallback(() => {
    setMaxWidth(window.innerWidth);
  }, [setMaxWidth]);

  useEffect(() => {
    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  return maxWidth;
};

export default useMaxWidth;
