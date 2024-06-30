import { useEffect, useState } from "react";
const useMaxWidth = () => {
  const [maxWidth, setMaxWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 900,
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMaxWidth(window.innerWidth);
    });
  }, []);
  return maxWidth;
};
export default useMaxWidth;
