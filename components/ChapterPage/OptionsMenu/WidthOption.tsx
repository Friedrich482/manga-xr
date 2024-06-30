import useStore from "@/hooks/store";

const WidthOption = () => {
  const {
    width,
    setWidth,
    maxWidth,
    setMaxWidth,
    isResizable,
    setIsResizable,
  } = useStore();

  return (
    <li className="w-full">
      <div className="mb-2 flex items-center">
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
          className="ml-4 size-6 flex-shrink-0 accent-orange-400"
        />
      </div>
      <input
        type="range"
        disabled={!isResizable}
        aria-label="Change width..."
        className="w-5/6 accent-orange-400"
        min={100}
        max={maxWidth}
        value={width}
        onChange={(e) => {
          setWidth(Number(e.target.value));
        }}
      />
      <div className="flex w-11/12 justify-between">
        <span>100</span>
        <span>{maxWidth}</span>
      </div>
    </li>
  );
};
export default WidthOption;
