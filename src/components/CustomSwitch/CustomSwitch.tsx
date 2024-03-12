"use client"
import { useState, useId, useEffect } from "react"
import Select from "react-select";

import TajikFlag from "../../../public/icons/tj.svg";
import RussianFlag from "../../../public/icons/ru.svg";
import EnglishFlag from "../../../public/icons/en.svg";
import GermanFlag from "../../../public/icons/de.svg";

import { changeLanguage } from "@/redux/features/languageSlice"
import { useAppDispatch } from "@/redux/hooks";

export default function CustomSwitch() {
  const dispatch = useAppDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState<any>();
  const [placeholder, setPlaceholder] = useState<any>(selectedLanguage);

  const options = [
    { value: "en", label: <div className="flex items-center gap-1"><img src={EnglishFlag.src} className="rounded-[15px]" height="20px" width="20px" /><p>EN</p> </div> },
    { value: "de", label: <div className="flex items-center gap-1"><img src={GermanFlag.src} className="rounded-[15px]" height="20px" width="20px" /><p>DE</p> </div> },
    { value: "ru", label: <div className="flex items-center gap-1"><img src={RussianFlag.src} className="rounded-[15px]" height="20px" width="20px" /><p>RU</p> </div> },
    { value: "tj", label: <div className="flex items-center gap-1"><img src={TajikFlag.src} className="rounded-[15px]" height="20px" width="20px" /><p>TJ</p> </div> },

    // { value: "RU", label: "RU" }
  ];

  // <div><img src={copyIcon} height="30px" width="30px"/>Chocolate </div>

  function handleSelectChange(e: any) {
    setSelectedLanguage(e.value);
    dispatch(changeLanguage(e.value));
    localStorage.setItem("lang", e.value)
    return e.value
  }

  // useEffect(() => {
  //   handleSelectChange("en")
  // }, [])

  const style = {
    control: (base: any, state: any) => ({
      ...base,
      background: "transparent",
      border: state.isFocused ? 0 : 0,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0
      }
    })
  };

  let content: any = ""

  if (selectedLanguage == "de") {
    content = <div className="flex items-center gap-1"> <p className="text-sm font-light">DE</p><img src={GermanFlag.src} className="rounded-[15px]" height="20px" width="20px" /> </div>
  } else if (selectedLanguage == "en") {
    content = <div className="flex items-center gap-1"><p className="text-sm font-light">EN</p><img src={EnglishFlag.src} className="rounded-[15px]" height="20px" width="20px" /> </div>
  } else if (selectedLanguage == "ru") {
    content = <div className="flex items-center gap-1"><p className="text-sm font-light">RU</p><img src={RussianFlag.src} className="rounded-[15px]" height="20px" width="20px" /> </div>
  } else if (selectedLanguage == "tj") {
    content = <div className="flex items-center gap-1"><p className="text-sm font-light">TJ</p><img src={TajikFlag.src} className="rounded-[15px]" height="20px" width="20px" /> </div>

  }

  return (
    <Select
      defaultValue={options[0]}
      options={options}
      value={selectedLanguage}
      onChange={handleSelectChange}
      placeholder={content}
      className="w-24 z-50"
      styles={style}
      isSearchable={false}
      // Warning: Prop `id` did not match. Server: "react-select-3-live-region" Client: "react-select-2-live-region"
      // Solution: try to add prop instanceId set as unique string and should work
      instanceId={useId()}
    />
  )
}