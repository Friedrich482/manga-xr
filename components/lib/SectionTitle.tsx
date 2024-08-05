import { twMerge as tm } from "tailwind-merge";

const SectionTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={tm(
        "w-full transform rounded-md rounded-l-md border-l-8 border-l-red-700 py-1 text-center text-3xl text-neutral-700 shadow-sm shadow-red-700 duration-300 ease-in-out hover:rounded-l-2xl hover:text-default-black hover:shadow-md hover:shadow-red-700 dark:text-neutral-300 dark:hover:text-default-white",
        className,
      )}
      {...props}
    />
  );
};
export default SectionTitle;
