import GapOptionDropDown from "./GapOptionDropDown";

const GapOption = () => {
  return (
    <li className="mt-4 flex w-full gap-x-4">
      <label htmlFor="">Page Gap:</label>
      <GapOptionDropDown />
    </li>
  );
};
export default GapOption;
