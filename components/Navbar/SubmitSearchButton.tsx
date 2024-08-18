import SquaredIcon from "@/components/lib/SquaredIcon";
import SquaredIconButton from "@/components/lib/SquaredIconButton";
import { clipLoaderColor } from "@/lib/constants";
import { useFormStatus } from "react-dom";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { twMerge as tm } from "tailwind-merge";

const SubmitSearchButton = ({
  className,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  return (
    <SquaredIconButton
      disabled={pending}
      type="submit"
      aria-label="Search button"
      className={tm(
        "flex size-10 flex-shrink-0 items-center justify-center self-center rounded-l-none border border-neutral-800/50 dark:border-neutral-600/50",
        className,
      )}
    >
      {pending ? (
        <ClipLoader size={22} color={clipLoaderColor} />
      ) : (
        <SquaredIcon icon={FaSearch} />
      )}
    </SquaredIconButton>
  );
};
export default SubmitSearchButton;
