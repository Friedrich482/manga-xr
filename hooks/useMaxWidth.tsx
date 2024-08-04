import { useEffect, useCallback } from "react";
import useStore from "./store";

const useMaxWidth = () => {
  const setMaxWidth = useStore((state) => state.setMaxWidth);

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
};

export default useMaxWidth;
