import AvatarIcon from "./AvatarIcon";
import DropDownWrapper from "../lib/DropDownWrapper";
import { useCallback, useState } from "react";
import UserMenu from "./UserMenu";

const AuthDropDown = () => {
  const [userMenuVisibility, setUserMenuVisibility] = useState(false);
  const handleClick = useCallback(() => {
    setUserMenuVisibility((prev) => !prev);
  }, [setUserMenuVisibility]);
  return (
    <DropDownWrapper className="flex w-8 min-w-0">
      <AvatarIcon handleClick={handleClick} />
      <UserMenu
        userMenuVisibility={userMenuVisibility}
        setUserMenuVisibility={setUserMenuVisibility}
      />
    </DropDownWrapper>
  );
};
export default AuthDropDown;
