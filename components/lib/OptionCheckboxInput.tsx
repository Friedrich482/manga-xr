import { twMerge as tm } from "tailwind-merge";

const OptionCheckboxInput = ({
  className,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) => {
  return (
    <input
      type="checkbox"
      className={tm("size-6 flex-shrink-0 accent-orange-400", className)}
      {...props}
    />
  );
};
export default OptionCheckboxInput;
