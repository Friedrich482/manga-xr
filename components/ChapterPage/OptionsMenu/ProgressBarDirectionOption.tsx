import OptionInputTitle from "@/components/lib/OptionInputTitle";
import OptionLi from "@/components/lib/OptionLi";
import useStore from "@/hooks/store";
import {
  arrayOfPBDirections,
  GET_USER_PREFERENCES_SWR_KEY,
} from "@/lib/constants";
import OptionCheckboxInput from "@/components/lib/OptionCheckboxInput";
import OptionInputLabel from "@/components/lib/OptionInputLabel";
import OptionRadioInput from "@/components/lib/OptionRadioInput";
import OptionsWrapper from "@/components/lib/OptionsWrapper";
import OptionInputWrapper from "@/components/lib/OptionInputWrapper";
import useUser from "@/hooks/Auth/useUser";
import useToastTheme from "@/hooks/useToastTheme";
import { useSWRConfig } from "swr";
import progressBarVisibilityAction from "@/actions/preferencesActions/progressBarVisibilityAction";
import toast from "react-hot-toast";

const ProgressBarDirectionOption = () => {
  const {
    progressBarVisibility,
    setProgressBarVisibility,
    progressBarDirection,
    setProgressBarDirection,
  } = useStore((state) => ({
    progressBarDirection: state.progressBarDirection,
    setProgressBarDirection: state.setProgressBarDirection,
    progressBarVisibility: state.progressBarVisibility,
    setProgressBarVisibility: state.setProgressBarVisibility,
  }));

  const { user } = useUser();
  const toastOptions = useToastTheme();
  const { mutate } = useSWRConfig();

  return (
    <OptionLi>
      <OptionInputTitle>Progress bar direction:</OptionInputTitle>
      <OptionsWrapper>
        <div className="flex gap-2">
          <OptionCheckboxInput
            checked={!progressBarVisibility}
            onChange={async () => {
              setProgressBarVisibility(!progressBarVisibility);
              if (user) {
                const error = await progressBarVisibilityAction(
                  !progressBarVisibility,
                );
                if (error) {
                  toast.error(error, toastOptions);
                }
                mutate(GET_USER_PREFERENCES_SWR_KEY);
              }
            }}
            id="PbVisible"
          />
          <OptionInputLabel htmlFor="PbVisible">Hide</OptionInputLabel>
        </div>

        {arrayOfPBDirections.map((PBDirection) => {
          const { content, id, value } = PBDirection;
          return (
            <OptionInputWrapper key={content}>
              <OptionRadioInput
                checked={progressBarDirection === content}
                id={id}
                name="direction"
                value={value}
                onChange={() => {
                  setProgressBarDirection(content);
                }}
                disabled={!progressBarVisibility}
              />
              <OptionInputLabel
                htmlFor={id}
                disabledCondition={!progressBarVisibility}
              >
                {content}
              </OptionInputLabel>
            </OptionInputWrapper>
          );
        })}
      </OptionsWrapper>
    </OptionLi>
  );
};
export default ProgressBarDirectionOption;
