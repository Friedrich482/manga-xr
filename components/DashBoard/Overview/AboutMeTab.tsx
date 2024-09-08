import SectionTitle from "@/components/lib/SectionTitle";
import { Suspense } from "react";
import UserCredentials from "./UserCredentials";
import UserCredentialsSkeleton from "@/components/Skeleton/UserCredentialsSkeleton";

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
