import { RegisterFormInputName } from "@/zod-schema/schema";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge as tm } from "tailwind-merge";

const EyeIcon = (name: RegisterFormInputName) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const PasswordEyeIcon = showPassword ? FaEye : FaEyeSlash;
  const confirmPasswordEyeIcon = showConfirmPassword ? FaEye : FaEyeSlash;

  const Icon = name === "password" ? PasswordEyeIcon : confirmPasswordEyeIcon;
  return (
    <Icon
      title="Show"
      onClick={() => {
        if (name === "password") {
          setShowPassword((prev) => !prev);
        } else {
          setShowConfirmPassword((prev) => !prev);
        }
      }}
      className={tm(
        "absolute size-5 cursor-pointer self-end",
        name === "password" && "-translate-x-2 translate-y-[8.6rem]",
        name === "confirmPassword" && "-translate-x-2 translate-y-[12.5rem]",
      )}
    />
  );
};
