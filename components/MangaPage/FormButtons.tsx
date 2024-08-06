import { useFormStatus } from "react-dom";
import { Dispatch, SetStateAction } from "react";
import SubmitFormButton from "../lib/SubmitFormButton";
import CloseButton from "../lib/CloseButton";

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
    <div className="flex gap-2">
      {/* Submit button here */}
      <SubmitFormButton
        disabled={pending}
        aria-label="search chapter button"
        className=""
      >
        Search
      </SubmitFormButton>
      {finalData !== "" ? (
        // cancel search button
        <CloseButton
          title="Cancel search"
          className="rounded-full"
          onClick={() => {
            setFinalData("");
            setChapterToSearch("");
          }}
          disabled={pending}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default FormButtons;
