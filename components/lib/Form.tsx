import { twMerge as tm } from "tailwind-merge";

const Form = ({
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      className={tm(
        "flex w-[min(19rem,90%)] flex-col gap-y-6 self-center",
        className,
      )}
      {...props}
    />
  );
};
export default Form;
