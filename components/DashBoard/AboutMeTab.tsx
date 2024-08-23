import { Suspense } from "react";
import SectionTitle from "../lib/SectionTitle";
import UserCredentials from "./UserCredentials";
import UserCredentialsSkeleton from "../Skeleton/UserCredentialsSkeleton";

const AboutMeTab = () => {
  return (
    <>
      <SectionTitle className="w-full">About me</SectionTitle>
      <Suspense fallback={<UserCredentialsSkeleton />}>
        <UserCredentials />
      </Suspense>
    </>
  );
};
export default AboutMeTab;
