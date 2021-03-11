import { useRef, useEffect } from "react";

import gsap from "gsap";

// Import FontAwesome
import { faCalendarAlt, faPlusSquare, faHome, faCogs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CSS from "./nav.module.css";

function Nav({ urlLocation, setUrlLocation }) {
  const refOne = useRef();
  const refTwo = useRef();
  const refThree = useRef();
  useEffect(() => {
    console.log(refOne);
    console.log(refTwo);
    console.log(refThree);

    // gsap.to(`.${CSS.locationHelper}`, { duration: 1, x: refTwo.current.offsetLeft });
  }, []);

  return (
    <div className={`${CSS.container}`}>
      <div className={`${CSS.locationHelper}`}></div>
      <div className={`${CSS.iconContainer}`}>
        <div
          ref={refOne}
          className={`${CSS.show}`}
          onClick={() => {
            setUrlLocation("calendar");
            gsap.to(`.${CSS.locationHelper}`, {
              duration: 0.5,
              ease: "circ.out",
              x: refOne.current.offsetLeft - 152,
            });
          }}
        >
          <FontAwesomeIcon className={`${CSS.icons}`} icon={faCalendarAlt}></FontAwesomeIcon>
        </div>

        <div
          ref={refTwo}
          className={`${CSS.show}`}
          onClick={() => {
            switch (urlLocation) {
              case "home":
                gsap.to(`.${CSS.locationHelper}`, { duration: 0, x: refTwo.current.offsetLeft - 152 });
                return setUrlLocation("addGoal");
              default:
                gsap.to(`.${CSS.locationHelper}`, {
                  duration: 0.5,
                  ease: "circ.out",
                  x: refTwo.current.offsetLeft - 152,
                });
                return setUrlLocation("home");
            }
          }}
        >
          <FontAwesomeIcon
            className={`${CSS.icons}`}
            icon={urlLocation === "home" ? faPlusSquare : faHome}
          ></FontAwesomeIcon>{" "}
        </div>

        <div
          ref={refThree}
          className={`${CSS.show}`}
          onClick={() => {
            setUrlLocation("settings");
            gsap.to(`.${CSS.locationHelper}`, {
              duration: 0.5,
              ease: "circ.out",
              x: refThree.current.offsetLeft - 152,
            });
          }}
        >
          <FontAwesomeIcon className={`${CSS.icons}`} icon={faCogs}></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}

export default Nav;
