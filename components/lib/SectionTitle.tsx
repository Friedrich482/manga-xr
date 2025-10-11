import { twMerge as tm } from "tailwind-merge";

const SectionTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={tm(
        "border-l-primary shadow-primary hover:shadow-primary hover:text-default-black dark:hover:text-default-white w-full transform rounded-md rounded-l-md border-l-8 py-1 text-center text-3xl text-neutral-700 shadow-xs duration-300 ease-in-out hover:rounded-l-2xl hover:shadow-md dark:text-neutral-300",
        className,
      )}
      {...props}
    />
  );
};
export default SectionTitle;
