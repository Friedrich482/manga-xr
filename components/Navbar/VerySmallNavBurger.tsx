"use client";
import { useState } from "react";
import MenuBurgerButton from "./MenuBurgerButton";
import VerticalNavList from "./VerticalNavList";

const VerySmallNavBurger = () => {
  const [verticalNavVisibility, setVerticalNavVisibility] = useState(false);
  const openVerticalNav = () => {
    setVerticalNavVisibility(true);
  };
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
