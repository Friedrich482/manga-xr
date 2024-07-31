import Image from "next/image";
import AvatarSkeleton from "../Skeleton/AvatarSkeleton";
import Link from "next/link";
import SquaredIcon from "../lib/SquaredIcon";
import { FaUser } from "react-icons/fa";
import useUser from "@/hooks/Auth/useUser";

const AvatarIcon = () => {
  const { user, isLoading } = useUser();
  return user ? (
    <Image
      src={user.avatarIconPath}
      alt="avatar"
      width={40}
      height={40}
      className="size-8 cursor-pointer rounded-full"
      style={{
        filter: `hue-rotate(${user.avatarHueValue}deg)`,
      }}
    />
  ) : isLoading ? (
    <AvatarSkeleton />
  ) : (
    <Link
      href="/login"
      title="Login"
      className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
    >
      <SquaredIcon icon={FaUser} />
    </Link>
  );
};
export default AvatarIcon;
