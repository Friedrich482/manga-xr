import { BsFire } from "react-icons/bs";
import { twMerge as tm } from "tailwind-merge";

const FireIcon = ({
  className,
  ...props
}: React.SVGAttributes<HTMLOrSVGElement>) => {
  return <BsFire className={tm("text-red-700", className)} {...props} />;
};
export default FireIcon;
