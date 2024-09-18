import FormInput from "../lib/FormInput";
import { forwardRef } from "react";
import { twMerge as tm } from "tailwind-merge";

const SearchBarTextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <FormInput
      ref={ref}
      type="text"
      required={false}
      placeholder="Search..."
      name="search-manga"
      className={tm("rounded-r-none", className)}
      {...props}
    />
  );
});
SearchBarTextInput.displayName = "SearchBarTextInput";
export default SearchBarTextInput;
