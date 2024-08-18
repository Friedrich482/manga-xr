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
        "accent-primary size-4 self-center transition duration-300 ease-in-out",
        className,
        disabled && "cursor-not-allowed text-neutral-500/50",
      )}
      disabled={disabled}
    />
  );
};
export default OptionRadioInput;
