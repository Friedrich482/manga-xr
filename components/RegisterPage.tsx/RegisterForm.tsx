"use client";
import registerFormAction from "@/actions/registerFormAction";
import useEyeIcon from "@/hooks/useEyeIcon";
import { registerFormFields } from "@/utils/inputData";
import { registerFormSchema, registerFormType } from "@/zod-schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "../lib/FormInput";
import InputParagraphError from "../lib/InputParagraphError";
import SubmitFormButton from "../lib/SubmitFormButton";
const RegisterForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    setFocus,
    setError,
  } = useForm<registerFormType>({ resolver: zodResolver(registerFormSchema) });
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const toastOptions = {
    style:
      resolvedTheme === "light"
        ? {
            background: "#000000",
            color: "#ffffff",
          }
        : {},
  };
  // eye icons
  const { PasswordEyeIcon, confirmPasswordEyeIcon, getFieldType, iconProps } =
    useEyeIcon();
  const processForm = async (data: registerFormType) => {
    const error = await registerFormAction(data);
    if (error) {
      if (typeof error === "string") {
        toast.error(error, toastOptions);
      } else if (typeof error === "object") {
        if (error.message.includes("email")) {
          setError("email", { type: "manual", message: error.message });
        } else if (error.message.includes("username")) {
          setError("username", { type: "manual", message: error.message });
        }
        setFocus(error.name);
      }
      return;
    }
    toast.success("Registered successfully", toastOptions);
    reset();
    router.push("/");
  };
  return (
    <form
      className="flex w-[min(19rem,90%)] flex-col gap-y-6 self-center"
      onSubmit={handleSubmit(processForm)}
    >
      {registerFormFields.map((field) => {
        const { name, placeholder, type } = field;
        const EyeIcon =
          name === "password" ? PasswordEyeIcon : confirmPasswordEyeIcon;
        return (
          <Fragment key={name}>
            <FormInput
              type={getFieldType(name, type)}
              placeholder={placeholder}
              {...register(name)}
            />
            {(name === "password" || name === "confirmPassword") && (
              <EyeIcon {...iconProps(name)} />
            )}
            {errors[field.name] && (
              <InputParagraphError>
                {errors[field.name]?.message}
              </InputParagraphError>
            )}
          </Fragment>
        );
      })}
      <SubmitFormButton aria-label="register button" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </SubmitFormButton>
    </form>
  );
};
export default RegisterForm;
