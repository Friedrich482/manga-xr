import getUser from "@/lib/getUser";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";
import EditCredentialsWrapper from "./EditCredentialsFormWrapper";

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
      <p className="w-full">
        <span className="text-red-700">Username:</span> {username}
      </p>
      <p className="w-full">
        <span className="text-red-700">Email:</span> {email}
      </p>
      <EditCredentialsWrapper username={username} email={email} />
    </>
  );
};
export default UserCredentials;
