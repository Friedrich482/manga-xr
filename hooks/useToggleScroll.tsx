import { useEffect } from "react";

const useToggleScroll = (visible: boolean) => {
  useEffect(() => {
    const body = document.body;
    visible
      ? (body.style.overflow = "hidden")
      : (body.style.overflow = "scroll");
  }, [visible]);
};
export default useToggleScroll;
