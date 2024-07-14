import useStore from "@/hooks/store";
import { progressBarDirection } from "@/zod-schema/schema";

const arrayOfPBDirections: {
  content: progressBarDirection;
  id: string;
  value: progressBarDirection;
}[] = [
  { content: "Horizontal", id: "horizontal", value: "Horizontal" },
  { content: "Vertical", id: "vertical", value: "Vertical" },
];
const ProgressBarDirectionOption = () => {
  const { progressBarDirection, setProgressBarDirection } = useStore(
    (state) => ({
      progressBarDirection: state.progressBarDirection,
      setProgressBarDirection: state.setProgressBarDirection,
    }),
  );
  return (
    <li className="mb-5 mt-6 flex w-full flex-wrap items-center gap-4">
      <div>Progress bar direction:</div>
      <div className="mt-1 flex flex-row flex-wrap gap-x-4">
        {arrayOfPBDirections.map((PBDirection) => {
          const { content, id, value } = PBDirection;
          return (
            <div className="flex gap-2">
              <input
                type="radio"
                checked={progressBarDirection === content}
                id={id}
                name="direction"
                value={value}
                className="size-4 self-center accent-orange-500"
                onChange={() => {
                  setProgressBarDirection(content);
                }}
              />
              <label htmlFor={id}>{content}</label>
            </div>
          );
        })}
      </div>
    </li>
  );
};
export default ProgressBarDirectionOption;
