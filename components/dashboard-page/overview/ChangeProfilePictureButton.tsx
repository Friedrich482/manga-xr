"use client";
import { GET_USER_SWR_KEY } from "@/lib/cache-keys/swr";
import { IoMdPhotos } from "react-icons/io";
import { Json } from "@uploadthing/shared";
import SquaredIcon from "@/components/lib/SquaredIcon";
import SquaredIconButton from "@/components/lib/SquaredIconButton";
import { UploadButton } from "@/lib/uploadthing";
import { UploadThingError } from "uploadthing/server";
import addUploadedAvatar from "@/actions/updateAvatarUrlAction";
import { twMerge as tm } from "tailwind-merge";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { useState } from "react";
import useToastTheme from "@/hooks/useToastTheme";

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
          await addUploadedAvatar({
            userId: res[0].serverData.uploadedBy,
            url: res[0].url,
            imageKey: res[0].key,
          });
          // useSWR refetch the data to display the new avatar icon
          mutate(GET_USER_SWR_KEY);
          setUploadButtonVisibility(false);
        }}
        onUploadError={(error: UploadThingError<Json>) => {
          toast.error(`ERROR! ${error}`, toastOptions);
          console.error(error.code);
        }}
      />
    </>
  );
};
export default ChangeProfilePictureButton;
