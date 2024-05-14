import { useEffect } from "react";

const useToggleScroll = (visible: boolean) => {
  useEffect(() => {
    const body = document.body;
    visible
      ? (body.style.overflowY = "hidden")
      : (body.style.overflowY = "scroll");
  }, [visible]);
};
export default useToggleScroll;
