import BasicButton from "./BasicButton";
import { twMerge as tm } from "tailwind-merge";

const SubmitFormButton = ({
  className,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">) => {
  return (
    <BasicButton type="submit" {...props} className={tm("w-full", className)} />
  );
};
export default SubmitFormButton;
