import { IconType } from "react-icons";
import { twMerge as tm } from "tailwind-merge";

const SquaredIcon = ({
  icon: Icon,
  className,
  ...props
}: { icon: IconType } & React.SVGAttributes<SVGElement>) => {
  return (
    <Icon
      className={tm("size-6 text-neutral-800 dark:text-neutral-300", className)}
      {...props}
    />
  );
};
export default SquaredIcon;
