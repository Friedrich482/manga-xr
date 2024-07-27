import RegisterForm from "@/components/RegisterPage.tsx/RegisterForm";
import { metadata } from "../layout";

const page = () => {
  metadata.title = "Register";
  return (
    <main className="flex min-h-lvh w-11/12 flex-col items-center justify-center gap-5 self-center">
      <h2 className="mb-4 mt-12 w-full text-center text-4xl">Register form</h2>
      <RegisterForm />
    </main>
  );
};
export default page;
