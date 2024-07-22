import useStore from "@/hooks/store";
import { progressBarDirection } from "@/zod-schema/schema";
import { twMerge as tm } from "tailwind-merge";

const arrayOfPBDirections: {
  content: progressBarDirection;
  id: string;
  value: progressBarDirection;
}[] = [
  { content: "Horizontal", id: "horizontal", value: "Horizontal" },
  { content: "Vertical", id: "vertical", value: "Vertical" },
];
const ProgressBarDirectionOption = () => {
  const {
    progressBarVisibility,
    setProgressBarVisibility,
    progressBarDirection,
    setProgressBarDirection,
  } = useStore((state) => ({
    progressBarDirection: state.progressBarDirection,
    setProgressBarDirection: state.setProgressBarDirection,
    progressBarVisibility: state.progressBarVisibility,
    setProgressBarVisibility: state.setProgressBarVisibility,
  }));
  return (
    <li className="mb-5 mt-6 flex w-full flex-wrap items-center gap-4">
      <div>Progress bar direction:</div>
      <div className="mt-1 flex flex-row flex-wrap gap-4">
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={!progressBarVisibility}
            onChange={() => {
              setProgressBarVisibility(progressBarVisibility);
            }}
            id="PbVisible"
            className="size-6 self-center accent-orange-500"
          />
          <label htmlFor="PbVisible">Hide</label>
        </div>

        {arrayOfPBDirections.map((PBDirection) => {
          const { content, id, value } = PBDirection;
          return (
            <div
              className="flex gap-2 transition duration-300 ease-in-out"
              key={content}
            >
              <input
                type="radio"
                checked={progressBarDirection === content}
                id={id}
                name="direction"
                value={value}
                className="size-4 self-center accent-orange-500 transition duration-300 ease-in-out disabled:cursor-not-allowed"
                onChange={() => {
                  setProgressBarDirection(content);
                }}
                disabled={!progressBarVisibility}
              />
              <label
                htmlFor={id}
                className={tm(
                  "transition duration-300 ease-in-out",
                  !progressBarVisibility &&
                    "cursor-not-allowed text-neutral-500/50",
                )}
              >
                {content}
              </label>
            </div>
          );
        })}
      </div>
    </li>
  );
};
export default ProgressBarDirectionOption;
