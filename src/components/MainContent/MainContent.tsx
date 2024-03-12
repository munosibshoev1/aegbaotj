import Map from "../Map/index";
import Projects from "../Projects/Projects";

import "./MainContent.css"

export default function MainContent() {
  return (
    <div
      id="projects"
      className="flex items-start justify-between h-[700px] gap-10 px-28 pt-[50px] pb-[100px]"
    >
      <Projects />
      <Map/>
    </div>
  );
}
