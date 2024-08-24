"use client";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import { IoMdPhotos } from "react-icons/io";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import toast from "react-hot-toast";
import useToastTheme from "@/hooks/useToastTheme";
import addUploadedAvatar from "@/actions/updateAvatarUrlAction";
import { useSWRConfig } from "swr";
import { GET_USER_SWR_KEY } from "@/lib/constants";
import { UploadThingError } from "uploadthing/server";
import { Json } from "@uploadthing/shared";
import { twMerge as tm } from "tailwind-merge";

const ChangeProfilePictureButton = () => {
  const [uploadButtonVisibility, setUploadButtonVisibility] = useState(false);
  const { mutate } = useSWRConfig();
  const handleClick = () => {
    setUploadButtonVisibility((prev) => !prev);
  };
  const toastOptions = useToastTheme();
  return (
    <>
      <SquaredIconButton
        onClick={handleClick}
        className="absolute left-[15%] top-[62%]"
        title="Change profile image"
      >
        <SquaredIcon icon={IoMdPhotos} />
      </SquaredIconButton>
      <UploadButton
        className={tm(
          "invisible absolute left-[20%] top-[75%] ut-button:flex ut-button:items-center ut-button:justify-center ut-button:place-self-center ut-button:rounded-lg ut-button:border ut-button:border-neutral-800/50 ut-button:bg-neutral-950 ut-button:text-white ut-button:focus-within:ring-transparent ut-button:focus-within:ring-offset-0 ut-button:disabled:cursor-not-allowed ut-button:disabled:bg-neutral-950/65 ut-button:ut-readying:disabled:bg-neutral-950/65 ut-button:ut-uploading:after:bg-primary ut-button:dark:ut-button:border-neutral-100 ut-button:dark:bg-neutral-100 ut-button:dark:text-black ut-button:dark:hover:bg-white/80 ut-button:dark:disabled:bg-neutral-100/65 ut-button:ut-readying:dark:bg-neutral-100/65",
          uploadButtonVisibility && "visible",
        )}
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          toast.success("Profile image updated", toastOptions);
          await addUploadedAvatar(
            res[0].serverData.uploadedBy,
            res[0].url,
            res[0].key,
          );
          // useSWR refetch the data to display the new avatar icon
          mutate(GET_USER_SWR_KEY);
          setUploadButtonVisibility(false);
        }}
        onUploadError={(error: UploadThingError<Json>) => {
          toast.error(`ERROR! ${error}`, toastOptions);
          console.log(error.code);
        }}
      />
    </>
  );
};
export default ChangeProfilePictureButton;
