import { useFormStatus } from "react-dom";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const LargeSubmitFormButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="relative left-1 h-6 w-1/12"
      aria-label="Search button"
    >
      {pending ? (
        <div className="flex size-full items-center justify-center">
          <ClipLoader size={18} color={"#FFF"} />
        </div>
      ) : (
        <FaSearch className="" />
      )}
    </button>
  );
};
export default LargeSubmitFormButton;
