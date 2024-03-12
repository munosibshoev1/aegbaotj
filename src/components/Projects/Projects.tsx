"use client";

import { useAppSelector } from "@/redux/hooks";
// import { data } from "@/app/data/projects";
import Image from "next/image";
import type { StaticImageData } from 'next/image';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";

import { API_KEY } from "@/app/configs/API_KEY";
import { Projectinterface } from "@/app/interfaces/ProjectInterface";
import { fetchProject } from "@/redux/features/projectsSlice";
import {viewProject} from "@/redux/features/projectsSlice";
import {projectCardExpanded} from "@/redux/features/projectsSlice";

import "./Projects.css"

import uca_card from "../../../public/images/media/uca/UCA_Photo_1.jpg"
import dairy from "../../../public/images/media/dairy/Khuf_1_Photo_1.jpg"
import entrepreneurship_center from "../../../public/images/media/uca/UCA_Photo_1.jpg"
// import foodSafety from "../../../public/images/media/uca/UCA_Photo_1.jpg"
import gosstand from "../../../public/images/media/gosstand/Gos_st_Photo_1.jpg"
import { useRouter } from "next/navigation";


import vegetable from "../../../public/images/media/vegetable/Derzud_Photo_2.jpg"
import TVETCentre from "../../../public/images/media/tvetcentre/tvet_uca_Photo_1.jpg"
import zindagi from "../../../public/images/media/cooperativezindagi/Coop - zind_Photo_1.jpg"
import gosstandBazar from "../../../public/images/media/foodsafety/Food_lab_Photo_1.jpg"
import parshed from "../../../public/images/media/parshed/Parshed_Photo_1.jpg"
import cashmire from "../../../public/images/media/cashmire/Cashmire_Photo_1.jpg"
import zanuthj from "../../../public/images/media/zanuthj/Zanuthj_Photo_1.jpg"

type Images = {
  uca: any;
  dairy: any;
  entrepreneurship_center: any;
  foodSafety: any;
  vegetable: any;
  TVETCentre: any;
  cooperative : any;
};

export default function Projects() {

  const router = useRouter();

  const cardImages:any = {uca: uca_card, dairy: dairy, entrepreneurship_center, gosstand, vegetable, TVETCentre, zindagi, gosstandBazar, parshed, cashmire, zanuthj};
  const dispatch = useAppDispatch();

  // const dispatch = useAppDispatch();
  const state:any = useAppSelector((state) => state.ProjectsReducer);
  const stateLang:any = useAppSelector((state) => state.LanguageReducer);

  // useEffect(() => {
  //   dispatch(fetchProject());
  // }, []);

  const [projects, setProjects] = useState<Projectinterface[]>(
    state.filteredData
  );

  
  const [lang, setlang] = useState<String>(
    stateLang.language
  );

  useEffect(() => {
    setlang(stateLang.language)
  }, [stateLang.language]);


  useEffect(() => {
    // if (state.filteredData.length < 1) {
      setProjects(state.filteredData);
    // } else {
    //   setProjects(state.filteredData);
    // }
  }, [projects, state.projects, state.filteredData]);

  const [active, setActive] = useState<number | null>(null);

  const handleAccordion = (index: number, project: Projectinterface) => {
    let activeProject = projects.find(
      (doc) => doc.project_id == project.project_id
    );

    if (active == index) {
      // setActive(null);
    }else{
      setActive(index);
      dispatch(projectCardExpanded(activeProject?.project_id))
    }

  };

  return (
    <div className="bg-[#F0F0F0] rounded-[30px] w-[550px] h-full overflow-y-scroll relative px-3 projects__container">
      <h3 className="project-title text-center py-3 sticky top-0 z-50 bg-[#F0F0F0]">
        {lang=="en"? `LOCATIONS`:lang=="ru"?`ЛОКАЦИИ`:lang=="tj"?`ЛОИҲАҲО`:`PROJEKTE`}
      </h3>
      <section className="flex flex-col items-start justify-start gap-3 pb-5">
        {state.loading && <div>loading</div>}
        {!state.loading && state.error ? <div>Error: {state.error}</div> : null}
        {!state.loading &&
          state.projects?.length > 0 &&
          projects.map((project: Projectinterface, index: number) => {
            return (
              <div
                key={project.project_id}
                onClick={() => handleAccordion(index, project)}
                className={`${active == index ? "card collapsed__card" : "card"
                  }`}
              >
                <div
                  className={`${active == index
                      ? "collapsed__image_container"
                      : "card__image"
                    }`}
                >
                  
                  <Image
                    className={`${active == index
                        ? "default__image collapsed__image"
                        : "default__image"
                      }`}
                    src={cardImages[project.banner_url]}
                    alt="Project Image"
                  />
                </div>
                <div
                  className={`${active == index
                      ? "card__info collapsed__info"
                      : "card__info"
                    }`}
                >
                  <h6 className="text-[15px] font-bold">{lang=="en"?project.name_en:lang=="ru"?project.name_ru:lang=="tj"?project.name_tj:project.name_de}</h6>
                  <p
                    className={`${active == index
                        ? "default__text collapsed__text"
                        : "default__text"
                      }`}
                  >
                    {lang=="en"?project.short_en:lang=="ru"?project.short_ru:lang=="tj"?project.short_tj:project.short_de}
                  </p>

                </div>
                <button
                  className={`${active == index
                      ? "absolute bottom-5 left-[60px] opacity-1"
                      : "absolute opacity-0"
                    }`}
                    onClick={() => { 
                      dispatch(viewProject(project));
                      router.push('./project', { scroll: false })
                    }}
                >
                  read more
                </button>
              </div>
            );
          })}
      </section>
    </div>
  );
}
