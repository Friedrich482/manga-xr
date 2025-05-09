"use client";

import { LoginFormType, loginFormSchema } from "@/zod-schema/schema";
import EyeIcon from "../lib/EyeIcon";
import Form from "../lib/Form";
import FormInput from "../lib/FormInput";
import { Fragment } from "react";
import { GET_USER_SWR_KEY } from "@/lib/cache-keys/swr";
import InputParagraphError from "../lib/InputParagraphError";
import Link from "next/link";
import SubmitFormButton from "../lib/SubmitFormButton";
import loginFormAction from "@/actions/loginFormAction";
import { loginFormFields } from "@/lib/constants";
import toast from "react-hot-toast";
import useEyeIcon from "@/hooks/useEyeIcon";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import useToastTheme from "@/hooks/useToastTheme";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({ resolver: zodResolver(loginFormSchema) });

  const { toggleVisibility, getFieldType, visibility } = useEyeIcon();
  const toastOptions = useToastTheme();

  const { mutate } = useSWRConfig();
  const router = useRouter();

  const processLoginForm = async (data: LoginFormType) => {
    const result = await loginFormAction(data);
    if (result) {
      if (typeof result === "string") {
        if (result.includes("A server error occurred")) {
          toast.error(result, toastOptions);
          return;
        } else {
          toast.success(`Welcome back ${result}`, toastOptions);
        }
      } else if (typeof result === "object") {
        if (result.message === "User not found") {
          setError("username", { type: "manual", message: result.message });
        } else if (result.message === "Incorrect password") {
          setError("password", { type: "manual", message: result.message });
        } else {
          toast.error(result.message, toastOptions);
        }
        return;
      }
    }
    reset();
    mutate(GET_USER_SWR_KEY);
    router.push("/");
  };

  return (
    <Form onSubmit={handleSubmit(processLoginForm)}>
      {loginFormFields.map(({ name, placeholder, type }) => (
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
                className="flex-shrink-0 -translate-x-7 self-center"
                toggleVisibility={toggleVisibility}
                visibility={visibility}
              />
            )}
          </div>
          {errors[name] && (
            <InputParagraphError>{errors[name]?.message}</InputParagraphError>
          )}
        </Fragment>
      ))}
      <SubmitFormButton disabled={isSubmitting} aria-label="login button">
        {isSubmitting ? "Logging in..." : "Login"}
      </SubmitFormButton>
      <p className="text-start">
        Don{"'"}t have an account ?{" "}
        <Link href="/register" className="underline hover:text-primary">
          Sign up
        </Link>
      </p>
    </Form>
  );
};
export default LoginForm;
