"use client";
import Image from "next/image";
import { twMerge as tm } from "tailwind-merge";
import { useTheme } from "next-themes";

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
        "max-large-nav:size-6.25 max-small-nav:size-5 size-10 self-center",
        className,
      )}
      priority
    />
  );
};
export default CrossKatanaImage;
