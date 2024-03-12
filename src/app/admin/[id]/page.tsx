"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { data } from "@/app/data/projects";

import { API_KEY } from "@/app/configs/API_KEY";
import { Projectinterface } from "@/app/interfaces/ProjectInterface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProject } from "@/redux/features/projectsSlice";
import axios from "axios";

export default function UpdateProject({ params }: { params: { id: number } }) {
  const dispatch = useAppDispatch();
  const state:any = useAppSelector((state) => state.ProjectsReducer);

  // useEffect(() => {
  //   dispatch(fetchProject());
  // }, []);

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

  const project = state.projects.find(
    (doc: Projectinterface) => doc.project_id == params.id
  );

  // const [englishName, setEnglishName] = useState<string>("");
  const englishName = useRef<any>();
  // const [englishDescription, setEnglishDescription] = useState<string>("");
  const englishDescription = useRef<any>();
  // const [englishAddress, setEnglishAddress] = useState<string>("");
  const englishAddress = useRef<any>();

  // const [tajikName, setTajikName] = useState<string>("");
  const tajikName = useRef<any>();
  // const [tajikDescription, setTajikDescription] = useState<string>("");
  const tajikDescription = useRef<any>();
  // const [tajikAddress, setTajikAddress] = useState<string>("");
  const tajikAddress = useRef<any>();

  // const [russianName, setRussianName] = useState<string>("");
  const russianName = useRef<any>();
  // const [russainDescription, setRussainDescription] = useState<string>("");
  const russainDescription = useRef<any>();
  // const [russianAddress, setRussianAddress] = useState<string>("");
  const russianAddress = useRef<any>();

  // const [germanName, setGermanName] = useState<string>("");
  const germanName = useRef<any>();
  // const [germanDescription, setGermanDescription] = useState<string>("");
  const germanDescription = useRef<any>();
  // const [germanAddress, setGermanAddress] = useState<string>("");
  const germanAddress = useRef<any>();

  // const [category, setCategory] = useState<string>("");
  const category = useRef<any>();
  const [district, setDistrict] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [media, setMedia] = useState<any>(null);
  const [medias, setMedias] = useState<any>([]);
  const [banner, setBanner] = useState<any>(null);
  // const [x, setX] = useState<number>();
  const x = useRef<any>();
  // const [y, setY] = useState<number>();
  const y = useRef<any>();

  const titleEn = useRef<any>();
  const titleRu = useRef<any>();
  const titleTj = useRef<any>();
  const titleDe = useRef<any>();
  const LINK_URL = useRef<any>();

  const linkTitleEn = useRef<any>();
  const linkTitleRu = useRef<any>();
  const linkTitleTj = useRef<any>();
  const linkTitleDe = useRef<any>();

  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    englishName.current.value = project?.name_en;
    tajikName.current.value = project?.name_tj;
    russianName.current.value = project?.name_ru;
    germanName.current.value = project?.name_de;
    englishDescription.current.value = project?.short_en;
    tajikDescription.current.value = project?.short_tj;
    russainDescription.current.value = project?.short_ru;
    germanDescription.current.value = project?.short_de;
    category.current.value = project?.category_id;
    // englishAddress.current.value = project?.adress_en;
    // russianAddress.current.value = project?.adress_ru;
    // tajikAddress.current.value = project?.adress_tj;
    // germanAddress.current.value = project?.adress_de;
  }, [state.projects, project]);

  function getFile(event: any) {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFiles((prevFiles: any) => [...prevFiles, event.target.files[0]]);
    const newFile = {
      type: event.target.files[0].type,
      project_id: "",
      title_ru: "",
      title_en: "",
      title_de: "",
      title_tj: "",
      url: event.target.files[0].name,
    };
    console.log(newFile);
  }

  const getMedia = (event: any) => {
    console.log(event.target.files[0]);
    setMedia(event.target.files[0]);
    setMedias((prevFiles: any) => [...prevFiles, event.target.files[0]]);
  };

  const getBanner = (event: any) => {
    console.log(event.target.files[0]);
    setBanner(event.target.files[0]);
  };

  function handleSubmit(e: any) {
    e.preventDefault();

    const updatedProject = {
      name_en: englishName.current.value,
      name_ru: russianName.current.value,
      name_de: germanName.current.value,
      name_tj: tajikName.current.value,
      short_en: englishDescription.current.value,
      short_ru: russainDescription.current.value,
      short_de: germanDescription.current.value,
      short_tj: tajikDescription.current.value,
      category_id: category.current.value,
      banner_url: "hello world!",
      implementation: "implementation",
      location: [parseInt(x.current.value), parseInt(y.current.value)],
    };

    axios
      .post(`${API_KEY}/update/project/${project?.project_id}`, updatedProject)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(updatedProject);
    setIsSaved(true);
  }

  const handleSendMedia = (event: any) => {
    event.preventDefault();

    const newMedia = {
      title_ru: titleRu.current.value,
      title_en: titleEn.current.value,
      title_de: titleDe.current.value,
      title_tj: titleTj.current.value,
    };

    JSON.stringify(newMedia)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_KEY}/update/project/:${project?.project_id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: newMedia
    };

    axios.defaults.withCredentials = true;
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    titleRu.current.value = "";
    titleEn.current.value = "";
    titleTj.current.value = "";
    titleDe.current.value = "";
  };

  const handleSendLinks = (event: any) => {
    event.preventDefault();

    const newLink = {
      "title_ru": linkTitleRu.current.value,
      "title_en": linkTitleEn.current.value,
      "title_de": linkTitleDe.current.value,
      "title_tj": linkTitleTj.current.value,
      "url": LINK_URL.current.value,
    };

    JSON.stringify(newLink)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_KEY}/update/project:${project?.project_id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: newLink
    };

    axios.defaults.withCredentials = true;
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    linkTitleRu.current.value = "";
    linkTitleEn.current.value = "";
    linkTitleTj.current.value = "";
    linkTitleDe.current.value = "";
  };

  return (
    <div className="bg-[#D3D3D3] px-24 py-12">
      <div>
        <h3>PROJECTS DETAILS</h3>
        <div className="divider">EN</div>
      </div>
      <form onSubmit={handleSubmit}>
        <section className="mt-3 flex items-center gap-10">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Name*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Type the project’s name..."
              ref={englishName}
            // value={englishName}
            // onChange={(e) => setEnglishName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Category*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Describe the project..."
              ref={category}
            // onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </section>
        <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Description*</label>
            <textarea
              className="w-full min-h-[260px] p-3 resize-none"
              placeholder="Describe the project..."
              ref={englishDescription}
            // value={englishDescription}
            // onChange={(e) => setEnglishDescription(e.target.value)}
            ></textarea>
          </div>
        </section>
        {/* <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Address*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Address"
              ref={englishAddress}
              // value={englishAddress}
              // onChange={(e) => setEnglishAddress(e.target.value)}
            />
          </div>
        </section> */}
        <section className="mt-5 flex items-start gap-10">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">X*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="X"
              ref={x}
            // value={x}
            // onChange={(e) => setX(parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Y*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Y"
              ref={y}
            // onChange={(e) => setY(parseInt(e.target.value))}
            />
          </div>
        </section>
        <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Banner*</label>
            <span>1362x450</span>
            <div className="flex items-center gap-5 mt-3 rounded-[5px]">
              <label
                htmlFor="file"
                className="w-[158px] h-[53px] bg-[#C30F08] text-white flex items-center justify-center cursor-pointer rounded-[5px]"
              >
                Browse File
              </label>
              <input
                type="file"
                className="choose-file"
                id="file"
                value={banner}
                onChange={getBanner}
              // onChange={(e) => setFile(e.target.value)}
              />
              <span>filename.png</span>
            </div>
          </div>
        </section>
        <div className="my-2">
          <div className="divider">TJ</div>
        </div>
        <section className="mt-3 flex items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Name*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Type the project’s name..."
              ref={tajikName}
            // value={tajikName}
            // onChange={(e) => setTajikName(e.target.value)}
            />
          </div>
        </section>
        <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Description*</label>
            <textarea
              className="w-full min-h-[260px] p-3 resize-none"
              placeholder="Describe the project..."
              ref={tajikDescription}
            // value={tajikDescription}
            // onChange={(e) => setTajikDescription(e.target.value)}
            ></textarea>
          </div>
        </section>
        {/* <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Address*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Address"
              ref={tajikAddress}
              // value={tajikAddress}
              // onChange={(e) => setTajikAddress(e.target.value)}
            />
          </div>
        </section> */}
        <div className="my-2">
          <div className="divider">RU</div>
        </div>
        <section className="mt-3 flex items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Name*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Type the project’s name..."
              ref={russianName}
            // value={russianName}
            // onChange={(e) => setRussianName(e.target.value)}
            />
          </div>
        </section>
        <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Description*</label>
            <textarea
              className="w-full min-h-[260px] p-3 resize-none"
              placeholder="Describe the project..."
              ref={russainDescription}
            // value={russainDescription}
            // onChange={(e) => setRussainDescription(e.target.value)}
            ></textarea>
          </div>
        </section>
        {/* <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Address*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Address"
              ref={russianAddress}
              // value={russianAddress}
              // onChange={(e) => setRussianAddress(e.target.value)}
            />
          </div>
        </section> */}
        <div className="my-2">
          <div className="divider">DE</div>
        </div>
        <section className="mt-3 flex items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Name*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Type the project’s name..."
              ref={germanName}
            // value={germanName}
            // onChange={(e) => setGermanName(e.target.value)}
            />
          </div>
        </section>
        <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Description*</label>
            <textarea
              className="w-full min-h-[260px] p-3 resize-none"
              placeholder="Describe the project..."
              ref={germanDescription}
            // onChange={(e) => setGermanDescription(e.target.value)}
            ></textarea>
          </div>
        </section>
        {/* <section className="mt-5">
          <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Address*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Address"
              ref={germanAddress}
              // onChange={(e) => setGermanAddress(e.target.value)}
            />
          </div>
        </section> */}
        <div className="mt-5 flex items-center justify-end gap-10">
          <Link
            href={"/admin"}
            className="w-[140px] h-[50px] bg-[#C30F08] text-white uppercase rounded-[5px] flex items-center justify-center"
          >
            cancel
          </Link>
          <button className="w-[140px] h-[50px] bg-[#C30F08] text-white uppercase rounded-[5px]">
            save
          </button>
        </div>

        {isSaved == true && (
          <>
            <div className="flex flex-col items-start justify-start">
              <label className="text-[24px] font-medium mb-2 uppercase">
                Documents (only pDF)
              </label>
              <span className="text-sm text-gray-500 mb-3">max size 2 mb</span>
              <div className="flex items-center gap-5">
                <label
                  htmlFor="file1"
                  className="w-[158px] h-[53px] bg-[#C30F08] text-white flex items-center justify-center cursor-pointer rounded-[5px]"
                >
                  Add
                </label>
                <input
                  type="file"
                  className="choose-file"
                  id="file1"
                  onChange={getFile}
                // value={file}
                // onChange={(e) => setFile(e.target.value)}
                />
                <span>{file != null ? file?.name : "File name"}</span>
              </div>
              <div className="flex items-center gap-5 mt-5">
                {files.length > 0 &&
                  files.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[110px] h-[110px] p-2 flex items-center justify-center text-center text-sm font-medium bg-[#E8A805]"
                      >
                        {item?.name}
                      </div>
                    );
                  })}
                {/* <div className="w-[110px] h-[110px] bg-[#E8A805]"></div>
                <div className="w-[110px] h-[110px] bg-[#E8A805]"></div> */}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start mt-[100px]">
              <label className="text-[24px] font-medium mb-2 uppercase">
                media files (png, jpg)
              </label>
              <span className="text-sm text-gray-500 mb-3">max size 2 mb</span>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="file2"
                  className="w-[158px] h-[53px] bg-[#C30F08] text-white flex items-center justify-center cursor-pointer rounded-[5px]"
                >
                  Choose photo
                </label>
                <p>{media != null ? media?.name : "File name"}</p>
              </div>
              <input
                type="file"
                className="choose-file"
                id="file2"
                onChange={getMedia}
              // value={file}
              // onChange={getFile}
              // onChange={(e) => setFile(e.target.value)}
              />
              <div className="flex items-center gap-5 mt-5">
                {medias.length > 0 &&
                  medias.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[110px] h-[110px] p-2 flex items-center justify-center text-center text-sm font-medium bg-[#E8A805]"
                      >
                        {item?.name}
                      </div>
                    );
                  })}
              </div>
              {/* Media */}
              <div className="flex items-center gap-10 mt-10">
                <div className="flex items-start gap-8">
                  <section className="flex items-start justify-start flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <p className="w-[60px]">Title en</p>
                      <input
                        ref={titleEn}
                        className="w-[300px] h-[40px] p-2"
                        type="text"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="w-[60px]">Title ru</p>
                      <input
                        ref={titleRu}
                        className="w-[300px] h-[40px] p-2"
                        type="text"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="w-[60px]">Title tj</p>
                      <input
                        ref={titleTj}
                        className="w-[300px] h-[40px] p-2"
                        type="text"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="w-[60px]">Title de</p>
                      <input
                        ref={titleDe}
                        className="w-[300px] h-[40px] p-2"
                        type="text"
                      />
                    </div>
                    <button
                      onClick={handleSendMedia}
                      className="px-4 h-[40px] bg-[#C30F08] text-white"
                    >
                      Upload
                    </button>
                  </section>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start mt-[100px]">
              <label className="text-[24px] font-medium mb-2 uppercase">
                Links
              </label>
              <span className="text-sm text-gray-500 mb-3">Youtube videos</span>
              <section className="flex items-start justify-start flex-col gap-3">
                <div className="flex items-center gap-3">
                  <p className="w-[60px]">URL</p>
                  <input
                    ref={LINK_URL}
                    className="w-[300px] h-[40px] p-2"
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p className="w-[60px]">Title en</p>
                  <input
                    ref={linkTitleEn}
                    className="w-[300px] h-[40px] p-2"
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p className="w-[60px]">Title ru</p>
                  <input
                    ref={linkTitleRu}
                    className="w-[300px] h-[40px] p-2"
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p className="w-[60px]">Title tj</p>
                  <input
                    ref={linkTitleTj}
                    className="w-[300px] h-[40px] p-2"
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p className="w-[60px]">Title de</p>
                  <input
                    ref={linkTitleDe}
                    className="w-[300px] h-[40px] p-2"
                    type="text"
                  />
                </div>
                <button
                  onClick={handleSendLinks}
                  className="px-4 h-[40px] bg-[#C30F08] text-white"
                >
                  Upload
                </button>
              </section>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
