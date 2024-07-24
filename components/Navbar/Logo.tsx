import Image from "next/image";
import { twMerge as tm } from "tailwind-merge";

const Logo = ({ className }: React.HTMLAttributes<HTMLImageElement>) => {
  return (
    <Image
      className={tm("aspect-square min-w-10 rounded-full", className)}
      src={`/assets/logo.svg`}
      alt={"logo"}
      width={40}
      height={40}
      priority={false}
    />
  );
};
export default Logo;
