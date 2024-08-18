"use client";
import Form from "../lib/Form";
import FormInput from "../lib/FormInput";
import { Fragment } from "react";
import SubmitFormButton from "../lib/SubmitFormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateBasicInfoFormType,
  updateBasicInfoFormSchema,
} from "@/zod-schema/schema";
import useToastTheme from "@/hooks/useToastTheme";
import InputParagraphError from "../lib/InputParagraphError";
import toast from "react-hot-toast";
import { updateBasicInfoFormFields } from "@/lib/constants";
import updateBasicInfoAction from "@/actions/updateBasicInfoAction";
import revalidateTagAction from "@/actions/revalidateTagAction";

const UpdateBasicInfoForm = ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<UpdateBasicInfoFormType>({
    resolver: zodResolver(updateBasicInfoFormSchema),
  });
  const toastOptions = useToastTheme();
  const processUpdateForm = async (data: UpdateBasicInfoFormType) => {
    const error = await updateBasicInfoAction(data);
    if (error) {
      toast.error(error, toastOptions);
      return;
    }
    toast.success(
      "Your information have successfully been updated",
      toastOptions,
    );
    revalidateTagAction("userCredentials"); // the tag used to cache the user's credentials
  };
  return (
    <Form onSubmit={handleSubmit(processUpdateForm)} className="self-start">
      <h2 className="border-b-primary text-primary divide-y-2 self-start border-b text-2xl font-bold">
        Basic info
      </h2>
      {updateBasicInfoFormFields.map((field) => {
        const { name, placeholder, type } = field;
        return (
          <Fragment key={name}>
            <FormInput
              defaultValue={name === "username" ? username : email}
              type={type}
              placeholder={placeholder}
              {...register(name)}
            />
            {errors[field.name] && (
              <InputParagraphError>
                {errors[field.name]?.message}
              </InputParagraphError>
            )}
          </Fragment>
        );
      })}
      <SubmitFormButton
        aria-label="register button"
        disabled={isSubmitting}
        className="w-1/2 self-start"
      >
        {isSubmitting ? "Updating..." : "Update"}
      </SubmitFormButton>
    </Form>
  );
};
export default UpdateBasicInfoForm;
