import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const SearchChapterButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        aria-label="search chapter button"
        type="submit"
        className="rounded-lg border border-neutral-500/50 px-4 py-1 text-neutral-300 hover:text-white active:border-neutral-500 disabled:text-neutral-500"
      >
        Search
      </button>
      {pending ? <ClipLoader size={32} color="#FFF" className="ml-2" /> : <></>}
    </>
  );
};
export default SearchChapterButton;
