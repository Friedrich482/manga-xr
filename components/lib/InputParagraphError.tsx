import { twMerge as tm } from "tailwind-merge";

const InputParagraphError = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={tm("text-red-600", className)} {...props} />;
};
export default InputParagraphError;
