import Image from "next/image";
import { twMerge as tm } from "tailwind-merge";

const MainImage = ({
  image,
  title,
  className,
  width,
  height,
  ...props
}: {
  image: string;
  title: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <Image
      className={tm("h-72 min-h-32 w-52 min-w-32 rounded-lg", className)}
      alt={title}
      src={image}
      width={208}
      height={288}
      priority={true}
      {...props}
    />
  );
};
export default MainImage;