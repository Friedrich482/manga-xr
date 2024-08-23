import getUser from "@/lib/getUser";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";
import EditCredentialsWrapper from "./EditCredentialsFormWrapper";
import PreviewCredentials from "./PreviewCredentials";

const UserCredentials = async () => {
  const { userId } = await verifySession();
  const user = await getUser(userId);
  if (!user) {
    notFound();
  }
  const { username, email, avatarHueValue, avatarIconPath, uploadedAvatarUrl } =
    user;

  return (
    <>
      <PreviewCredentials
        username={username}
        email={email}
        avatarHueValue={avatarHueValue}
        avatarIconPath={avatarIconPath}
        uploadedAvatarUrl={uploadedAvatarUrl}
      />
      <EditCredentialsWrapper username={username} email={email} />
    </>
  );
};
export default UserCredentials;
