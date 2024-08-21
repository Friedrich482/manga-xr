import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction } from "react";
import useStore from "@/hooks/store";
import DropDownMenu from "@/components/lib/DropDownMenu";
import DropDownMenuLi from "@/components/lib/DropDownMenuLi";
import { gapOptions, GET_USER_PREFERENCES_SWR_KEY } from "@/lib/constants";
import useUser from "@/hooks/Auth/useUser";
import gapOptionAction from "@/actions/preferencesActions/gapOptionAction";
import toast from "react-hot-toast";
import useToastTheme from "@/hooks/useToastTheme";
import { useSWRConfig } from "swr";

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
  const { user } = useUser();
  const toastOptions = useToastTheme();
  const { mutate } = useSWRConfig();
  return (
    gapOptionDropDownVisibility && (
      <DropDownMenu ref={ref}>
        <ul className="w-full space-y-1">
          {gapOptions.map((option) => {
            const { name, value } = option;
            return (
              <DropDownMenuLi
                onClick={async () => {
                  setGapOption({ name, value });
                  if (user) {
                    const error = await gapOptionAction(name);
                    if (error) {
                      toast.error(error, toastOptions);
                    }
                    mutate(GET_USER_PREFERENCES_SWR_KEY);
                  }
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
