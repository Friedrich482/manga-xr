"use client";
import { useState } from "react";
import BasicButton from "../lib/BasicButton";
import UpdateBasicInfoForm from "./UpdateBasicInfoForm";

const EditCredentialsWrapper = ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const [formVisibility, setformVisibility] = useState(false);
  const toggleFormVisibility = () => {
    setformVisibility((prev) => !prev);
  };
  return (
    <>
      <BasicButton className="self-start px-6" onClick={toggleFormVisibility}>
        Edit
      </BasicButton>
      <UpdateBasicInfoForm
        formVisibility={formVisibility}
        username={username}
        email={email}
      />
    </>
  );
};
export default EditCredentialsWrapper;
