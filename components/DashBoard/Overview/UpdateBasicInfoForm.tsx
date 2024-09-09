"use client";

import { GET_USER_TAG, updateBasicInfoFormFields } from "@/lib/constants";
import {
  UpdateBasicInfoFormType,
  updateBasicInfoFormSchema,
} from "@/zod-schema/schema";
import Form from "@/components/lib/Form";
import FormInput from "@/components/lib/FormInput";
import { Fragment } from "react";
import InputParagraphError from "@/components/lib/InputParagraphError";
import SubmitFormButton from "@/components/lib/SubmitFormButton";
import revalidateTagAction from "@/actions/revalidateTagAction";
import toast from "react-hot-toast";
import updateBasicInfoAction from "@/actions/updateBasicInfoAction";
import { useForm } from "react-hook-form";
import useToastTheme from "@/hooks/useToastTheme";
import { zodResolver } from "@hookform/resolvers/zod";

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
    revalidateTagAction(GET_USER_TAG);
  };
  return (
    <Form onSubmit={handleSubmit(processUpdateForm)} className="self-start">
      <h2 className="divide-y-2 self-start border-b border-b-primary text-2xl font-bold text-primary">
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
