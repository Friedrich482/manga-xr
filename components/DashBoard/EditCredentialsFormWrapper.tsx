"use client";
import { useState } from "react";
import BasicButton from "../lib/BasicButton";
import UpdateBasicInfoForm from "./UpdateBasicInfoForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { twMerge as tm } from "tailwind-merge";

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
    <>
      <BasicButton className="self-start px-6" onClick={toggleFormVisibility}>
        {formVisibility ? "Close" : "Edit"}
      </BasicButton>
      <div
        className={tm(
          "flex min-h-96 w-full flex-wrap items-start justify-between gap-8",
          formVisibility && "hidden",
        )}
      >
        <UpdateBasicInfoForm username={username} email={email} />
        <UpdatePasswordForm />
      </div>
    </>
  );
};
export default EditCredentialsWrapper;
