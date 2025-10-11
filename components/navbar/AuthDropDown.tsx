"use client";
import { useCallback, useState } from "react";
import AvatarIcon from "./AvatarIcon";
import DropDownWrapper from "../lib/DropDownWrapper";
import UserMenu from "./UserMenu";

const AuthDropDown = () => {
  const [userMenuVisibility, setUserMenuVisibility] = useState(false);
  const handleClick = useCallback(() => {
    setUserMenuVisibility((prev) => !prev);
  }, [setUserMenuVisibility]);
  return (
    <DropDownWrapper className="min-w-6 shrink-0">
      <AvatarIcon handleClick={handleClick} />
      <UserMenu
        userMenuVisibility={userMenuVisibility}
        setUserMenuVisibility={setUserMenuVisibility}
      />
    </DropDownWrapper>
  );
};
export default AuthDropDown;
