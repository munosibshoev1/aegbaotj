'use client';
import { useState, useRef, useEffect } from "react"
import { useAppSelector } from "@/redux/hooks";
import L from 'leaflet';
import { Icon, LatLng, LatLngBounds, Map as LeafletMap,  } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, ZoomControl, Marker, Popup  } from "react-leaflet";
import MarkerClusterGroup  from 'react-leaflet-cluster/lib/index'
import markeSVG from "./marker"
import { selectFilter, seacrhFilter } from "@/redux/features/projectsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { districtsData } from "../../../public/data/District";
import {viewProject} from "@/redux/features/projectsSlice";

import Image from "next/image";


import "leaflet/dist/leaflet.css"
import change_icon from "../../../public/icons/circle_left.png"
import layer_icon from "../../../public/icons/layers.png"
import layer_icon2 from "../../../public/icons/layers2.png"

import markerIcon from './marker_icon.svg'
import { districts } from "./Geojsons"

import { Projectinterface } from "@/app/interfaces/ProjectInterface";


import uca_card from "../../../public/images/media/uca/UCA_Photo_1.jpg"
import dairy from "../../../public/images/media/dairy/Khuf_1_Photo_1.jpg"
import entrepreneurship_center from "../../../public/images/media/uca/UCA_Photo_1.jpg"
// import foodSafety from "../../../public/images/media/uca/UCA_Photo_1.png"
import gosstand from "../../../public/images/media/gosstand/Gos_st_Photo_1.jpg"


import vegetable from "../../../public/images/media/vegetable/Derzud_Photo_2.jpg"
import TVETCentre from "../../../public/images/media/tvetcentre/tvet_uca_Photo_1.jpg"
import zindagi from "../../../public/images/media/cooperativezindagi/Coop - zind_Photo_1.jpg"
import gosstandBazar from "../../../public/images/media/foodsafety/Food_lab_Photo_1.jpg"
import parshed from "../../../public/images/media/parshed/Parshed_Photo_1.jpg"
import cashmire from "../../../public/images/media/cashmire/Cashmire_Photo_1.jpg"
import zanuthj from "../../../public/images/media/zanuthj/Zanuthj_Photo_1.jpg"

import { useRouter } from "next/navigation";



