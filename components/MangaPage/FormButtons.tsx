import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";

const FormButtons = ({
  finalData,
  setFinalData,
  setChapterToSearch,
}: {
  finalData: string;
  setFinalData: Dispatch<SetStateAction<string>>;
  setChapterToSearch: Dispatch<SetStateAction<string>>;
}) => {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-x-1">
      {/* Submit button here */}
      <button
        disabled={pending}
        aria-label="search chapter button"
        type="submit"
        className="rounded-lg border border-neutral-500/50 px-4 py-1 text-neutral-300 hover:text-white active:border-neutral-500 disabled:cursor-not-allowed disabled:text-neutral-500"
      >
        Search
      </button>
      {pending ? (
        <ClipLoader size={32} color="#FFF" className="" />
      ) : (
        <div className="size-10"></div>
      )}

      {finalData !== "" ? (
        // cancel search button
        <button
          className="cursor-pointer text-neutral-400 hover:text-white disabled:cursor-not-allowed disabled:text-neutral-500 hover:disabled:text-neutral-500"
          onClick={() => {
            setFinalData("");
            setChapterToSearch("");
          }}
          disabled={pending}
        >
          <IoIosCloseCircleOutline className="size-10" title="Cancel search" />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FormButtons;
