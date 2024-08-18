"use client";
import Form from "../lib/Form";
import { Fragment } from "react";
import FormInput from "../lib/FormInput";
import useEyeIcon from "@/hooks/useEyeIcon";
import SubmitFormButton from "../lib/SubmitFormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormType } from "@/zod-schema/schema";
import loginFormAction from "@/actions/loginFormAction";
import toast from "react-hot-toast";
import useToastTheme from "@/hooks/useToastTheme";
import Link from "next/link";
import { GET_USER_SWR_KEY, loginFormFields } from "@/lib/constants";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import InputParagraphError from "../lib/InputParagraphError";

const LoginForm = () => {
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({ resolver: zodResolver(loginFormSchema) });

  const { EyeIcon, getFieldType } = useEyeIcon();
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
              <InputParagraphError>{errors[name]?.message}</InputParagraphError>
            )}
          </Fragment>
        );
      })}
      <SubmitFormButton disabled={isSubmitting} aria-label="login button">
        {isSubmitting ? "Logging in..." : "Login"}
      </SubmitFormButton>
      <p className="text-start">
        Don't have an account ?{" "}
        <Link href="/register" className="underline hover:text-red-700">
          Sign up
        </Link>
      </p>
    </Form>
  );
};
export default LoginForm;
