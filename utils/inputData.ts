import { loginFormInputName, RegisterFormInputName } from "@/zod-schema/schema";

export const registerFormFields: {
  name: RegisterFormInputName;
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
export const loginFormFields: {
  name: loginFormInputName;
  type: string;
  placeholder: string;
}[] = [
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
];
