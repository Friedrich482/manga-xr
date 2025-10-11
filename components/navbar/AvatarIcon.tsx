import AvatarSkeleton from "../skeleton/AvatarSkeleton";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import SquaredIcon from "../lib/SquaredIcon";
import useUser from "@/hooks/auth/useUser";

const AvatarIcon = ({ handleClick }: { handleClick: () => void }) => {
  const { user, isLoading } = useUser();
  if (user) {
    const { avatarIconPath, avatarHueValue, uploadedAvatarUrl } = user;
    return (
      <Image
        src={uploadedAvatarUrl ? uploadedAvatarUrl : avatarIconPath}
        alt="avatar"
        title="profile"
        width={40}
        height={40}
        className="size-8 cursor-pointer rounded-full"
        style={
          uploadedAvatarUrl
            ? undefined
            : { filter: `hue-rotate(${avatarHueValue}deg)` }
        }
        onClick={handleClick}
      />
    );
  }
  if (isLoading) {
    return <AvatarSkeleton />;
  } else {
    return (
      <Link
        href="/login"
        title="Login"
        className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
      >
        <SquaredIcon icon={FaUser} />
      </Link>
    );
  }
};
export default AvatarIcon;
