import { metadata } from "@/app/layout";
import LoginForm from "@/components/LoginPage/LoginForm";
import Main from "@/components/lib/Main";
import PrincipalSection from "@/components/lib/PrincipalSection";
import SectionTitle from "@/components/lib/SectionTitle";

const page = () => {
  metadata.title = "Login";

  return (
    <Main className="flex-col justify-between gap-y-6">
      <PrincipalSection>
        <SectionTitle className="w-[min(19rem,90%)]">Login form</SectionTitle>
        <LoginForm />
      </PrincipalSection>
    </Main>
  );
};
export default page;
