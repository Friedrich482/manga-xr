import { twMerge as tm } from "tailwind-merge";

const OptionCheckboxInput = ({
  className,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) => {
  return (
    <input
      type="checkbox"
      className={tm("accent-primary size-6 flex-shrink-0", className)}
      {...props}
    />
  );
};
export default OptionCheckboxInput;
