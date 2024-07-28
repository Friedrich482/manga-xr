import LoginForm from "@/components/LoginPage/LoginForm";
import { metadata } from "../layout";

const page = () => {
  metadata.title = "Login";

  return (
    <main className="flex min-h-lvh w-11/12 flex-col items-center justify-center gap-5">
      <h2 className="w-full text-center text-3xl">Login form</h2>
      <LoginForm />
    </main>
  );
};
export default page;
