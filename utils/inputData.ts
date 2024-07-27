import { registerFormInputName } from "@/zod-schema/schema";

export const registerFormFields: {
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
export const loginFormFields = registerFormFields.filter(
  (field) => field.name !== "confirmPassword" && field.name !== "email",
);
