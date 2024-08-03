import { MdClose } from "react-icons/md";
import SquaredIcon from "./SquaredIcon";
import SquaredIconButton from "./SquaredIconButton";

const CloseButton = ({
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <SquaredIconButton
      className="place-self-end dark:hover:bg-opacity-75"
      title="Close"
      aria-label="Close"
      onClick={onClick}
    >
      <SquaredIcon icon={MdClose} className="m-auto size-full" />
    </SquaredIconButton>
  );
};
export default CloseButton;
