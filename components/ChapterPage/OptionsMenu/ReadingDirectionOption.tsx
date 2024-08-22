import OptionInputLabel from "@/components/lib/OptionInputLabel";
import OptionInputTitle from "@/components/lib/OptionInputTitle";
import OptionInputWrapper from "@/components/lib/OptionInputWrapper";
import OptionLi from "@/components/lib/OptionLi";
import OptionRadioInput from "@/components/lib/OptionRadioInput";
import OptionsWrapper from "@/components/lib/OptionsWrapper";
import useStore from "@/hooks/store";
import useMutateSWRUser from "@/hooks/useMutateSWRUser";
import { arrayOfDirections } from "@/lib/constants";
import handlePreferenceClick from "@/utils/preferences-utils/handlePreferenceClick";
import { readingDirectionValues } from "@/zod-schema/schema";

const ReadingDirectionOption = () => {
  const { chapterPagesDisposition, readingDirection, setReadingDirection } =
    useStore((state) => ({
      chapterPagesDisposition: state.chapterPagesDisposition,
      readingDirection: state.readingDirection,
      setReadingDirection: state.setReadingDirection,
    }));
  const { user, mutate, toastOptions } = useMutateSWRUser();

  return (
    <OptionLi disabledCondition={chapterPagesDisposition === "Long Strip"}>
      <OptionInputTitle
        disabledCondition={chapterPagesDisposition === "Long Strip"}
      >
        Reading Direction:
      </OptionInputTitle>
      <OptionsWrapper>
        {arrayOfDirections.map((direction) => {
          const { content, id, value } = direction;
          return (
            <OptionInputWrapper key={content}>
              <OptionRadioInput
                checked={readingDirection === content}
                id={id}
                name="reading-direction"
                value={value}
                onChange={async () => {
                  await handlePreferenceClick(
                    setReadingDirection,
                    content,
                    user,
                    toastOptions,
                    mutate,
                    "readingDirection",
                    readingDirectionValues,
                  );
                }}
                disabled={chapterPagesDisposition === "Long Strip"}
              />
              <OptionInputLabel
                htmlFor={id}
                disabledCondition={chapterPagesDisposition === "Long Strip"}
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
export default ReadingDirectionOption;
