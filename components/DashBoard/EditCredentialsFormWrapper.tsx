"use client";
import { useState } from "react";
import BasicButton from "../lib/BasicButton";
import UpdateUserForm from "./UpdateUserForm";

const EditCredentialsFormWrapper = () => {
  const [formVisibility, setformVisibility] = useState(false);
  const toggleFormVisibility = () => {
    setformVisibility((prev) => !prev);
  };
  return (
    <>
      <BasicButton className="self-start px-6" onClick={toggleFormVisibility}>
        Edit
      </BasicButton>
      <UpdateUserForm formVisibility={formVisibility} />
    </>
  );
};
export default EditCredentialsFormWrapper;
