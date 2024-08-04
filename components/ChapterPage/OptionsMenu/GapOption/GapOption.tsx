import GapOptionDropDown from "./GapOptionDropDown";
import useStore from "@/hooks/store";
import OptionLi from "@/components/lib/OptionLi";
import OptionInputLabel from "@/components/lib/OptionInputLabel";

const GapOption = () => {
  const { chapterPagesDisposition } = useStore((state) => ({
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  return (
    <OptionLi disabledCondition={chapterPagesDisposition === "Single Page"}>
      <OptionInputLabel
        disabledCondition={chapterPagesDisposition === "Single Page"}
      >
        Page Gap:
      </OptionInputLabel>
      <GapOptionDropDown />
    </OptionLi>
  );
};
export default GapOption;
