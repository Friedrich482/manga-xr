import useStore, { progressBarDirection } from "@/hooks/store";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { twMerge as tm } from "tailwind-merge";

const ToggleProgressBarButton = ({
  direction,
}: {
  direction: progressBarDirection;
}) => {
  const { setProgressBarVisibility, progressBarVisibility } = useStore(
    (state) => ({
      setProgressBarVisibility: state.setProgressBarVisibility,
      progressBarVisibility: state.progressBarVisibility,
    }),
  );
  return (
    <button
      onClick={() => {
        setProgressBarVisibility(progressBarVisibility);
      }}
      className={tm(
        "absolute place-self-start text-neutral-500/80 hover:text-neutral-300",
        direction === "Horizontal" && "bottom-8 left-4",
        direction === "Vertical" && "right-5 top-0",
      )}
      aria-label={`${progressBarVisibility ? "Hide" : "Show"} the progress bar`}
      title={`${progressBarVisibility ? "Hide" : "Show"} the progress bar`}
    >
      {progressBarVisibility ? (
        <IoIosCloseCircleOutline className="size-6" />
      ) : (
        <SlOptions className="size-6" />
      )}
    </button>
  );
};
export default ToggleProgressBarButton;
