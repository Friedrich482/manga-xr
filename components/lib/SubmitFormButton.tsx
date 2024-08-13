import BasicButton from "./BasicButton";

const SubmitFormButton = ({
  className,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">) => {
  return <BasicButton type="submit" {...props} />;
};
export default SubmitFormButton;
