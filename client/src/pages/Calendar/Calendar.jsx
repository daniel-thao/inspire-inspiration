import { useState, useEffect } from "react";

import dayJS from "dayjs";
import CSS from "./calendar.module.css";
// Util Functions
import { calPop } from "./calUtil";

// Components
import ActualCalendar from "../../components/ActualCalendar/ActualCalendar";

import CurrentGoals from "../../pages/CurrentGoals/CurrentGoals";
import AddGoal from "../../pages/AddGoal/AddGoal";

function Calendar({ urlLocation, setUrlLocation }) {
  const [isWhere, setIsWhere] = useState("ActualCalender");
  const [dates, setDates] = useState([["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]]);
  const [columns, setColumns] = useState([1, 2, 3, 4, 5, 6]);
  const [uiMonth, setUIMonth] = useState(dayJS().month());
  const [uiYear, setUIYear] = useState(dayJS().month(uiMonth).year());
  const [chosenDate, setChosenDate] = useState("");

  useEffect(() => {
    calPop(uiMonth, uiYear, setDates);
  }, [uiMonth]);

  return (
    <>
      {isWhere === "ActualCalender" ? (
        <ActualCalendar
          uiMonth={uiMonth}
          setUIMonth={setUIMonth}
          uiYear={uiYear}
          setUIYear={setUIYear}
          dates={dates}
          columns={columns}
          isWhere={isWhere}
          setIsWhere={setIsWhere}
          chosenDate={chosenDate}
          setChosenDate={setChosenDate}
        ></ActualCalendar>
      ) : isWhere === "Add Goal On Specfic Date" ? (
        <AddGoal
          chosenDate={chosenDate}
          setChosenDate={setChosenDate}
          isWhere={isWhere}
          setIsWhere={setIsWhere}
          urlLocation={urlLocation}
          setUrlLocation={setUrlLocation}
        ></AddGoal>
      ) : isWhere === "Chosen Specific Date" ? (
        <CurrentGoals
          chosenDate={chosenDate}
          setChosenDate={setChosenDate}
          isWhere={isWhere}
          setIsWhere={setIsWhere}
          urlLocation={urlLocation}
          setUrlLocation={setUrlLocation}
        ></CurrentGoals>
      ) : (
        <></>
      )}
    </>
  );
}

export default Calendar;
