import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction } from "react";
import { gapOptions } from "./GapOptionDropDown";
import useStore from "@/hooks/store";

const GapsMenu = ({
  gapOptionDropDownVisibility,
  setGapOptionDropDownVisibility,
}: {
  gapOptionDropDownVisibility: boolean;
  setGapOptionDropDownVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useHandleOutsideClick(
    gapOptionDropDownVisibility,
    setGapOptionDropDownVisibility,
  );
  useToggleScroll(gapOptionDropDownVisibility);
  const { setGapOption } = useStore((state) => ({
    setGapOption: state.setGapOption,
  }));
  return (
    gapOptionDropDownVisibility && (
      <div className="h-0">
        <div
          ref={ref}
          className="relative top-2 flex items-center justify-start rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black"
        >
          <ul className="flex w-full flex-col items-center justify-start gap-[2px]">
            {gapOptions.map((option) => {
              const { name, value } = option;
              return (
                <li
                  onClick={() => {
                    setGapOption({ name: name, value: value });
                  }}
                  key={name}
                  className="flex w-full cursor-pointer items-center justify-start rounded-lg py-1 pl-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
};
export default GapsMenu;
