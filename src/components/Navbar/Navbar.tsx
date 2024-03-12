"use client"
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

export default function Navbar() {
  const state = useAppSelector((state) => state.LanguageReducer);
  
  return (
    <nav>
      <ul className="flex items-center gap-[50px]">
        <li>
          <a className="text-white" href="#about">
            {state.language == "de" && "UM"}
            {state.language == "en" && "ABOUT"}
            {state.language == "tj" && "ДАР БОРАИ МО"}
            {state.language == "ru" && "О НАС"}

          </a>
        </li>
        <li>
          <a className="text-white" href="#projects">
            {state.language == "de" && "PROJEKTE"}
            {state.language == "en" && "PROJECTS"}
            {state.language == "tj" && "ЛОИХАХО"}
            {state.language == "ru" && "ПРОЕКТЫ"}
          </a>
        </li>
        <li>
          <a className="text-white" href="#footer">
            {state.language == "de" && "KONTAKTE"}
            {state.language == "en" && "CONTACTS"}
            {state.language == "tj" && "ТАМОС"}
            {state.language == "ru" && "КОНТАКТЫ"}
          </a>
        </li>
      </ul>
    </nav>
  );
}
