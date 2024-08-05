import RegisterForm from "@/components/RegisterPage.tsx/RegisterForm";
import { metadata } from "../layout";
import Main from "@/components/lib/Main";

const page = () => {
  metadata.title = "Register";
  return (
    <Main>
      <h2 className="mb-4 mt-12 w-full text-center text-4xl">Register form</h2>
      <RegisterForm />
    </Main>
  );
};
export default page;
