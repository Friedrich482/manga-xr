import useStore from "@/hooks/store";

const ProgressBarDirectionOption = () => {
  const { progressBarDirection, setProgressBarDirection } = useStore(
    (state) => ({
      progressBarDirection: state.progressBarDirection,
      setProgressBarDirection: state.setProgressBarDirection,
    }),
  );
  return (
    <li className="mb-5 w-full pb-4">
      <div className="mb-2 mt-6 items-center">
        <label htmlFor="progressBarDirection">
          Set progress bar direction:
        </label>
        <div className="mt-1 flex flex-row gap-x-4">
          <div className="flex gap-2">
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
            <label htmlFor="horizontal">Horizontal</label>
          </div>
          <div className="flex gap-2">
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
            <label htmlFor="vertical">Vertical</label>
          </div>
        </div>
      </div>
    </li>
  );
};
export default ProgressBarDirectionOption;