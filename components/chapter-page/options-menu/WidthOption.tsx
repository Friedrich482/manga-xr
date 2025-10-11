import OptionCheckboxInput from "@/components/lib/OptionCheckboxInput";
import OptionInputLabel from "@/components/lib/OptionInputLabel";
import OptionLi from "@/components/lib/OptionLi";
import { WINDOW_RESIZE_RATIO } from "@/lib/constants";
import useMaxWidth from "@/hooks/useMaxWidth";
import useStore from "@/hooks/zustand/store";

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
  useMaxWidth();

  return (
    <OptionLi className="border-t-0">
      <OptionInputLabel htmlFor="imagesWidth">
        Change pages width:
      </OptionInputLabel>
      <OptionCheckboxInput
        checked={isResizable}
        onChange={() => {
          setIsResizable(isResizable);
          setWidth(window.innerWidth * WINDOW_RESIZE_RATIO);
          setMaxWidth(window.innerWidth); // set the maxWidth to the screen width instead of the default 900 hard coded in the store
        }}
        id="imagesWidth"
      />
      <div className="relative top-3 flex w-2/3 flex-col">
        <input
          type="range"
          disabled={!isResizable}
          aria-label="Change width..."
          className="accent-primary flex"
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
