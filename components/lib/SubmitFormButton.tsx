import { twMerge as tm } from "tailwind-merge";

const SubmitFormButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="submit"
      className={tm(
        "h-10 min-w-36 place-self-center rounded-lg border border-neutral-800/50 bg-neutral-950 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-neutral-950/65 dark:bg-neutral-100 dark:text-black dark:hover:bg-white/80 disabled:dark:bg-neutral-100/65",
        className,
      )}
      {...props}
    />
  );
};
export default SubmitFormButton;