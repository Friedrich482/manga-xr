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
        className="rounded-lg border border-neutral-800/50 px-4 py-1 active:border-neutral-800 disabled:cursor-not-allowed disabled:text-neutral-500 dark:border-neutral-500/50 dark:text-neutral-300 dark:hover:text-white dark:active:border-neutral-500"
      >
        Search
      </button>
      {pending ? (
        <ClipLoader
          size={32}
          color="#fb923c"
          className="relative top-1 text-black"
        />
      ) : (
        <div className="size-8 self-center"></div>
      )}

      {finalData !== "" ? (
        // cancel search button
        <button
          className="cursor-pointer text-neutral-600/95  hover:text-black disabled:cursor-not-allowed disabled:text-neutral-500 hover:disabled:text-neutral-500 dark:text-neutral-400 dark:hover:text-white"
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
