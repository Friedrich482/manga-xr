import { twMerge as tm } from "tailwind-merge";
import BasicButton from "./BasicButton";

const SubmitFormButton = ({
  className,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">) => {
  return (
    <BasicButton type="submit" {...props} className={tm("w-full", className)} />
  );
};
export default SubmitFormButton;
