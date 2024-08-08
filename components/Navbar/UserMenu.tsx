import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction } from "react";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import SquaredIcon from "../lib/SquaredIcon";
import logoutAction from "@/actions/logOutAction";
import { usePathname, useRouter } from "next/navigation";

const UserMenu = ({
  userMenuVisibility,
  setUserMenuVisibility,
}: {
  userMenuVisibility: boolean;
  setUserMenuVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useHandleOutsideClick(userMenuVisibility, setUserMenuVisibility);
  useToggleScroll(userMenuVisibility);
  const pathName = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await logoutAction();
    location.reload();
  };
  return (
    userMenuVisibility && (
      <DropDownMenu ref={ref} className="right-0 top-12 w-36">
        <ul className="w-full space-y-1">
          {/* Dashboard link */}
          <DropDownMenuLi>
            <Link href="/dashboard" className="flex gap-2">
              <SquaredIcon icon={MdDashboard} /> Dashboard
            </Link>
          </DropDownMenuLi>
          {/* Log out option */}
          <DropDownMenuLi className="flex gap-2">
            <button className="flex gap-2" onClick={handleLogout}>
              <SquaredIcon icon={IoLogInOutline} />
              Log out
            </button>
          </DropDownMenuLi>
        </ul>
      </DropDownMenu>
    )
  );
};
export default UserMenu;
