"use client";

// import { data } from "@/app/data/projects";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

import { API_KEY } from "@/app/configs/API_KEY";
import { Projectinterface } from "@/app/interfaces/ProjectInterface";
import { fetchProject } from "@/redux/features/projectsSlice";

interface DataInterface {
  id: number;
  title: string;
  subtitle: string;
  image: any;
  district: string;
  status: string;
}

export default function TableBody() {
  const dispatch = useAppDispatch();
  const state:any = useAppSelector((state) => state.ProjectsReducer);

  useEffect(() => {
    dispatch(fetchProject());
  }, []);

  const [projects, setProjects] = useState<Projectinterface[]>(
    state.filteredData
  );

  useEffect(() => {
    if (state.filteredData.length < 1) {
      setProjects(state.projects);
    } else {
      setProjects(state.filteredData);
    }
  }, [projects, state.projects, state.filteredData]);
  return (
    <div>
      <div className="flex items-center justify-between p-3 mt-4 bg-[#F9F9F9] border">
        <p className="text-lg font-medium">Project name</p>
        <p className="text-lg font-medium">Implemented</p>
        <p className="text-lg font-medium">District | Town/Village</p>
        <p className="text-lg font-medium">Status</p>
        <p className="text-lg font-medium">Action</p>
      </div>
      <div>
        {projects.map((project: Projectinterface, index: number) => {
          return (
            <div
              className="flex items-center justify-between p-3 border"
              key={project.project_id}
            >
              <div>
                {/* <p className="text-[#333] font-semibold">Tuth business</p> */}
                <p className="text-[#333] font-semibold w-[260px] project-title">
                  {project.name_en}
                </p>
                <p className="text-[#828282] text-sm">agriculture</p>
              </div>
              <p className="text-[#828282]">2020</p>
              <div>
                {/* <p>Shuhdara</p>
                <p>Tusyon</p> */}
                <p className="text-[#828282]">Shuhdara | Tusyon</p>
              </div>
              {/* <p
                className={`py-2 px-4 rounded-[11px] capitalize font-medium w-[115px] ${
                  project.status == "pending" && "bg-[#FEFFE5] text-[#FFBC10]"
                } ${
                  project.status == "published" && "bg-[#F0FFF8] text-[#18AB56]"
                } ${
                  project.status == "deleted" && "bg-[#FFF0F0] text-[#EB5757]"
                }
                `}
              >
                {project.status}
              </p> */}
              <Link
                className="text-inherit no-underline"
                href={`/admin/${project.project_id}`}
              >
                <AiOutlineEdit />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
