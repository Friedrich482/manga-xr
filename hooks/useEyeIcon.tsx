import { registerFormInputName } from "@/zod-schema/schema";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge as tm } from "tailwind-merge";

const useEyeIcon = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const PasswordEyeIcon = showPassword ? FaEye : FaEyeSlash;
  const confirmPasswordEyeIcon = showConfirmPassword ? FaEye : FaEyeSlash;
  const getFieldType = (name: registerFormInputName, type: string) => {
    if (name === "password") {
      return showPassword ? "text" : "password";
    } else if (name === "confirmPassword") {
      return showConfirmPassword ? "text" : "password";
    }
    return type;
  };
  const iconProps = (name: registerFormInputName) => {
    return {
      title: "Show",
      onClick: () => {
        if (name === "password") {
          setShowPassword((prev) => !prev);
        } else {
          setShowConfirmPassword((prev) => !prev);
        }
      },
      className: tm(
        "absolute size-5 cursor-pointer self-end",
        name === "password" && "-translate-x-2 translate-y-[8.6rem]",
        name === "confirmPassword" && "-translate-x-2 translate-y-[12.5rem]",
      ),
    };
  };
  return { iconProps, PasswordEyeIcon, confirmPasswordEyeIcon, getFieldType };
};
export default useEyeIcon;
