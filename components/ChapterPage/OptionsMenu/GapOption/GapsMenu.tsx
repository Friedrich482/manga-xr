import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction } from "react";
import useStore from "@/hooks/store";
import DropDownMenu from "@/components/lib/DropDownMenu";
import DropDownMenuLi from "@/components/lib/DropDownMenuLi";
import { gapOptions } from "@/lib/constants";

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
  const { gapOption, setGapOption } = useStore((state) => ({
    gapOption: state.gapOption,
    setGapOption: state.setGapOption,
  }));
  return (
    gapOptionDropDownVisibility && (
      <DropDownMenu ref={ref}>
        <ul className="w-full space-y-1">
          {gapOptions.map((option) => {
            const { name, value } = option;
            return (
              <DropDownMenuLi
                onClick={() => {
                  setGapOption({ name, value });
                }}
                key={name}
                isActive={name === gapOption.name}
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
