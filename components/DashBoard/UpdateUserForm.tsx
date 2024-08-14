"use client";
import { updateUserFormFields } from "@/lib/constants";
import Form from "../lib/Form";
import FormInput from "../lib/FormInput";
import { Fragment } from "react";
import useEyeIcon from "@/hooks/useEyeIcon";
import { twMerge as tm } from "tailwind-merge";
import SubmitFormButton from "../lib/SubmitFormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserFormType, updateUSerFormSchema } from "@/zod-schema/schema";
import useToastTheme from "@/hooks/useToastTheme";
import InputParagraphError from "../lib/InputParagraphError";
import updateuserAction from "@/actions/updateuserAction";
import toast from "react-hot-toast";

const UpdateUserForm = ({ formVisibility }: { formVisibility: boolean }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<UpdateUserFormType>({
    resolver: zodResolver(updateUSerFormSchema),
  });
  const { EyeIcon, getFieldType } = useEyeIcon();
  const toastOptions = useToastTheme();
  const processUpdateForm = async (data: UpdateUserFormType) => {
    const error = await updateuserAction(data);
    if (error) {
      toast.error(error, toastOptions);
      return;
    }
    toast.success(
      "Your informations have successfully been updated",
      toastOptions,
    );
    reset();
    location.reload();
  };
  return (
    formVisibility && (
      <Form
        className="w-[min(24rem, 100%)] self-start"
        onSubmit={handleSubmit(processUpdateForm)}
      >
        {updateUserFormFields.map((field) => {
          const { name, placeholder, type } = field;
          return (
            <Fragment key={name}>
              <div className="flex w-full">
                <FormInput
                  type={getFieldType(name, type)}
                  required={false}
                  placeholder={`${type === "password" && name === "password" ? "new" : ""} ${placeholder}`}
                  className="flex-shrink-0"
                  {...register(name)}
                />
                {(name === "password" || name === "confirmPassword") && (
                  <EyeIcon
                    name={name}
                    className={tm(
                      "flex-shrink-0 -translate-x-7 self-center",
                      name === "password" && "",
                      name === "confirmPassword" && "",
                    )}
                  />
                )}
              </div>
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
export default UpdateUserForm;