export default function Map() {


  const router = useRouter();

  const cardImages:any = {uca: uca_card, dairy: dairy, entrepreneurship_center, gosstand, vegetable, TVETCentre, zindagi, gosstandBazar, parshed, cashmire, zanuthj};


  const mapRef = useRef<LeafletMap>(null);

  const southWest = new LatLng(36.672811, 67.335296);
  const northEast = new LatLng(40.000000, 75.150703);
  const bounds = new LatLngBounds(southWest, northEast);

  const [orthphoto, setOrthphoto] = useState(false);
  const [zooming, setZooming] = useState(8);

  const [styleG, setStyleG] = useState();
  const [fitBoundsV, setFitBoundsV] = useState(bounds)
  const state:any = useAppSelector((state) => state.ProjectsReducer);
  // const ucaLoc = new LatLng(37.492002,71.544383);
  const stateLang:any = useAppSelector((state) => state.LanguageReducer);
  const dispatch = useAppDispatch();

  const [projects, setProjects] = useState<Projectinterface[]>(
    state.filteredData
  );
  const [lang, setlang] = useState<String>(
    stateLang.language
  );

  useEffect(() => {
    setlang(stateLang.language)
  }, [stateLang.language]);

  const iconPerson = new L.Icon({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon.src,
    iconSize: new L.Point(30, 30),
    // className: 'leaflet-div-icon'
  });
  



  const handleSelectFilter = (value: number) => {

    let districtName = "";
    districtsData.features.forEach(el => {if(el.properties.district == value) districtName = el.properties.district_name})
    dispatch(selectFilter(districtName));
    console.log('marker click', districtName)

  };


  // const handleSearchFilter = (event: any) => {
  //   dispatch(seacrhFilter(event.target.value));
  // };


  useEffect(() => {
    if (state.filteredData.length < 1) {
      setProjects(state.projects);
    } else {
      setProjects(state.filteredData);
    }
  }, [projects, state.projects, state.filteredData]);

  const zoom = zooming;
  const defaultStyle = {
    fillColor: "gray", // Change this to the desired default fill color
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
  
  const handleGeoJSONClick = (feature: any, layer: any) => {
    if (feature?.properties?.region === 4) {
      layer.on({
        // mouseover: highlightFeature,
        // mouseout: resetHighlight,
        click: () => {
          if(mapRef.current)
          mapRef.current.fitBounds(layer.getBounds());
          console.log(feature.properties)
          dispatch(selectFilter(feature.properties.name))
          // event.target.setStyle(defaultStyle);
        },
        mouseover: undefined,
        mouseout: undefined
      });
      
    }
    const title = feature.properties.name;
    layer.bindTooltip(title); 
    // layer.classList.add('focusless')
  };


  return (
    <MapContainer
      ref={mapRef}
      id="map-gbao"
      className = "h-full w-[800px] max-w-full rounded-[30px] relative"
      center = {[36.861034, 72.276093]}
      zoom = {zoom}
      // scrollWheelZoom = {false}
      zoomControl = {false}
      maxBounds = {bounds}
      minZoom = {8}
    >
      <ZoomControl position="bottomright" /> 
     
         <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF6YXJraHVkb2V2IiwiYSI6ImNsampzeGx2NTBjYmMzbXFxaDBzeXEzcW8ifQ.TIi2ZR3-Vjj8mGghyIGchA"
          id='mapbox/satellite-streets-v12'
          attribution='Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          opacity={orthphoto?0.9:0.0}
        />
        <TileLayer
          url="https://tile.openstreetmap.org-/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          opacity={orthphoto?0.8:0.0}
        />
      
      <MarkerClusterGroup
        chunkedLoading
        onClick={(ev:any) => {console.log(ev)}}
        
      >
        {projects.map((project, index) => (
          <Marker
            key={index}
            position={project.location}
            // title={project.name_en}
            icon={iconPerson}
            eventHandlers={{
              click: (e) => {
                handleSelectFilter(project.district_id)
              }
            }}
          >
          <Popup className="w-[300px]  ">
            <div className="flex flex-col ">
               <Image className="w-full " src={cardImages[project.banner_url]} alt="project"></Image>
               <div className="">
                  <h5 className="text-lg">{lang=="en"?project.name_en:lang=="ru"?project.name_ru:lang=="tj"?project.name_tj:project.name_de}</h5>
                  <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>                 
                   <p>{districts.features.filter((el:any) => {if(el.properties.district == project.district_id) return el})[0].properties.name}</p>
                  </div>
                  <button
                    className="px-2 py-1 bg-orange-600 rounded-[5px] mt-2 text-white"
                    onClick={() => { 
                      dispatch(viewProject(project));
                      
                      router.push('./project', { scroll: false })
                    }}>
                    read more
                  </button>
               </div>
               
            </div>
          </Popup>

          </Marker>
        ))}
      </MarkerClusterGroup>
      {/* <Marker position={ucaLoc} >
       
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      </Marker> */}
      <GeoJSON
        style={(feature) => {
          return {
              fillColor: feature?.properties.color,
              weight: orthphoto?5:2,
              opacity: 1,
              color: "white",
              dashArray: "3",
              fillOpacity: orthphoto?0.2:0.7,
            }
          }
        }
        data={districts}
        onEachFeature={handleGeoJSONClick}
      />

      <div className="flex flex-col text-lg justify-end absolute right-[10px] bottom-[120px] z-[1000] gap-1" >
          
        <button className="w-[40px] bg-[white] px-2 py-2  rounded-[10px]" onClick={() => {setOrthphoto(!orthphoto)}}>
          <Image className="h-[100%] w-[100%]" src={orthphoto?layer_icon:layer_icon2} alt="Picture of the author" />
        </button>
        {/* <button className="w-[40px] bg-[white] px-2 py-2  rounded-[10px]" onClick={()=>{ setZooming(8)}}>
          <Image className="h-[100%] w-[100%]" src={change_icon} alt="Picture of the author" />
        </button> */}

      </div>

    </MapContainer>
  );




}



// onEachFeature={(feature, layer) => {
//   if (feature.properties.region === 4) {
//     layer.on({
//       mouseover: (e) => { var layer = e.target;
//         layer.setStyle({
//           weight: 2,
//           color: "#666",
//           dashArray: "",
//           fillOpacity: 0.9,
//         });},
//       mouseout: (e) => {
//         var layer = e.target;

//         layer.setStyle({
//           weight: 1,
//           color: "#666",
//           dashArray: "",
//           fillOpacity: 0.7,
//         });
      
//         // resetStyle(layer);
//       },
//       click: {(e) => {
//         map.fitBounds(e.target.getBounds());
//       }},
//     });
//   }
// }}