"use client";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import CustomSwitch from "../CustomSwitch/CustomSwitch";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";

import "./Header.css"

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Header() {
  const path = usePathname();
  const menuRef = useRef<any>();

  useEffect(() => {
    console.log(path);
  }, []);

  const handleShowMenu = () => {
    menuRef.current.classList.toggle("active__menu");
    document.body.classList.toggle("hide__scroll");
  }

  return (
    <header
      id="header"
      className="flex items-center justify-between px-28 py-10 bg-[#C30F08]"
    >
      <Logo />
      <div onClick={handleShowMenu} className="menu__burger">
        <div className="menu__line"></div>
        <div className="menu__line"></div>
        <div className="menu__line"></div>
      </div>
      <div ref={menuRef} className="flex items-center gap-[90px] headessr__info">
        <Navbar />
        <CustomSwitch />
      </div>
    </header>
  );
}