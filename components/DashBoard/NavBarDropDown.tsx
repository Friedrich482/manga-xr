"use client";
import { useRef, useState } from "react";
import DropDownWrapper from "../lib/DropDownWrapper";
import SquaredIconButton from "../lib/SquaredIconButton";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import SquaredIcon from "../lib/SquaredIcon";
import DropDownMenu from "../lib/DropDownMenu";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { dashBoardSubNavLinks } from "@/lib/constants";

const NavBarButton = () => {
  const [linksMenuVisibility, setLinksMenuVisibility] = useState(false);
  const ref = useHandleOutsideClick(
    linksMenuVisibility,
    setLinksMenuVisibility,
  );
  useToggleScroll(linksMenuVisibility);
  return (
    <DropDownWrapper>
      <SquaredIconButton
        onClick={() => {
          setLinksMenuVisibility((prev) => !prev);
        }}
      >
        <SquaredIcon icon={HiOutlineDotsHorizontal} />
      </SquaredIconButton>
      {linksMenuVisibility && (
        <DropDownMenu ref={ref}>
          <ul>
            {dashBoardSubNavLinks.map((link) => (
              <li>{link.name}</li>
            ))}
          </ul>
        </DropDownMenu>
      )}
    </DropDownWrapper>
  );
};
export default NavBarButton;
