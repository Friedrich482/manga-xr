"use client";
import registerFormAction from "@/actions/registerFormAction";
import { registerFormFields } from "@/utils/inputData";
import { registerFormSchema, RegisterFormType } from "@/zod-schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import useEyeIcon from "@/hooks/useEyeIcon";
import toast from "react-hot-toast";
import useToastTheme from "@/hooks/useToastTheme";
import FormInput from "../lib/FormInput";
import InputParagraphError from "../lib/InputParagraphError";
import SubmitFormButton from "../lib/SubmitFormButton";
import { twMerge as tm } from "tailwind-merge";
import Form from "../lib/Form";
import Link from "next/link";
const RegisterForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    setFocus,
    setError,
  } = useForm<RegisterFormType>({ resolver: zodResolver(registerFormSchema) });
  const router = useRouter();
  const { EyeIcon, getFieldType } = useEyeIcon();
  const toastOptions = useToastTheme();
  const processRegisterForm = async (data: RegisterFormType) => {
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
    // also reload the page to get the latest data and properly display the user's avatar
    location.reload();
  };
  return (
    <Form onSubmit={handleSubmit(processRegisterForm)}>
      {registerFormFields.map((field) => {
        const { name, placeholder, type } = field;
        return (
          <Fragment key={name}>
            <div className="flex w-full">
              <FormInput
                type={getFieldType(name, type)}
                placeholder={placeholder}
                {...register(name)}
                className="flex-shrink-0"
              />
              {(name === "password" || name === "confirmPassword") && (
                <EyeIcon
                  name={name}
                  className={tm(
                    "flex-shrink-0 -translate-x-7 self-center",
                    name === "password" && "",
                    name === "confirmPassword" && "",
                  )}
                />
              )}
            </div>
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
      <p className="text-start">
        Already registered ?{" "}
        <Link href="/login" className="underline hover:text-orange-400">
          Login
        </Link>
      </p>
    </Form>
  );
};
export default RegisterForm;
