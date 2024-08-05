import { twMerge as tm } from "tailwind-merge";

const PrincipalSection = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      className={tm(
        "flex flex-col items-center justify-center gap-8",
        className,
      )}
      {...props}
    />
  );
};
export default PrincipalSection;
