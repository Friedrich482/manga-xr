"use client";
import {
  UpdatePasswordFormType,
  updatePasswordFormSchema,
} from "@/zod-schema/schema";
import EyeIcon from "@/components/lib/EyeIcon";
import Form from "@/components/lib/Form";
import FormInput from "@/components/lib/FormInput";
import { Fragment } from "react";
import { GET_USER_SWR_KEY } from "@/lib/cache-keys/swr";
import InputParagraphError from "@/components/lib/InputParagraphError";
import SubmitFormButton from "@/components/lib/SubmitFormButton";
import toast from "react-hot-toast";
import updatePasswordAction from "@/actions/updatePasswordAction";
import { updatePasswordFormFields } from "@/lib/constants";
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
  const { toggleVisibility, visibility, getFieldType } = useEyeIcon();
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
      {updatePasswordFormFields.map(({ name, placeholder, type }) => (
        <Fragment key={name}>
          <div className="flex w-full">
            <FormInput
              type={getFieldType(name, type)}
              placeholder={placeholder}
              {...register(name)}
            />

            <EyeIcon
              name={name}
              className="shrink-0 -translate-x-7 self-center"
              toggleVisibility={toggleVisibility}
              visibility={visibility}
            />
          </div>
          {errors[name] && (
            <InputParagraphError>{errors[name]?.message}</InputParagraphError>
          )}
        </Fragment>
      ))}
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
