"use client";
import { useForm } from "react-hook-form";
import Form from "../lib/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import useEyeIcon from "@/hooks/useEyeIcon";
import useToastTheme from "@/hooks/useToastTheme";
import {
  updatePasswordFormSchema,
  UpdatePasswordFormType,
} from "@/zod-schema/schema";
import { updatePasswordFormFields } from "@/lib/constants";
import { Fragment } from "react";
import FormInput from "../lib/FormInput";
import InputParagraphError from "../lib/InputParagraphError";
import SubmitFormButton from "../lib/SubmitFormButton";
import updatePasswordAction from "@/actions/updatePasswordAction";
import toast from "react-hot-toast";

const UpdatePasswordForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<UpdatePasswordFormType>({
    resolver: zodResolver(updatePasswordFormSchema),
  });
  const { EyeIcon, getFieldType } = useEyeIcon();
  const toastOptions = useToastTheme();

  const processUpdatePasswordForm = async (data: UpdatePasswordFormType) => {
    const error = await updatePasswordAction(data);

    if (error) {
      toast.error(error, toastOptions);
      return;
    }
    toast.success("Password updated successfully", toastOptions);
    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit(processUpdatePasswordForm)}
      className="self-start"
    >
      <h2 className="divide-y-2 self-start border-b border-b-red-700 text-2xl font-bold text-red-700">
        Change password
      </h2>
      {updatePasswordFormFields.map((field) => {
        const { name, placeholder, type } = field;
        return (
          <Fragment key={name}>
            <div className="flex w-full">
              <FormInput
                type={getFieldType(name, type)}
                placeholder={placeholder}
                {...register(name)}
              />

              <EyeIcon
                name={name}
                className="flex-shrink-0 -translate-x-7 self-center"
              />
            </div>
            {errors[field.name] && (
              <InputParagraphError>
                {errors[field.name]?.message}
              </InputParagraphError>
            )}
          </Fragment>
        );
      })}
      <SubmitFormButton
        aria-label="update password button"
        disabled={isSubmitting}
        className="w-1/2 self-start"
      >
        {isSubmitting ? "Updating..." : "Update"}
      </SubmitFormButton>
    </Form>
  );
};
export default UpdatePasswordForm;
