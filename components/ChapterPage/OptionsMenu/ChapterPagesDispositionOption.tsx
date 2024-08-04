import OptionInputLabel from "@/components/lib/OptionInputLabel";
import OptionInputTitle from "@/components/lib/OptionInputTitle";
import OptionInputWrapper from "@/components/lib/OptionInputWrapper";
import OptionLi from "@/components/lib/OptionLi";
import OptionRadioInput from "@/components/lib/OptionRadioInput";
import OptionsWrapper from "@/components/lib/OptionsWrapper";
import useStore from "@/hooks/store";
import { pagesDispositions } from "@/lib/constants";
const ChapterPagesDispositionOption = () => {
  const { chapterPagesDisposition, setChapterPagesDisposition } = useStore(
    (state) => ({
      chapterPagesDisposition: state.chapterPagesDisposition,
      setChapterPagesDisposition: state.setChapterPagesDisposition,
    }),
  );
  return (
    <OptionLi>
      <OptionInputTitle>Chapter pages disposition:</OptionInputTitle>
      <OptionsWrapper>
        {pagesDispositions.map((pageDisposition) => {
          const { content, id, value } = pageDisposition;
          return (
            <OptionInputWrapper key={content}>
              <OptionRadioInput
                checked={chapterPagesDisposition === content}
                id={id}
                name="pages-direction"
                value={value}
                onChange={() => {
                  setChapterPagesDisposition(content);
                }}
              />
              <OptionInputLabel htmlFor={id}>{content}</OptionInputLabel>
            </OptionInputWrapper>
          );
        })}
      </OptionsWrapper>
    </OptionLi>
  );
};
export default ChapterPagesDispositionOption;
