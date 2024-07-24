"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { twMerge as tm } from "tailwind-merge";

const CrossKatanaImage = ({
  className,
}: React.HTMLAttributes<HTMLImageElement>) => {
  const { resolvedTheme } = useTheme();
  return (
    <Image
      // don't try to interpolate the resolvedTheme here (like src={`/assets/crossed-katanas-${resolvedTheme}.svg`})
      // because when the component renders on the server, the theme is not defined yet (undefined)
      src={
        resolvedTheme === "light"
          ? `/assets/crossed-katanas-light.svg`
          : `/assets/crossed-katanas-dark.svg`
      }
      alt="crossed-katana"
      width={40}
      height={40}
      className={tm(
        "size-10 self-center max-large-nav:size-[1.5625rem] max-small-nav:size-5",
        className,
      )}
      priority
    />
  );
};
export default CrossKatanaImage;
