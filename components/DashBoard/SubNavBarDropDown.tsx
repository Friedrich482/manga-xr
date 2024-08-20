"use client";
import { useState } from "react";
import DropDownWrapper from "../lib/DropDownWrapper";
import SquaredIconButton from "../lib/SquaredIconButton";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";
import SquaredIcon from "../lib/SquaredIcon";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { dashBoardSubNavLinks, MAX_WINDOW_DASHBOARD } from "@/lib/constants";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { twMerge as tm } from "tailwind-merge";
import useDashBoardSearchParams from "@/hooks/useDashBoardSearchParams";
import { DashBoardSubNavLinksSearchParam } from "@/zod-schema/schema";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SubNavBarDropDown = ({
  tab,
  windowWidth,
  linksToDisplay,
}: {
  tab: DashBoardSubNavLinksSearchParam | null;
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
    <DropDownWrapper>
      <SquaredIconButton
        className={tm("hidden", windowWidth < MAX_WINDOW_DASHBOARD && "flex")}
        onClick={() => {
          setLinksMenuVisibility((prev) => !prev);
        }}
      >
        <SquaredIcon icon={HiOutlineDotsHorizontal} />
      </SquaredIconButton>
      {linksMenuVisibility && windowWidth < MAX_WINDOW_DASHBOARD && (
        <DropDownMenu ref={ref} className="right-11">
          <ul className="space-y-1">
            {dashBoardSubNavLinks.slice(linksToDisplay).map((link) => {
              const { name, searchParam } = link;
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
