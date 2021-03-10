import { useState, useEffect } from "react";

import gsap from "gsap";
import CSS from "./goal.module.css";

// Import FontAwesome
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function checkOff(checked, setChecked) {
  if (checked) {
    // console.log(checked);
    setChecked(false);
  } else {
    // console.log(checked);
    setChecked(true);
  }
}

function Goal({ ...props }) {
  const [checked, setChecked] = useState(props.isChecked);
  // console.log(props);
  return (
    <div className={`${CSS.goalCard}`}>
      <h6>{props.title ? props.title : ""}</h6>
      <FontAwesomeIcon
        className={`${CSS.checkBtn} ${
          props.tag === "fitness"
            ? CSS.fitness
            : props.tag === "reading"
            ? CSS.reading
            : props.tag === "career"
            ? CSS.career
            : props.tag === "lifeStyle"
            ? CSS.lifeStyle
            : props.tag === "finance"
            ? CSS.finance
            : props.tag === "love"
            ? CSS.love
            : props.tag === "relationship"
            ? CSS.relationship
            : ""
        }`}
        icon={checked ? faCheckSquare : faSquare}
        onClick={() => {
          checkOff(checked, setChecked);
        }}
      ></FontAwesomeIcon>
    </div>
  );
}

export default Goal;
