"use client";
import { GET_USER_SWR_KEY, registerFormFields } from "@/lib/constants";
import {
  Preferences,
  RegisterFormType,
  registerFormSchema,
} from "@/zod-schema/schema";
import Form from "../lib/Form";
import FormInput from "../lib/FormInput";
import { Fragment } from "react";
import InputParagraphError from "../lib/InputParagraphError";
import Link from "next/link";
import SubmitFormButton from "../lib/SubmitFormButton";
import registerFormAction from "@/actions/registerFormAction";
import toast from "react-hot-toast";
import useEyeIcon from "@/hooks/useEyeIcon";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import useStore from "@/hooks/zustand/store";
import useToastTheme from "@/hooks/useToastTheme";
import { zodResolver } from "@hookform/resolvers/zod";
const RegisterForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    setFocus,
    setError,
  } = useForm<RegisterFormType>({ resolver: zodResolver(registerFormSchema) });
  const { EyeIcon, getFieldType } = useEyeIcon();
  const toastOptions = useToastTheme();
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const {
    progressBarVisibility,
    progressBarDirection,
    chapterPagesDisposition,
    readingDirection,
    gapOption: { name: gapOptionName },
  } = useStore((state) => ({
    progressBarVisibility: state.progressBarVisibility,
    progressBarDirection: state.progressBarDirection,
    chapterPagesDisposition: state.chapterPagesDisposition,
    readingDirection: state.readingDirection,
    gapOption: state.gapOption,
  }));

  const processRegisterForm = async (data: RegisterFormType) => {
    const preferences: Preferences = {
      progressBarVisibility,
      progressBarDirection,
      chapterPagesDisposition,
      readingDirection,
      gapOptionName,
    };
    const error = await registerFormAction(data, preferences);
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
    mutate(GET_USER_SWR_KEY);
    router.push("/");
  };
  return (
    <Form onSubmit={handleSubmit(processRegisterForm)}>
      {registerFormFields.map(({ name, placeholder, type }) => (
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
                className="flex-shrink-0 -translate-x-7 self-center"
              />
            )}
          </div>
          {errors[name] && (
            <InputParagraphError>{errors[name]?.message}</InputParagraphError>
          )}
        </Fragment>
      ))}
      <SubmitFormButton aria-label="register button" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </SubmitFormButton>
      <p className="text-start">
        Already registered ?{" "}
        <Link href="/login" className="underline hover:text-primary">
          Login
        </Link>
      </p>
    </Form>
  );
};
export default RegisterForm;
