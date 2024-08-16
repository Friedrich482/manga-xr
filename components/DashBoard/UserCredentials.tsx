import getUser from "@/lib/getUser";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";
import EditCredentialsWrapper from "./EditCredentialsFormWrapper";
import PreviewCredentials from "./PreviewCredentials";

const UserCredentials = async () => {
  const { userId } = await verifySession();
  const user = await getUser(userId);
  if (!user) {
    //  this case is not supposed to happen because we are on the dashboard page so the user is authenticated
    notFound();
  }
  const { username, email, avatarHueValue, avatarIconPath } = user;

  return (
    <>
      <PreviewCredentials
        username={username}
        email={email}
        avatarHueValue={avatarHueValue}
        avatarIconPath={avatarIconPath}
      />
      <EditCredentialsWrapper username={username} email={email} />
    </>
  );
};
export default UserCredentials;
