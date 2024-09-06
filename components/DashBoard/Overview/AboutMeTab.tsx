import SectionTitle from "@/components/lib/SectionTitle";
import UserCredentialsSkeleton from "@/components/Skeleton/UserCredentialsSkeleton";
import { Suspense } from "react";
import UserCredentials from "./UserCredentials";

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
