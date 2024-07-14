import useStore from "@/hooks/store";
import { progressBarDirection } from "@/zod-schema/schema";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { twMerge as tm } from "tailwind-merge";

const ToggleProgressBarButton = ({
  direction,
}: {
  direction: progressBarDirection;
}) => {
  const { progressBarVisibility, setProgressBarVisibility } = useStore(
    (state) => ({
      progressBarVisibility: state.progressBarVisibility,
      setProgressBarVisibility: state.setProgressBarVisibility,
    }),
  );
  const label = `${progressBarVisibility ? "Hide" : "Show"} the progress bar`;
  return (
    <button
      onClick={() => {
        setProgressBarVisibility(progressBarVisibility);
      }}
      className={tm(
        "place-self-start text-neutral-500/80 hover:text-neutral-300",
        direction === "Horizontal" && "absolute bottom-8 left-4",
        direction === "Vertical" && "absolute -top-8 right-[4.5svw]",
      )}
      aria-label={label}
      title={label}
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
