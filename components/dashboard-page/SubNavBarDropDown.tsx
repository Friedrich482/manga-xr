"use client";
import { MAX_WINDOW_DASHBOARD, dashBoardSubNavLinks } from "@/lib/constants";
import { DashBoardSubNavLinksSearchParam } from "@/zod-schema/schema";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";
import DropDownWrapper from "../lib/DropDownWrapper";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import SquaredIcon from "../lib/SquaredIcon";
import SquaredIconButton from "../lib/SquaredIconButton";
import { twMerge as tm } from "tailwind-merge";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useToggleScroll from "@/hooks/useToggleScroll";

const SubNavBarDropDown = ({
  tab,
  windowWidth,
  linksToDisplay,
}: {
  tab: DashBoardSubNavLinksSearchParam;
  windowWidth: number;
  linksToDisplay: number;
}) => {
  const [linksMenuVisibility, setLinksMenuVisibility] = useState(false);
  const ref = useHandleOutsideClick(
    linksMenuVisibility,
    setLinksMenuVisibility,
  );
  const router = useRouter();
  useToggleScroll(linksMenuVisibility);

  return (
    <DropDownWrapper
      className={tm("hidden", windowWidth < MAX_WINDOW_DASHBOARD && "flex")}
    >
      <SquaredIconButton
        className="size-10"
        onClick={() => {
          setLinksMenuVisibility((prev) => !prev);
        }}
      >
        <SquaredIcon icon={HiOutlineDotsHorizontal} />
      </SquaredIconButton>
      {linksMenuVisibility && windowWidth < MAX_WINDOW_DASHBOARD && (
        <DropDownMenu ref={ref} className="right-3 top-10">
          <ul className="space-y-1">
            {dashBoardSubNavLinks
              .slice(linksToDisplay)
              .map(({ name, searchParam }) => {
                const isActive = tab
                  ? searchParam === tab
                  : searchParam === undefined;

                return (
                  <DropDownMenuLi key={name} isActive={isActive}>
                    <Link
                      href={`dashboard${searchParam ? `?tab=${searchParam}` : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(
                          `dashboard${searchParam ? `?tab=${searchParam}` : ""}`,
                        );
                        router.refresh();
                      }}
                      className="flex w-full"
                    >
                      {name}
                    </Link>
                  </DropDownMenuLi>
                );
              })}
          </ul>
        </DropDownMenu>
      )}
    </DropDownWrapper>
  );
};
export default SubNavBarDropDown;
