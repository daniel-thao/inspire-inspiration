import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


import Video from "../../components/Video/Video";
import CurrentGoals from "../../pages/CurrentGoals/CurrentGoals";
import AddGoals from "../../pages/AddGoal/AddGoal";
import Calendar from "../../pages/Calendar/Calendar";
import Settings from "../../pages/Settings/Settings";
import Nav from "../../components/Nav/Nav";

import CSS from "./layout.module.css";
import "../../App.css";

function LayoutGoals() {
  const { logout } = useAuth0();
  const [urlLocation, setUrlLocation] = useState(
    window.location.pathname === "/goals"
      ? "home"
      : window.location.pathname === "/goals/add"
      ? "addGoals"
      : "home"
  );

  return (
    <div className={`maxWidth flexRow justifyCenter scrollHidden`}>
      <div className={`${CSS.boundrary}`}>
        <Video></Video>
        <div className={CSS.container}>
          {urlLocation === "home" ? (
            <CurrentGoals className={CSS.container}></CurrentGoals>
          ) : urlLocation === "addGoal" ? (
            <AddGoals setUrlLocation={setUrlLocation} ></AddGoals>
          ) : urlLocation === "calendar" ? (
            <Calendar></Calendar>
          ) : urlLocation === "settings" ? (
            <Settings></Settings>
          ) : (
            <></>
          )}
        </div>
        <Nav urlLocation={urlLocation} setUrlLocation={setUrlLocation}></Nav>
      </div>
    </div>
  );
}

export default LayoutGoals;
