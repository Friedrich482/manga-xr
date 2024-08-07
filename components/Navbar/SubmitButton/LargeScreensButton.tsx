import SquaredIcon from "@/components/lib/SquaredIcon";
import SquaredIconButton from "@/components/lib/SquaredIconButton";
import { useFormStatus } from "react-dom";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const LargeSubmitFormButton = () => {
  const { pending } = useFormStatus();
  return (
    <SquaredIconButton
      disabled={pending}
      type="submit"
      aria-label="Search button"
      className="self-center hover:bg-transparent dark:hover:bg-transparent"
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
export default LargeSubmitFormButton;
