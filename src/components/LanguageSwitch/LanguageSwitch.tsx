"use client";
import { useState } from "react";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/ui/select";

import TajikFlag from "../../../public/icons/tj.svg";
import RussianFlag from "../../../public/icons/ru.svg";
import EnglishFlag from "../../../public/icons/en.svg";
import GermanFlag from "../../../public/icons/de.svg";

import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const [lang, setlang] = useState("en");
  const [active, setActive] = useState("");

  // EN,RU,TJ

  const { t, i18n } = useTranslation();

  // const handleChangeLanguage = (language: string) => {
  //   // console.log("Hello world!");
  //   i18n.changeLanguage(language);
  // };

  // onClick={() => handleChangeLanguage("en")

  const changeLanguage = (value: string) => {
    console.log(value);
    setlang(value);
    i18n.changeLanguage(value);
  };

  return (
    <div className="switch-btn">
      <Select onValueChange={(e) => changeLanguage(e)}>
        <SelectTrigger className="w-[80px] border-none text-white">
          <SelectValue className="text-white" placeholder={lang} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup className="text-black">
            <SelectItem value="RU">
              <div className="flex items-center text-black gap-2">
                <p className="w-16 switch-txt">RU</p>
                <Image src={RussianFlag} alt="Logo" />
              </div>
            </SelectItem>
            <SelectItem value="TJ">
              <div className="flex items-center text-black gap-2">
                <p className="w-16 switch-txt">TJ</p>
                <Image src={TajikFlag} alt="Logo" />
              </div>
            </SelectItem>
            <SelectItem value="EN">
              <div className="flex items-center text-black gap-2">
                <p className="w-16 switch-txt">EN</p>
                <Image src={EnglishFlag} alt="Logo" />
              </div>
            </SelectItem>
            <SelectItem value="GR">
              <div className="flex items-center text-black gap-2">
                <p className="w-16 switch-txt">DE</p>
                <Image src={GermanFlag} alt="Logo" />
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
