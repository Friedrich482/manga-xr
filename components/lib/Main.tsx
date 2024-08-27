import { twMerge as tm } from "tailwind-merge";

const Main = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <main
      {...props}
      className={tm(
        "flex min-h-lvh w-11/12 justify-center gap-x-5 gap-y-24",
        className,
      )}
    />
  );
};
export default Main;
