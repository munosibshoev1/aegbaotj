"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/ui/select";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

import { districtsData } from "../../../public/data/District";
import { regionsData } from "../../../public/data/Region";

// region, village, projects
import { selectFilter, programmeFilter, seacrhFilter } from "@/redux/features/projectsSlice";
import { useAppDispatch } from "@/redux/hooks";

import "./Filter.css"

export default function Filter() {

  const programmesData = [
    {
      id: 1,
      name_ru: "LEDSHMR",
      name_en: "LEDSHMR",
      name_tj: "LEDSHMR",
      name_de: "LEDSHMR",
    },
    {
      id: 2,
      name_ru: "TRIGGER II",
      name_en: "TRIGGER II",
      name_tj: "TRIGGER II",
      name_de: "TRIGGER II",
    }
  ];

  const dispatch = useAppDispatch();

  const handleSelectFilter = (value: string) => {
    dispatch(selectFilter(value));
  };
  const handleSelectProgrammeFilter = (value: string) => {
    if(value == "All"){
      dispatch(programmeFilter({id:0, name: "All"}));

    }else{
      dispatch(programmeFilter({id:programmesData.filter(prog=>{if(prog.name_en === value) return prog})[0].id, name: value}));
    }
  };

  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(seacrhFilter(event.target.value));
  };
  const state: any = useAppSelector((state) => state.ProjectsReducer);

  const [selectedFilter, setSelectedFilter] = useState<string>("All"
  );
  const [selectedProgrammeFilter, setSelectedProgrammeFilter] = useState<any>({id:0, name: "All"}
  );
  useEffect(() => {
    // if (state.filteredData.length < 1) {
    //   setSelectedFilter(state.selectedDistrict);
    // } else {
    //   setSelectedFilter(state.selectedDistrict);
    // }
    setSelectedFilter(state.selectedDistrict);
    setSelectedProgrammeFilter(state.selectedProgramme)

    
  }, [state.filteredData, state.selectedDistrict, state.selectedProgramme]);


  // properties.District Name

  return (
    <nav className="flex items-center flex-wrap gap-16 px-28 mt-10 projects__filter">

      <section className="flex items-center flex-wrap gap-10">
        <div className="flex items-center gap-1">
          <p>Region:</p>
          <Select onValueChange={handleSelectFilter} value={selectedFilter} >
            <SelectTrigger className="min-w-[120px] text-center text-black">
              <SelectValue className="text-black" placeholder={"All"} />
              <SelectValue className="text-black" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="text-black custom__select-group">
                <SelectItem

                  key={0}
                  value={"All"}
                >
                  <div className="text-black">
                    <p>All</p>
                  </div>
                </SelectItem>
                {districtsData.features.filter((district) => { if (district.properties.region == 4) return district }).map((district) => {
                  return (
                    <SelectItem

                      key={district.id}
                      value={district.properties.district_name}
                    >
                      <div className="text-black">
                        <p>{district.properties.district_name}</p>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <p>Project:</p>
          <Select  onValueChange={handleSelectProgrammeFilter} value={selectedProgrammeFilter.name} >
            <SelectTrigger className="min-w-[120px] text-center text-black">
              <SelectValue className="text-black" placeholder={"All"} />
              <SelectValue className="text-black" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="text-black custom__select-group">
                <SelectItem

                  key={0}
                  value={"All"}
                >
                  <div className="text-black">
                    <p>All</p>
                  </div>
                </SelectItem>
                {programmesData.map((programme) => {
                  return (
                    <SelectItem

                      key={programme.id}
                      value={programme.name_en}
                    >
                      <div className="text-black">
                        <p>{programme.name_en}</p>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <input
            onChange={(event) => handleSearchFilter(event)}
            className="border h-[40px] px-2"
            type="text"
            placeholder="Search..."
          />
        </div>
      </section>
    </nav>
  );
}
