"use client";
import { loginFormFields } from "@/utils/inputData";
import Form from "../lib/Form";
import { Fragment } from "react";
import FormInput from "../lib/FormInput";
import useEyeIcon from "@/hooks/useEyeIcon";
import SubmitFormButton from "../lib/SubmitFormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, loginFormType } from "@/zod-schema/schema";
import InputParagraphError from "../lib/InputParagraphError";
import loginFormAction from "@/actions/loginFormAction";
import toast from "react-hot-toast";
import useToastTheme from "@/hooks/useToastTheme";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    reset,
    setError,
    setFocus,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormType>({ resolver: zodResolver(loginFormSchema) });
  const router = useRouter();
  const { EyeIcon, getFieldType } = useEyeIcon();
  const toastOptions = useToastTheme();
  const processLoginForm = async (data: loginFormType) => {
    const error = await loginFormAction(data);
    if (error) {
      if (typeof error === "string") {
        toast.error(error, toastOptions);
      } else if (typeof error === "object") {
        if (error.message === "User not found") {
          setError("username", { type: "manual", message: error.message });
        } else if (error.message === "Incorrect password") {
          setError("password", { type: "manual", message: error.message });
        }
      }
      return;
    }
    reset();
    router.push("/");
  };
  return (
    <Form onSubmit={handleSubmit(processLoginForm)}>
      {loginFormFields.map((field) => {
        const { name, placeholder, type } = field;
        return (
          <Fragment key={name}>
            <div className="flex w-full">
              <FormInput
                placeholder={placeholder}
                type={getFieldType(name, type)}
                className="flex-shrink-0"
                {...register(name)}
              />
              {name === "password" && (
                <EyeIcon
                  name={name}
                  className=" flex-shrink-0 -translate-x-7 self-center"
                />
              )}
            </div>
            {errors[name] && (
              <InputParagraphError>{errors[name].message}</InputParagraphError>
            )}
          </Fragment>
        );
      })}
      <SubmitFormButton aria-label="login button">
        {isSubmitting ? "Logging in..." : "Login"}
      </SubmitFormButton>
      <p className="text-start">
        Don't have an account ?{" "}
        <Link href="/register" className="underline hover:text-orange-400">
          Sign up
        </Link>
      </p>
    </Form>
  );
};
export default LoginForm;