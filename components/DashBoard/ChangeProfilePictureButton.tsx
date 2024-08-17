"use client";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import { IoMdPhotos } from "react-icons/io";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import toast from "react-hot-toast";
import useToastTheme from "@/hooks/useToastTheme";

const ChangeProfilePictureButton = () => {
  const [uploadButtonVisibility, setUploadButtonVisibility] = useState(false);
  const handleClick = () => {
    setUploadButtonVisibility((prev) => !prev);
  };
  const toastOptions = useToastTheme();
  return (
    <>
      <SquaredIconButton
        onClick={handleClick}
        className="absolute left-[15%] top-[90%]"
        title="Change profile image"
      >
        {/*hover:bg-transparent dark:hover:bg-transparent  */}
        <SquaredIcon icon={IoMdPhotos} />
      </SquaredIconButton>
      {uploadButtonVisibility && (
        <UploadButton
          className="ut-button:flex ut-button:dark:hover:bg-white/80 ut-button:items-center ut-button:justify-center ut-button:place-self-center ut-button:rounded-lg ut-button:border ut-button:border-neutral-800/50 ut-button:bg-neutral-950 ut-button:text-white ut-button:disabled:cursor-not-allowed ut-button:focus-within:ring-offset-0 ut-button:focus-within:ring-transparent ut-button:disabled:bg-neutral-950/65 ut-button:dark:bg-neutral-100 ut-button:dark:text-black ut-button:dark:ut-button:border-neutral-100 ut-button:dark:disabled:bg-neutral-100/65 ut-button:ut-uploading:after:bg-red-700 ut-button:ut-readying:dark:bg-neutral-100/65 ut-button:ut-readying:disabled:bg-neutral-950/65 absolute left-[20%] top-[110%]"
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            console.log("Files: ", res);
            toast.success("Upload Completed", toastOptions);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setUploadButtonVisibility(false);
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`, toastOptions);
          }}
        />
      )}
    </>
  );
};
export default ChangeProfilePictureButton;
