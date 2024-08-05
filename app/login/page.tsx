import LoginForm from "@/components/LoginPage/LoginForm";
import { metadata } from "../layout";
import Main from "@/components/lib/Main";

const page = () => {
  metadata.title = "Login";

  return (
    <Main>
      <h2 className="w-full text-center text-3xl">Login form</h2>
      <LoginForm />
    </Main>
  );
};
export default page;
