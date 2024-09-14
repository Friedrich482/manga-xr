import { FaBookmark } from "react-icons/fa";
import SquaredIcon from "./SquaredIcon";
import SquaredIconButton from "./SquaredIconButton";
import { twMerge as tm } from "tailwind-merge";

const BookMarkIcon = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <SquaredIconButton
      className={tm(
        "hover:bg-transparent dark:hover:bg-transparent",
        className,
      )}
      {...props}
    >
      <SquaredIcon icon={FaBookmark} fill="rgb(185, 28, 28)" />
    </SquaredIconButton>
  );
};
export default BookMarkIcon;
