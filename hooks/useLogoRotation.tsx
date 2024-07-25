import { useCallback, useEffect, useRef } from "react";

const useLogoRotation = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const coordinates = {
        x: e.clientX,
        y: e.clientY,
      };
      const currentLogo = logoRef.current;
      if (currentLogo) {
        const logoCenterCoordinates = {
          x: currentLogo.offsetLeft + currentLogo.offsetWidth / 2,
          y: currentLogo.offsetTop + currentLogo.offsetHeight / 2,
        };
        const angleInRadians = Math.atan2(
          coordinates.y - logoCenterCoordinates.y,
          coordinates.x - logoCenterCoordinates.x,
        );
        const angleInDegrees = angleInRadians * (180 / Math.PI);

        currentLogo.style.transform = `rotate(${angleInDegrees}deg)`;
      }
    },
    [logoRef],
  );
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseOver);
    return () => document.removeEventListener("mousemove", handleMouseOver);
  }, [handleMouseOver]);

  return logoRef;
};
export default useLogoRotation;
