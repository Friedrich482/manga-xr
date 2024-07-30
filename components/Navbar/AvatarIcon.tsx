import { PartialUser } from "@/hooks/Auth/useUser";
import Image from "next/image";
import AvatarSkeleton from "../Skeleton/AvatarSkeleton";
import Link from "next/link";
import SquaredIcon from "../lib/SquaredIcon";
import { FaUser } from "react-icons/fa";

const AvatarIcon = ({
  user,
  isLoading,
}: {
  user: PartialUser | null | undefined;
  isLoading: boolean;
}) => {
  return user ? (
    <Image
      src={"/assets/avatars/one-piece/op1.svg"}
      alt="avatar"
      width={40}
      height={40}
      className="size-8 cursor-pointer rounded-full hue-rotate-[268deg]"
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
