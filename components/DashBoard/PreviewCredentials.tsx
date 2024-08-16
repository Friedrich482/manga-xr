import Image from "next/image";

const PreviewCredentials = ({
  username,
  email,
  avatarIconPath,
  avatarHueValue,
}: {
  username: string;
  email: string;
  avatarIconPath: string;
  avatarHueValue: number;
}) => {
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
  return (
    <div className="flex min-h-48 w-[max(80%,16rem)] flex-wrap justify-between gap-4 place-self-start">
      <div className="flex flex-col gap-4">
        {usernameAndEmail.map((element) => {
          const { title, value } = element;
          return (
            <p key={title}>
              <span className="text-red-700">{title}:</span>{" "}
              <span className="break-all">{value}</span>
            </p>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-red-700">Profile image:</p>
        <Image
          src={avatarIconPath}
          width={100}
          height={100}
          alt="avatar image"
          className="size-56 flex-shrink-0 rounded-full"
          style={{
            filter: `hue-rotate(${avatarHueValue}deg)`,
          }}
        />
      </div>
    </div>
  );
};
export default PreviewCredentials;
