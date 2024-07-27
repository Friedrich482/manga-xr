import { twMerge as tm } from "tailwind-merge";

const SquaredIconButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={tm(
        "rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700",
        className,
      )}
      {...props}
    />
  );
};
export default SquaredIconButton;
