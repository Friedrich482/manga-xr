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
  width?: number | `${number}`;
  height?: number | `${number}`;
} & React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <Image
      className={tm("h-72 min-h-32 w-52 min-w-32 rounded-lg", className)}
      alt={title}
      src={image}
      width={width || 208}
      height={height || 288}
      priority={true}
      {...props}
    />
  );
};
export default MainImage;
