import { Suspense } from "react";
import Main from "../lib/Main";
import PrincipalSection from "../lib/PrincipalSection";
import SectionTitle from "../lib/SectionTitle";
import UserCredentials from "./UserCredentials";

const AboutMeSection = () => {
  return (
    <Main className="pt-8">
      <PrincipalSection className="w-full flex-col justify-start">
        <SectionTitle className="w-5/6 place-self-start">About me</SectionTitle>
        <Suspense fallback={<div>Loading...</div>}>
          <UserCredentials />
        </Suspense>
      </PrincipalSection>
    </Main>
  );
};
export default AboutMeSection;
