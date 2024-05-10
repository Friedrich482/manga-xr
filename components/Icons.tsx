import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
const Icons = () => {
  return (
    <div className="flex w-4/12 items-center justify-center gap-1">
      <div className="cursor-pointer rounded-lg p-2 hover:bg-neutral-300">
        <MdDarkMode className="size-6" />
      </div>
      <div className="cursor-pointer rounded-lg p-2 hover:bg-neutral-300">
        <FaUser className="size-6" />
      </div>
    </div>
  );
};
export default Icons;
