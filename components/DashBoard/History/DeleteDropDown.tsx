"use client";
import DropDownMenu from "@/components/lib/DropDownMenu";
import DropDownMenuLi from "@/components/lib/DropDownMenuLi";
import SquaredIcon from "@/components/lib/SquaredIcon";
import SquaredIconButton from "@/components/lib/SquaredIconButton";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import deleteMangaFromHistory from "@/actions/historyActions/deleteMangaFromHistory";

const DeleteDropDown = ({ mangaId }: { mangaId: string }) => {
  const [deleteMenuVisibility, setDeleteMenuVisibility] = useState(false);
  const handleClick = () => {
    setDeleteMenuVisibility((prev) => !prev);
  };
  const ref = useHandleOutsideClick(
    deleteMenuVisibility,
    setDeleteMenuVisibility,
  );
  return (
    <>
      <SquaredIconButton
        onClick={handleClick}
        className="absolute right-2 top-2 rounded-full group-hover:scale-110 dark:hover:bg-default-black/90"
      >
        <SquaredIcon
          className="text-primary dark:text-primary"
          icon={SlOptions}
        />
      </SquaredIconButton>
      {deleteMenuVisibility && (
        <DropDownMenu ref={ref} className="bottom-[23.5rem] right-0 w-44">
          <ul className="w-full">
            <DropDownMenuLi
              className="flex gap-x-2"
              onClick={() => {
                deleteMangaFromHistory({ mangaId });
              }}
            >
              <MdDelete className="size-6" />
              Delete
            </DropDownMenuLi>
          </ul>
        </DropDownMenu>
      )}
    </>
  );
};
export default DeleteDropDown;
