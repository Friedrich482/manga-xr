import useStore from "@/hooks/store";

const ProgressBarDirectionOption = () => {
  const { progressBarDirection, setProgressBarDirection } = useStore(
    (state) => ({
      progressBarDirection: state.progressBarDirection,
      setProgressBarDirection: state.setProgressBarDirection,
    }),
  );
  return (
    <li className="w-full">
      <div className="lex mb-2 mt-6 items-center">
        <label htmlFor="progressBarDirection">
          Set progress bar direction:
        </label>
        <div className="mt-1 flex flex-row gap-x-4">
          <div className="flex gap-2">
            <label htmlFor="horizontal">Horizontal</label>
            <input
              type="radio"
              checked={progressBarDirection === "Horizontal"}
              id="horizontal"
              name="direction"
              value="Horizontal"
              className="size-4 self-center accent-orange-500"
              onChange={() => {
                setProgressBarDirection("Horizontal");
              }}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="vertical">Vertical</label>
            <input
              checked={progressBarDirection === "Vertical"}
              type="radio"
              id="vertical"
              name="direction"
              value="Vertical"
              className="size-4 self-center accent-orange-500"
              onChange={() => {
                setProgressBarDirection("Vertical");
              }}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
export default ProgressBarDirectionOption;
