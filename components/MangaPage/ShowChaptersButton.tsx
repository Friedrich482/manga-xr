import { Dispatch, SetStateAction } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import SquaredIcon from "../lib/SquaredIcon";

const ShowChaptersButton = ({
  showAllChapters,
  setShowAllChapters,
}: {
  showAllChapters: boolean;
  setShowAllChapters: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => {
        setShowAllChapters((prev) => !prev);
      }}
      className="flex w-full items-center justify-center gap-2 place-self-center rounded-lg border border-transparent px-4 py-1 hover:border-neutral-500 hover:text-primary"
    >
      {showAllChapters ? (
        <>
          Show less <SquaredIcon icon={FaCaretUp} />
        </>
      ) : (
        <>
          Show all chapters <SquaredIcon icon={FaCaretDown} />
        </>
      )}
    </button>
  );
};
export default ShowChaptersButton;
