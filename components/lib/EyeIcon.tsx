import { FaEye, FaEyeSlash } from "react-icons/fa";
import React from "react";
import { twMerge as tm } from "tailwind-merge";
const EyeIcon = ({
  name,
  visibility,
  className,
  toggleVisibility,
  role,
}: React.HTMLAttributes<SVGSVGElement> & {
  name: string;
  visibility: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  toggleVisibility: (name: string) => void;
}) => {
  const IconComponent = visibility[name] ? FaEye : FaEyeSlash;
  return (
    <IconComponent
      role={role}
      title={visibility[name] ? "Hide" : "Show"}
      onClick={() => toggleVisibility(name)}
      className={tm("size-5 cursor-pointer", className)}
    />
  );
};

export default EyeIcon;
