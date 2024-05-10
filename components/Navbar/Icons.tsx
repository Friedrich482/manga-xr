import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
const Icons = () => {
  return (
    <div className="flex w-4/12 min-w-24 items-center justify-center gap-1">
      <button
        className="rounded-lg p-2 hover:bg-neutral-300"
        aria-label="Toggle dark mode"
      >
        <MdDarkMode className="size-6" />
      </button>
      <button
        className="rounded-lg p-2 hover:bg-neutral-300"
        aria-label="User's profile"
      >
        <FaUser className="size-6" />
      </button>
    </div>
  );
};
export default Icons;
