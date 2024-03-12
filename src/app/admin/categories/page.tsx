"use client";

import { API_KEY } from "@/app/configs/API_KEY";
import axios from "axios";
import { FormEvent } from "react";
import { useRef } from "react";

export default function Categories() {
  const engCategory = useRef<any>();
  const ruCategory = useRef<any>();
  const tjCategory = useRef<any>();
  const deCategory = useRef<any>();

  const handleCreateCategory = (event: FormEvent) => {
    event.preventDefault();

    let date = new Date();
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    let fullDate = `${day}/${month}/${year}`;

    const newProject = JSON.stringify({
      name_en: engCategory.current.value,
      name_ru: ruCategory.current.value,
      name_tj: tjCategory.current.value,
      name_de: deCategory.current.value,
      created_at: fullDate,
      updated_at: fullDate,
    });

    axios.defaults.withCredentials = true;
    axios
      .post(`${API_KEY}/create/categories`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-[#D3D3D3] px-24 py-12">
      <div>
        <h3>Categories</h3>
        <div className="divider">EN</div>
      </div>
      <form onSubmit={handleCreateCategory}>
        <section className="mt-3 flex items-center gap-10">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Name*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Type the project’s name..."
              ref={engCategory}
            />
          </div>
        </section>
        <div className="my-2">
          <div className="divider">RU</div>
        </div>
        <section className="mt-10 flex items-center gap-10">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Name*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Type the project’s name..."
              ref={ruCategory}
            />
          </div>
        </section>
        <div className="my-2">
          <div className="divider">TJ</div>
        </div>
        <section className="mt-10 flex items-center gap-10">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Name*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Type the project’s name..."
              ref={tjCategory}
            />
          </div>
        </section>
        <div className="my-2">
          <div className="divider">DE</div>
        </div>
        <section className="mt-10 flex items-center gap-10">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Name*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Type the project’s name..."
              ref={deCategory}
            />
          </div>
        </section>
        <section className="mt-10">
          <div>
            <button className="bg-[#C30F08] w-[200px] h-[50px] text-white">
              create category
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
