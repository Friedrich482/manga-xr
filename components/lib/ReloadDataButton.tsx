"use client";
import BasicButton from "./BasicButton";
import revalidateTagAction from "@/actions/revalidateTagAction";
import toast from "react-hot-toast";
import { useState } from "react";
import useToastTheme from "@/hooks/useToastTheme";

const ReloadDataButton = ({ tag, tags }: { tag?: string; tags?: string[] }) => {
  const toastOptions = useToastTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleRevalidate = async () => {
    setIsLoading(true);
    if (tag) {
      const error = await revalidateTagAction(tag);
      if (error) {
        toast.error(error, toastOptions);
      }
    }
    if (tags) {
      for (const tag of tags) {
        const error = await revalidateTagAction(tag);
        if (error) {
          toast.error(error, toastOptions);
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="flex w-full items-center justify-center">
      <BasicButton onClick={handleRevalidate} disabled={isLoading}>
        Reload
      </BasicButton>
    </div>
  );
};
export default ReloadDataButton;
