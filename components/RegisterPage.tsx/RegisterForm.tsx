"use client";
import registerFormAction from "@/actions/registerFormAction";
import {
  registerFormInputName,
  registerFormSchema,
  registerFormType,
} from "@/zod-schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const formFields: {
  name: registerFormInputName;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
  },
];
const RegisterForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    setFocus,
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

  const processForm = async (data: registerFormType) => {
    const error = await registerFormAction(data);
    if (error) {
      if (typeof error === "string") {
        toast.error(error, toastOptions);
      } else if (typeof error === "object") {
        toast.error(error.message, toastOptions);
        setFocus(error.name as registerFormInputName);
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
      {formFields.map((field) => {
        const { name, placeholder, type } = field;
        return (
          <Fragment key={name}>
            <input
              type={type}
              placeholder={placeholder}
              required
              {...register(name)}
              className="h-10 w-full rounded-md border border-neutral-800/50 py-1 pl-4 text-black placeholder:text-neutral-400 focus:border-neutral-800 focus:outline-none dark:border-neutral-600/50 dark:text-white dark:focus:border-neutral-300"
            />
            {errors[field.name] && (
              <p className="text-red-600">{errors[field.name]?.message}</p>
            )}
          </Fragment>
        );
      })}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-label="register button"
        className="h-10 min-w-36 place-self-center rounded-lg border border-neutral-800/50 bg-neutral-950 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-neutral-950/65 dark:bg-neutral-100 dark:text-black dark:hover:bg-white/80 disabled:dark:bg-neutral-100/65"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};
export default RegisterForm;
