"use client";
import MenuBurgerButton from "./MenuBurgerButton";
import VerticalNavList from "./VerticalNavList";
import { useState } from "react";

const VerySmallNavBurger = () => {
  const [verticalNavVisibility, setVerticalNavVisibility] = useState(false);
  return (
    <>
      <VerticalNavList
        verticalNavVisibility={verticalNavVisibility}
        setVerticalNavVisibility={setVerticalNavVisibility}
      />
      <MenuBurgerButton
        verticalNavVisibility={verticalNavVisibility}
        setVerticalNavVisibility={setVerticalNavVisibility}
      />
    </>
  );
};
export default VerySmallNavBurger;
