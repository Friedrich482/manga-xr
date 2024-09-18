import { ClipLoader } from "react-spinners";
import { FaSearch } from "react-icons/fa";
import SquaredIcon from "@/components/lib/SquaredIcon";
import SquaredIconButton from "@/components/lib/SquaredIconButton";
import { clipLoaderColor } from "@/lib/constants";
import { twMerge as tm } from "tailwind-merge";

const SubmitSearchButton = ({
  className,
  isSubmitting,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting: boolean;
}) => {
  return (
    <SquaredIconButton
      type="submit"
      aria-label="Search button"
      className={tm(
        "flex size-10 flex-shrink-0 items-center justify-center self-center rounded-l-none border border-neutral-800/50 dark:border-neutral-600/50",
        className,
      )}
      {...props}
    >
      {isSubmitting ? (
        <ClipLoader size={22} color={clipLoaderColor} />
      ) : (
        <SquaredIcon icon={FaSearch} />
      )}
    </SquaredIconButton>
  );
};
export default SubmitSearchButton;
