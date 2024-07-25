"use client";
import registerFormAction from "@/actions/registerFormAction";
import { registerFormSchema, registerFormType } from "@/zod-schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const formFields: {
  name: "email" | "username" | "password" | "confirmPassword";
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
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<registerFormType>({ resolver: zodResolver(registerFormSchema) });
  const processForm = async (data: registerFormType) => {
    const error = await registerFormAction(data);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Register successfully");
    reset();
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
              autoComplete="on"
              className="h-10 w-full rounded-md border border-neutral-800/50 py-1 pl-7 placeholder:text-neutral-400 focus:border-neutral-800 focus:outline-none dark:border-neutral-600/50 dark:focus:border-neutral-300"
            />
            {errors[field.name] && (
              <p className="text-red-600">{errors[field.name]?.message}</p>
            )}
          </Fragment>
        );
      })}
      <button
        type="submit"
        className="h-10 min-w-36 place-self-center rounded-lg border border-neutral-800/50 bg-neutral-950 px-4 py-2 disabled:cursor-not-allowed disabled:bg-neutral-950/65 dark:bg-neutral-100 dark:text-black dark:hover:bg-white/80 disabled:dark:bg-neutral-100/65"
      >
        Register
      </button>
    </form>
  );
};
export default RegisterForm;
