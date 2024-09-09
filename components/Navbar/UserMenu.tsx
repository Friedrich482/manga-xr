import { Dispatch, SetStateAction } from "react";
import {
  GET_USER_PREFERENCES_SWR_KEY,
  GET_USER_SWR_KEY,
  HISTORY_LOCALSTORAGE_KEY,
} from "@/lib/constants";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";
import { IoLogInOutline } from "react-icons/io5";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import SquaredIcon from "../lib/SquaredIcon";
import logoutAction from "@/actions/logOutAction";
import toast from "react-hot-toast";
import useHandleMenuCloseRouteChange from "@/hooks/useHandleMenuCloseRouteChange";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import { useSWRConfig } from "swr";
import useToastTheme from "@/hooks/useToastTheme";
import useToggleScroll from "@/hooks/useToggleScroll";

const UserMenu = ({
  userMenuVisibility,
  setUserMenuVisibility,
}: {
  userMenuVisibility: boolean;
  setUserMenuVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useHandleOutsideClick(userMenuVisibility, setUserMenuVisibility);
  useToggleScroll(userMenuVisibility);
  useHandleMenuCloseRouteChange(setUserMenuVisibility);
  const toastOptions = useToastTheme();
  const { mutate } = useSWRConfig();
  const handleLogout = async () => {
    await logoutAction();
    // delete user history from localstorage
    localStorage.removeItem(HISTORY_LOCALSTORAGE_KEY);
    toast.success("Successfully logged out", toastOptions);
    mutate(GET_USER_SWR_KEY);
    mutate(GET_USER_PREFERENCES_SWR_KEY);
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
            <button className="flex size-full gap-2" onClick={handleLogout}>
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
