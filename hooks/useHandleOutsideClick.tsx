import { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
const useHandleOutsideClick = (
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>,
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutSideClick = (event: Event) => {
      if (!ref.current?.contains(event.target as Node) && visible) {
        setVisible(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, visible, setVisible]);

  return ref;
};
export default useHandleOutsideClick;
