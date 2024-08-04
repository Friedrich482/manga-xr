import { twMerge as tm } from "tailwind-merge";

const OptionInputLabel = ({
  disabledCondition,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  disabledCondition?: boolean;
}) => {
  return (
    <label
      {...props}
      className={tm(
        "transition duration-300 ease-in-out",
        className,
        disabledCondition && "cursor-not-allowed text-neutral-500/50",
      )}
    />
  );
};
export default OptionInputLabel;
