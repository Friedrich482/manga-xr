"use client";
import useLogoRotation from "@/hooks/useLogoRotation";
import Image from "next/image";
import { twMerge as tm } from "tailwind-merge";

const Logo = ({ className }: React.HTMLAttributes<HTMLImageElement>) => {
  const logoRef = useLogoRotation();
  return (
    <Image
      ref={logoRef}
      className={tm("aspect-square rounded-full", className)}
      src="/assets/mangekyo.svg"
      alt="logo"
      width={40}
      height={40}
      priority
    />
  );
};
export default Logo;
