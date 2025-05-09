import { RefObject, useEffect, useState } from "react";

const useHandleMenuHeight = (
  visibility: boolean,
  ref: RefObject<HTMLDivElement | null>,
) => {
  const [menuHeight, setMenuHeight] = useState(0);
  useEffect(() => {
    if (visibility) {
      setMenuHeight(ref?.current?.clientHeight || 0);
    }
  }, [visibility]);
  return menuHeight;
};
export default useHandleMenuHeight;
