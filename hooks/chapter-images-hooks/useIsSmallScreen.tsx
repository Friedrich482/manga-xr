import { useEffect, useState } from "react";
import { WINDOW_DEFAULT_WIDTH } from "@/lib/constants";

const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // This useEffect is unnecessary here but it is used to avoid hydration errors
  useEffect(() => {
    setIsSmallScreen(window.innerWidth < WINDOW_DEFAULT_WIDTH);
  }, []);
  return isSmallScreen;
};

export default useIsSmallScreen;
