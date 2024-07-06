import useStore from "@/hooks/store";

const WidthOption = () => {
  const {
    width,
    setWidth,
    maxWidth,
    setMaxWidth,
    isResizable,
    setIsResizable,
  } = useStore((state) => ({
    width: state.width,
    setWidth: state.setWidth,
    maxWidth: state.maxWidth,
    setMaxWidth: state.setMaxWidth,
    isResizable: state.isResizable,
    setIsResizable: state.setIsResizable,
  }));

  return (
    <li className="mb-2 flex w-full flex-wrap items-center gap-3">
      <label htmlFor="imagesWidth">Change pages width:</label>
      <input
        checked={isResizable}
        onChange={() => {
          setIsResizable(isResizable);
          setWidth((window.innerWidth * 55) / 72); // 55/72 = (5/6)*(11/12) this ratio comes from the relative width of each parent of this input (5/6 from the the `section` element) and (11/12 from the `main` element)
          setMaxWidth(window.innerWidth); // set the maxWidth to the screen width instead of the default 900 hard coded in the store
        }}
        type="checkbox"
        id="imagesWidth"
        className="size-6 flex-shrink-0 accent-orange-400"
      />
      <div className="relative top-3 flex w-2/3 flex-col">
        <input
          type="range"
          disabled={!isResizable}
          aria-label="Change width..."
          className="flex accent-orange-400"
          min={100}
          max={maxWidth}
          value={width}
          onChange={(e) => {
            setWidth(Number(e.target.value));
          }}
        />
        <div className="flex w-full justify-between text-base">
          <span>100</span>
          <span>{maxWidth}</span>
        </div>
      </div>
    </li>
  );
};
export default WidthOption;
