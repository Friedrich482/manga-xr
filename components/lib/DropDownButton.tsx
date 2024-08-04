import { forwardRef } from "react";

const DropDownButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      className="flex w-full items-center justify-between gap-x-1 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500 disabled:cursor-not-allowed disabled:border-neutral-500/50 max-options-menu-breakpoint-2:text-base options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3"
      {...props}
      ref={ref}
    />
  );
});
export default DropDownButton;
