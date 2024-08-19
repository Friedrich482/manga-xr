import { Suspense } from "react";
import SectionTitle from "../lib/SectionTitle";
import UserCredentials from "./UserCredentials";

const AboutMeTab = () => {
  return (
    <>
      <SectionTitle className="w-full">About me</SectionTitle>
      <Suspense fallback={<div>Loading...</div>}>
        <UserCredentials />
      </Suspense>
    </>
  );
};
export default AboutMeTab;
