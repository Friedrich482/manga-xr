import { Dispatch, SetStateAction, useCallback } from "react";
import { useEffect, useRef } from "react";
const useHandleOutsideClick = (
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>,
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOutSideClick = useCallback(
    (event: Event) => {
      if (!ref.current?.contains(event.target as Node) && visible) {
        setVisible(false);
      }
    },
    [visible, setVisible],
  );
  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);

    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, [ref, visible, setVisible]);

  return ref;
};
export default useHandleOutsideClick;
