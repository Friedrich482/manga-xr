import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";

const useHandleMenuCloseRouteChange = (
  setIsVisible: Dispatch<SetStateAction<boolean>>,
) => {
  const pathName = usePathname();

  useEffect(() => {
    setIsVisible(false);
  }, [pathName]);
};

export default useHandleMenuCloseRouteChange;
