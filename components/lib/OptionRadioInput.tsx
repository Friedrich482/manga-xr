import { twMerge as tm } from "tailwind-merge";

const OptionRadioInput = ({
  disabled,
  className,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) => {
  return (
    <input
      type="radio"
      {...props}
      className={tm(
        "size-4 self-center accent-orange-500 transition duration-300 ease-in-out",
        className,
        disabled && "cursor-not-allowed text-neutral-500/50",
      )}
      disabled={disabled}
    />
  );
};
export default OptionRadioInput;
