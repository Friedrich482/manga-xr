import OptionCheckboxInput from "@/components/lib/OptionCheckboxInput";
import OptionInputLabel from "@/components/lib/OptionInputLabel";
import OptionLi from "@/components/lib/OptionLi";
import useStore from "@/hooks/store";
import { windowResizeRatio } from "@/lib/constants";

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
    <OptionLi>
      <OptionInputLabel htmlFor="imagesWidth">
        Change pages width:
      </OptionInputLabel>
      <OptionCheckboxInput
        checked={isResizable}
        onChange={() => {
          setIsResizable(isResizable);
          setWidth(window.innerWidth * windowResizeRatio);
          setMaxWidth(window.innerWidth); // set the maxWidth to the screen width instead of the default 900 hard coded in the store
        }}
        id="imagesWidth"
      />
      <div className="relative top-3 flex w-2/3 flex-col">
        <input
          type="range"
          disabled={!isResizable}
          aria-label="Change width..."
          className="flex accent-red-700"
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
    </OptionLi>
  );
};
export default WidthOption;
