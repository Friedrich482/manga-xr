"use client";
import BasicButton from "@/components/lib/BasicButton";
import UpdateBasicInfoForm from "./UpdateBasicInfoForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { twMerge as tm } from "tailwind-merge";
import { useState } from "react";

const EditCredentialsWrapper = ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const [formVisibility, setFormVisibility] = useState(false);
  const toggleFormVisibility = () => {
    setFormVisibility((prev) => !prev);
  };
  return (
    <div className="flex w-full flex-col gap-4">
      <BasicButton className="self-start px-6" onClick={toggleFormVisibility}>
        {formVisibility ? "Close" : "Edit"}
      </BasicButton>
      <div
        className={tm(
          "flex min-h-96 w-full flex-row flex-wrap items-start justify-between gap-8",
          !formVisibility && "hidden",
        )}
      >
        <UpdateBasicInfoForm username={username} email={email} />
        <UpdatePasswordForm />
      </div>
    </div>
  );
};
export default EditCredentialsWrapper;
