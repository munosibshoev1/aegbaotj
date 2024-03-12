"use client";
import Link from "next/link";
import Filter from "@/components/Filter/Filter";
import { useEffect, useRef, useState } from "react";
import { API_KEY } from "@/app/configs/API_KEY";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/ui/select";
import { districtsData } from "../../../../public/data/District";
import { regionsData } from "../../../../public/data/Region";
import { villagesData } from "../../../../public/data/Village";
import axios from "axios";

// Province/Sate Name (Defined by Unit)

export default function CreateProject() {
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

  const [category, setCategory] = useState<string>("");
  // const category = useRef<any>();
  const [district, setDistrict] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [media, setMedia] = useState<any>(null);
  const [medias, setMedias] = useState<any>([]);
  const [banner, setBanner] = useState<any>(null);
  const [projectID, setProjectID] = useState();

  // const [x, setX] = useState<number>();
  const x = useRef<any>();
  // const [y, setY] = useState<number>();
  const y = useRef<any>();

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const getDistrict = (value: string) => {
    setDistrict(value);
    console.log(value);
  };

  const getVillage = (value: string) => {
    console.log(value);
    setVillage(value);
  };

  const getRegion = (value: string) => {
    console.log(value);
  };

  const getBanner = (event: any) => {
    console.log(event.target.files[0]);
    setBanner(event.target.files[0]);
  };

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
    // const newMedia = {
    //   type: event.target.files[0].type,
    //   project_id: "",
    //   title_ru: "",
    //   title_en: "",
    //   title_de: "",
    //   title_tj: "",
    //   url: event.target.files[0].name,
    // };
    // console.log(newMedia);
  };

  const getCategory = (value: string) => {
    setCategory(value);
    console.log(value);
  };

  const titleEn = useRef<any>();
  const titleRu = useRef<any>();
  const titleTj = useRef<any>();
  const titleDe = useRef<any>();
  const LINK_URL = useRef<any>();

  const linkTitleEn = useRef<any>();
  const linkTitleRu = useRef<any>();
  const linkTitleTj = useRef<any>();
  const linkTitleDe = useRef<any>();

  useEffect(() => {
    axios
      .get(`${API_KEY}/get/categories`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();

    // ! Get file from input (filesystem)
    var files = banner;
    console.log(files);

    // ? create file reader and array byffer 
    var FileReaderTwo = new FileReader();
    var Reader: any = new ArrayBuffer(0);

    FileReaderTwo.onload = function (e: any) {
      Reader = e.target.result

      var chunkes = 100536 // set chunk size
      var offset = 0 // ofsste will be used slice the element from rawData
      var baset = ""
      // ? for is used to combine all base64 from chunks
      for (let index = 0; index < Reader.byteLength; index++) {
        var chunk = Reader.slice(offset, chunkes + offset)
        baset += btoa(String.fromCharCode(...new Uint8Array(chunk)))
        offset += chunkes
      }
      // ! create json wich will be send with file
      var data = JSON.stringify({
        "name_ru": russianName,
        "name_tj": tajikName,
        "name_en": englishName,
        "name_de": germanName,
        "short_ru": russainDescription,
        "short_tj": tajikDescription,
        "short_en": englishDescription,
        "short_de": germanDescription,
        "category_id": titleRu,
        "implementation": titleRu,
        "location": titleRu,
        "district_id": titleRu,
        "village_id": titleRu,
        "adress_ru": titleRu,
        "adress_tj": titleRu,
        "adress_en": titleRu,
        "adress_de": titleRu,
        "created_at": titleRu,
        "updated_at": titleRu,
      });


      console.log(baset);

      // ? send file and json
      var finalData = JSON.stringify({
        "byte": baset,
        data
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_KEY}/create/project`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: finalData
      };

      axios.defaults.withCredentials = true;
      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setProjectID(response.data.project_id)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // ?======================================
    FileReaderTwo.readAsArrayBuffer(files);

    setIsSaved(true);
  }

  const handleSendMedia = (event: any) => {
    event.preventDefault();

    const newMedia = {
      type: media.type,
      project_id: Date.now(),
      title_ru: titleRu.current.value,
      title_en: titleEn.current.value,
      title_de: titleDe.current.value,
      title_tj: titleTj.current.value,
      url: media.name,
    };

    console.log(newMedia);

    titleRu.current.value = "";
    titleEn.current.value = "";
    titleTj.current.value = "";
    titleDe.current.value = "";
  };

  const handleSendLinks = (event: any) => {
    event.preventDefault();

    const newLink = {
      "project_id": projectID,
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
      url: `${API_KEY}/create/project`,
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
      <form>
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
          <div className="custom__select w-[300px]">
            <label className="text-[24px] font-medium mb-2">Category*</label>
            <Select onValueChange={getCategory}>
              <SelectTrigger className="bg-white text-center text-black">
                <SelectValue
                  className="text-black"
                  placeholder={"Select District"}
                />
                <SelectValue className="text-black" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup className="text-black custom__select-group">
                  {districtsData.features.map((district) => {
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
          {/* <div className="flex flex-col items-start justify-start">
            <label className="text-[24px] font-medium mb-2">Category*</label>
            <input
              className="border border-gray-500 w-[475px] h-[55px] p-3"
              type="text"
              placeholder="Describe the project..."
              ref={category}
              // onChange={(e) => setCategory(e.target.value)}
            />
          </div> */}
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
        <section className="mt-5">
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
        </section>
        <section className="mt-5 flex items-start justify-start flex-col gap-6">
          <div className="custom__select w-[300px]">
            <label className="text-[24px] font-medium mb-2">District*</label>
            <Select onValueChange={getDistrict}>
              <SelectTrigger className="bg-white text-center text-black">
                <SelectValue
                  className="text-black"
                  placeholder={"Select District"}
                />
                <SelectValue className="text-black" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup className="text-black custom__select-group">
                  {districtsData.features.map((district) => {
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
          <div className="custom__select w-[300px]">
            <label className="text-[24px] font-medium mb-2">Village*</label>
            <Select onValueChange={getVillage}>
              <SelectTrigger className="bg-white text-center text-black">
                <SelectValue
                  className="text-black"
                  placeholder={"Select Village"}
                />
                <SelectValue className="text-black" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup className="text-black custom__select-group">
                  {villagesData.features.map((district) => {
                    return (
                      <SelectItem
                        key={district.id}
                        value={district.properties["Settlement/Village Name"]}
                      >
                        <div className="text-black">
                          <p>
                            {district.properties["Settlement/Village Name"]}
                          </p>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="custom__select w-[300px]">
            <label className="text-[24px] font-medium mb-2">Region*</label>
            <Select onValueChange={getRegion}>
              <SelectTrigger className="bg-white text-center text-black">
                <SelectValue
                  className="text-black"
                  placeholder={"Select Region"}
                />
                <SelectValue className="text-black" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup className="text-black custom__select-group">
                  {regionsData.features.map((district) => {
                    return (
                      <SelectItem
                        key={district.id}
                        value={
                          district.properties[
                          "Province/Sate Name (Defined by Unit)"
                          ]
                        }
                      >
                        <div className="text-black">
                          <p>
                            {
                              district.properties[
                              "Province/Sate Name (Defined by Unit)"
                              ]
                            }
                          </p>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>
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
                onChange={getBanner}
              />
              <span>{banner != null ? banner?.name : "Banner file name"}</span>
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
        <section className="mt-5">
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
        </section>
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
        <section className="mt-5">
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
        </section>
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
        <section className="mt-5">
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
        </section>
        <div className="mt-5 flex items-center justify-end gap-10">
          <Link
            href={"/admin"}
            className="w-[140px] h-[50px] bg-[#C30F08] text-white uppercase rounded-[5px] flex items-center justify-center"
          >
            cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="w-[140px] h-[50px] bg-[#C30F08] text-white uppercase rounded-[5px]"
          >
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
                {/* <div className="w-[110px] h-[110px] bg-[#E8A805]"></div>
                <div className="w-[110px] h-[110px] bg-[#E8A805]"></div> */}
              </div>
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
              {/* <p>{file}</p> */}
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
