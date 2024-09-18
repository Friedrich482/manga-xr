import { useState } from "react";

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

  return { toggleVisibility, getFieldType, visibility };
};

export default useEyeIcon;
