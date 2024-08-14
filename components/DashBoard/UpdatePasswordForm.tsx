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

  return <Form>UpdatePasswordForm</Form>;
};
export default UpdatePasswordForm;
