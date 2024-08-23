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
  const { username, email } = user;

  return (
    <>
      <PreviewCredentials user={user} />
      <EditCredentialsWrapper username={username} email={email} />
    </>
  );
};
export default UserCredentials;
