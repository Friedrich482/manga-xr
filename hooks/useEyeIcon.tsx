import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge as tm } from "tailwind-merge";

const useEyeIcon = () => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  const getFieldType = (name: string, type: string) => {
    if (type === "password") {
      return visibility[name] ? "text" : "password";
    }
    return type;
  };

  const toggleVisibility = (name: string) => {
    setVisibility((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const EyeIcon = ({
    name,
    className,
  }: {
    name: string;
    className?: string;
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
  return { EyeIcon, getFieldType };
};

export default useEyeIcon;
