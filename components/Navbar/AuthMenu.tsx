import Link from "next/link";
import type { AuthMenuProps } from "@/types/navbar-types";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";

const AuthMenu = ({
  authMenuVisibility,
  setAuthMenuVisibility,
}: AuthMenuProps) => {
  const ref = useHandleOutsideClick(authMenuVisibility, setAuthMenuVisibility);
  useToggleScroll(authMenuVisibility);
  const authActions = ["Sign In", "Sign Up"];
  return (
    authMenuVisibility && (
      <div
        ref={ref}
        className="absolute right-6 top-[4.5rem] z-10 w-32 rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black"
      >
        <ul className="flex flex-col items-center justify-center gap-[2px]">
          {authActions.map((action) => (
            <li
              className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg py-1 indent-3 hover:bg-neutral-300 dark:hover:bg-neutral-700"
              key={action}
            >
              <Link href={"/"}>{action}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
export default AuthMenu;
