import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction } from "react";
import { gapOptions } from "./GapOptionDropDown";
import useStore from "@/hooks/store";
import DropDownMenu from "@/components/lib/DropDownMenu";
import DropDownMenuLi from "@/components/lib/DropDownMenuLi";

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
      <DropDownMenu ref={ref}>
        <ul className="w-full">
          {gapOptions.map((option) => {
            const { name, value } = option;
            return (
              <DropDownMenuLi
                onClick={() => {
                  setGapOption({ name, value });
                }}
                key={name}
              >
                {name}
              </DropDownMenuLi>
            );
          })}
        </ul>
      </DropDownMenu>
    )
  );
};
export default GapsMenu;
