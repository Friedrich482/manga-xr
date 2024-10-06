import GapOptionDropDown from "./GapOptionDropDown";
import OptionInputLabel from "@/components/lib/OptionInputLabel";
import OptionLi from "@/components/lib/OptionLi";
import useStore from "@/hooks/zustand/store";

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
