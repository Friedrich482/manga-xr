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
import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import revalidatePathAction from "@/actions/revalidatePathAction";

const UpdateBasicInfoForm = ({
  formVisibility,
  username,
  email,
}: {
  formVisibility: boolean;
  username: string;
  email: string;
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
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
      "Your informations have successfully been updated",
      toastOptions,
    );
    reset();
    revalidatePathAction("/dashboard");
  };
  return (
    formVisibility && (
      <Form
        className="w-[min(24rem,100%)] self-start"
        onSubmit={handleSubmit(processUpdateForm)}
      >
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
        <SubmitFormButton aria-label="register button">
          {isSubmitting ? "Updating..." : "Update"}
        </SubmitFormButton>
      </Form>
    )
  );
};
export default UpdateBasicInfoForm;