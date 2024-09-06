import Image from "next/image";
import { PartialUser } from "@/zod-schema/schema";
import getImage from "@/lib/getImage";
import ChangeProfilePictureButton from "./ChangeProfilePictureButton";

const PreviewCredentials = async ({ user }: { user: PartialUser }) => {
  const { username, email, avatarHueValue, avatarIconPath, uploadedAvatarUrl } =
    user;

  const usernameAndEmail = [
    {
      title: "Username",
      value: username,
    },
    {
      title: "Email",
      value: email,
    },
  ];
  const { base64 } = await getImage(uploadedAvatarUrl || avatarIconPath);
  return (
    <div className="flex min-h-48 w-[max(80%,16rem)] flex-wrap justify-between gap-4 place-self-start">
      <div className="flex flex-col gap-4">
        {usernameAndEmail.map((element) => {
          const { title, value } = element;
          return (
            <p key={title}>
              <span className="text-primary">{title}:</span>{" "}
              <span className="break-all">{value}</span>
            </p>
          );
        })}
      </div>
      <div className="relative flex min-h-96 flex-col gap-4">
        <p className="text-primary">Profile image:</p>
        <Image
          src={uploadedAvatarUrl || avatarIconPath}
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={base64}
          alt="avatar image"
          className="size-56 flex-shrink-0 rounded-full"
          priority
          style={
            !uploadedAvatarUrl
              ? {
                  filter: `hue-rotate(${avatarHueValue}deg)`,
                }
              : {}
          }
        />
        <ChangeProfilePictureButton />
      </div>
    </div>
  );
};
export default PreviewCredentials;
