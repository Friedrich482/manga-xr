import { Dispatch, SetStateAction, useEffect } from "react";
import { usePathname } from "next/navigation";

const useHandleMenuCloseRouteChange = (
  setIsVisible: Dispatch<SetStateAction<boolean>>,
) => {
  const pathName = usePathname();

  useEffect(() => {
    setIsVisible(false);
  }, [pathName]);
};

export default useHandleMenuCloseRouteChange;
