import SquaredIcon from "@/components/lib/SquaredIcon";
import SquaredIconButton from "@/components/lib/SquaredIconButton";
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
        "size-10 self-center rounded-l-none border border-neutral-800/50 dark:border-neutral-600/50",
        className,
      )}
    >
      {pending ? (
        <div className="flex size-full items-center justify-center">
          <ClipLoader size={24} color={"#b91c1c"} />
        </div>
      ) : (
        <SquaredIcon icon={FaSearch} />
      )}
    </SquaredIconButton>
  );
};
export default SubmitSearchButton;
