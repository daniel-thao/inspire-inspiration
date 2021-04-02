import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import dayJS from "dayjs";
import gsap from "gsap";

import CSS from "./cg.module.css";

import Goal from "../../components/Goal/Goal";
import MediaQueryContext from "../../contexts/MediaQueryContext";

function CurrentGoals({ urlLocation }) {
  const { user } = useAuth0();
  const [goals, setGoals] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [whichDescription, setWhichDescription] = useState("");
  const { mediaQuery, setMediaQuery } = useContext(MediaQueryContext);
  const [today, setToday] = useState(dayJS().format("MM/DD/YYYY"));

  async function checkAndPopulate() {
    const check = await axios
      .put("/api/users/exists", user)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(check);

    if (check.data === "newUser") {
      return await axios.post("/api/users/register", user).catch((error) => console.log(error));
    } else {
      const userData = await axios
        .put("/api/users/findOne", user)
        .then((res) => res)
        .catch((error) => console.log(error));

      // console.log(userData.data.goals);

      if (userData.data !== null) {
        // Then we will loop through all of the goals of the user

        // Then we are going to push the results of a fetch request into our new array above
        // This fetch request is checking to see if the date key of all goals matches the moment date for today
        const currentGoals = await axios
          .put(`/api/goals/findAllViaDate/`, { date: userData.data.goals.createdOn })
          .then((res) => res.data);

        // console.log(currentGoals);

        setGoals(currentGoals);
      }
    }
  }

  useEffect(() => {
    // Check if user & create user & populate their goals
    // console.log(goals);
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
        {goals.length > 0 ? (
          goals.map((index) => (
            <Goal
              key={index.systemDate}
              iden="homeGoalPopulate"
              title={index.title}
              isChecked={index.checked}
              tag={index.tag}
              description={index.description}
              setWhichDescription={setWhichDescription}
              id={index._id}
            ></Goal>
          ))
        ) : (
          <></>
        )}
        <div className={CSS.extraPadding}></div>
      </div>
      {mediaQuery > 414 ? <div className={CSS.extraSpace}></div> : <></>}
      {/* <div className={CSS.extraSpace}></div> */}
    </div>
  );
}

export default CurrentGoals;
