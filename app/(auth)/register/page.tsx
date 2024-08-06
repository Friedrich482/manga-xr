import RegisterForm from "@/components/RegisterPage.tsx/RegisterForm";
import { metadata } from "../../layout";
import Main from "@/components/lib/Main";
import SectionTitle from "@/components/lib/SectionTitle";
import PrincipalSection from "@/components/lib/PrincipalSection";

const page = () => {
  metadata.title = "Register";
  return (
    <Main className="flex-col justify-between gap-y-6">
      <PrincipalSection>
        <SectionTitle className="w-[min(19rem,90%)]">
          Register form
        </SectionTitle>
        <RegisterForm />
      </PrincipalSection>
    </Main>
  );
};
export default page;
