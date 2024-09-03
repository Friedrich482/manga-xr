import { MdClose } from "react-icons/md";
import SquaredIcon from "./SquaredIcon";
import SquaredIconButton from "./SquaredIconButton";
import { twMerge as tm } from "tailwind-merge";

const CloseButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <SquaredIconButton
      className={tm("place-self-end dark:hover:bg-opacity-75", className)}
      title="Close"
      aria-label="Close"
      {...props}
    >
      <SquaredIcon
        icon={MdClose}
        className="flex size-full items-center justify-center"
      />
    </SquaredIconButton>
  );
};
export default CloseButton;
