"use client";
import { GET_USER_SWR_KEY, updatePasswordFormFields } from "@/lib/constants";
import {
  UpdatePasswordFormType,
  updatePasswordFormSchema,
} from "@/zod-schema/schema";
import Form from "@/components/lib/Form";
import FormInput from "@/components/lib/FormInput";
import { Fragment } from "react";
import InputParagraphError from "@/components/lib/InputParagraphError";
import SubmitFormButton from "@/components/lib/SubmitFormButton";
import toast from "react-hot-toast";
import updatePasswordAction from "@/actions/updatePasswordAction";
import useEyeIcon from "@/hooks/useEyeIcon";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import useToastTheme from "@/hooks/useToastTheme";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const toastOptions = useToastTheme(5000);
  const { mutate } = useSWRConfig();

  const processUpdatePasswordForm = async (data: UpdatePasswordFormType) => {
    const error = await updatePasswordAction(data);
    mutate(GET_USER_SWR_KEY);

    if (error) {
      toast.error(error, toastOptions);
      return;
    }
    toast.success(
      "Password updated successfully. Please login again",
      toastOptions && { duration: 5000 },
    );
    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit(processUpdatePasswordForm)}
      className="self-start"
    >
      <h2 className="divide-y-2 self-start border-b border-b-primary text-2xl font-bold text-primary">
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
