import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge as tm } from "tailwind-merge";
const EyeIcon = ({
  name,
  className,
  visibility,
  toggleVisibility,
}: {
  name: string;
  className?: string;
  visibility: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  toggleVisibility: (name: string) => void;
}) => {
  const IconComponent = visibility[name] ? FaEye : FaEyeSlash;
  return (
    <IconComponent
      title={visibility[name] ? "Hide" : "Show"}
      onClick={() => toggleVisibility(name)}
      className={tm("size-5 cursor-pointer", className)}
    />
  );
};

export default EyeIcon;
