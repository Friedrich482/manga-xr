import { twMerge as tm } from "tailwind-merge";

const OptionCheckboxInput = ({
  className,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) => {
  return (
    <input
      type="checkbox"
      className={tm("size-6 flex-shrink-0 accent-red-700", className)}
      {...props}
    />
  );
};
export default OptionCheckboxInput;
