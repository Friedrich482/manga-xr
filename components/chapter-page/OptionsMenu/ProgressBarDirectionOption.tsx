import OptionCheckboxInput from "@/components/lib/OptionCheckboxInput";
import OptionInputLabel from "@/components/lib/OptionInputLabel";
import OptionInputTitle from "@/components/lib/OptionInputTitle";
import OptionInputWrapper from "@/components/lib/OptionInputWrapper";
import OptionLi from "@/components/lib/OptionLi";
import OptionRadioInput from "@/components/lib/OptionRadioInput";
import OptionsWrapper from "@/components/lib/OptionsWrapper";
import { arrayOfPBDirections } from "@/lib/constants";
import handlePreferenceClick from "@/utils/preferences-utils/handlePreferenceClick";
import { progressBarDirectionValues } from "@/zod-schema/schema";
import { useSWRConfig } from "swr";
import useStore from "@/hooks/zustand/store";
import useToastTheme from "@/hooks/useToastTheme";
import useUser from "@/hooks/Auth/useUser";

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
              await handlePreferenceClick(
                setProgressBarVisibility,
                !progressBarVisibility,
                user,
                toastOptions,
                mutate,
                "progressBarVisibility",
              );
            }}
            id="PbVisible"
          />
          <OptionInputLabel htmlFor="PbVisible">Hide</OptionInputLabel>
        </div>

        {arrayOfPBDirections.map(({ content, id, value }) => (
          <OptionInputWrapper key={content}>
            <OptionRadioInput
              checked={progressBarDirection === content}
              id={id}
              name="direction"
              value={value}
              onChange={async () => {
                await handlePreferenceClick(
                  setProgressBarDirection,
                  content,
                  user,
                  toastOptions,
                  mutate,
                  "progressBarDirection",
                  progressBarDirectionValues,
                );
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
        ))}
      </OptionsWrapper>
    </OptionLi>
  );
};
export default ProgressBarDirectionOption;
