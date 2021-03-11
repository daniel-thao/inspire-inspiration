import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import dayJS from "dayjs";
import gsap from "gsap";

import CSS from "./cg.module.css";

import Goal from "../../components/Goal/Goal";
import ScrollContext from "../../contexts/ScrollContext";

function CurrentGoals() {
  const { user } = useAuth0();
  const [goals, setGoals] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [whichDescription, setWhichDescription] = useState("");

  async function checkAndPopulate() {
    const check = await axios
      .put("/api/users/exists", user)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });

    if (check.data === null) {
      return await axios.post("/api/users/register", user).catch((error) => console.log(error));
    } else {
      const userData = await axios
        .put("/api/users/findOne", user)
        .then((res) => res)
        .catch((error) => console.log(error));

      const currentGoals = [];
      // Then we will loop through all of the goals of the user
      for (let i = 0; i < userData.data.goals.length; i++) {
        // Then we are going to push the results of a fetch request into our new array above
        // This fetch request is checking to see if the date key of all goals matches the moment date for today
        currentGoals.push(
          await axios.get(`/api/goals/findOne/${userData.data.goals[i]}`).then((res) => res.data)
        );

        Promise.all(currentGoals).then(function (updateState) {
          setGoals(updateState);
        });
      }
    }
  }

  useEffect(() => {
    // Check if user & create user & populate their goals
    checkAndPopulate();
  }, []);

  useEffect(() => {
    gsap.to(`.${CSS.pseudoScroll}`, { top: `${scrollPosition / 2.02}%` });
  }, [scrollPosition]);

  return (
    <div className={CSS.container}>
      <div className={CSS.pseudoScroll}></div>

      <div
        className={`${CSS.goalSection}`}
        onScroll={(e) => {
          const difference = e.target.scrollHeight - e.target.clientHeight;
          const position = e.target.scrollTop / difference;
          const botNum = Math.trunc(position * 100);

          if (botNum === 1) {
            setScrollPosition(100);
          } else {
            setScrollPosition(botNum);
          }
        }}
      >
        <div className={`${CSS.introCard}`}>
          <h5 className={`${CSS.userName}`}>Hi {user.name}!</h5>
          <h4 className={`${CSS.todaysDate}`}>{dayJS().format("MMM DD, YYYY")}</h4>
        </div>

        <div className={`${whichDescription !== "" ? whichDescription : ""}`}>
          {whichDescription}
        </div>
        {goals.map((index) => (
          <Goal
            key={index[0].systemDate}
            iden="homeGoalPopulate"
            title={index[0].title}
            isChecked={index[0].checked}
            tag={index[0].tag}
            description={index[0].description}
            setWhichDescription={setWhichDescription}
          ></Goal>
        ))}
        <div className={CSS.extraPadding}></div>
      </div>
      {/* <div className={CSS.extraSpace}></div> */}
    </div>
  );
}

export default CurrentGoals;
