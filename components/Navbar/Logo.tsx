"use client";
import Image from "next/image";
import { twMerge as tm } from "tailwind-merge";
import useLogoRotation from "@/hooks/useLogoRotation";

const Logo = ({ className }: React.HTMLAttributes<HTMLImageElement>) => {
  const logoRef = useLogoRotation();
  return (
    <Image
      ref={logoRef}
      className={tm("flex aspect-square flex-shrink-0 rounded-full", className)}
      src="/assets/mangekyo.svg"
      alt="logo"
      width={40}
      height={40}
      priority
    />
  );
};
export default Logo;
