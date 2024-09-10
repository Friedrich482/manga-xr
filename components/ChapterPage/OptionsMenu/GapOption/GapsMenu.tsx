import { Dispatch, SetStateAction } from "react";
import DropDownMenu from "@/components/lib/DropDownMenu";
import DropDownMenuLi from "@/components/lib/DropDownMenuLi";
import { gapOptionNameValues } from "@/zod-schema/schema";
import { gapOptions } from "@/lib/constants";
import handlePreferenceClick from "@/utils/preferences-utils/handlePreferenceClick";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useMutateSWRUser from "@/hooks/useMutateSWRUser";
import useStore from "@/hooks/zustand/store";
import useToggleScroll from "@/hooks/useToggleScroll";

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
  const { user, mutate, toastOptions } = useMutateSWRUser();

  return (
    gapOptionDropDownVisibility && (
      <DropDownMenu ref={ref}>
        <ul className="w-full space-y-1">
          {gapOptions.map((option) => {
            const { name, value } = option;
            return (
              <DropDownMenuLi
                onClick={async () => {
                  await handlePreferenceClick(
                    setGapOption,
                    { name, value },
                    user,
                    toastOptions,
                    mutate,
                    "gapOptionName",
                    gapOptionNameValues,
                  );
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
