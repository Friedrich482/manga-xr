import { forwardRef } from "react";
import { twMerge as tm } from "tailwind-merge";

const FormInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, name, ...props }, ref) => {
  return (
    <input
      required
      name={name}
      ref={ref}
      className={tm(
        "h-10 w-full rounded-md border border-neutral-800/50 py-1 pl-4 text-black placeholder:text-neutral-400 focus:border-neutral-800 focus:outline-none dark:border-neutral-600/50 dark:text-white dark:focus:border-neutral-300",
        className,
      )}
      {...props}
    />
  );
});
export default FormInput;
