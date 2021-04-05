import { useState } from "react";
import dayJS from "dayjs";

import CSS from "./actualCal.module.css";

import CalendarDay from "../CalendarDay/CalendarDay";

import CurrentGoals from "../../pages/CurrentGoals/CurrentGoals";

// import Fonts
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ActualCalendar({
  uiMonth,
  setUIMonth,
  uiYear,
  setUIYear,
  dates,
  columns,
  isWhere,
  setIsWhere,
  chosenDate,
  setChosenDate,
}) {
  return (
    <div>
      <div className={`${CSS.flex} ${CSS.monthDisplay}`}>
        <FontAwesomeIcon
          className={CSS.arrows}
          onClick={() => {
            const month = uiMonth;
            const year = uiYear;
            if (month === 0) {
              setUIYear(year - 1);
            }
            setUIMonth(dayJS().month(month - 1).$M);
          }}
          icon={faArrowAltCircleLeft}
        ></FontAwesomeIcon>

        <div className={CSS.title}>
          {uiMonth === 0
            ? "January"
            : uiMonth === 1
            ? "February"
            : uiMonth === 2
            ? "March"
            : uiMonth === 3
            ? "April"
            : uiMonth === 4
            ? "May"
            : uiMonth === 5
            ? "June"
            : uiMonth === 6
            ? "July"
            : uiMonth === 7
            ? "August"
            : uiMonth === 8
            ? "September"
            : uiMonth === 9
            ? "October"
            : uiMonth === 10
            ? "November"
            : uiMonth === 11
            ? "December"
            : ""}{" "}
          {uiYear}
        </div>

        <FontAwesomeIcon
          className={CSS.arrows}
          onClick={() => {
            const month = uiMonth;
            const year = uiYear;
            if (month === 11) {
              setUIYear(year + 1);
            }
            setUIMonth(dayJS().month(month + 1).$M);
          }}
          icon={faArrowAltCircleRight}
        ></FontAwesomeIcon>
      </div>

      <div className={` ${CSS.width80}`}>
        {dates[0].map((index) => {
          return (
            <div className={CSS.widthFull}>
              <div className={CSS.days}>{index}</div>
              {dates[1] ? (
                columns.map((num) => {
                  return (
                    <CalendarDay
                      uiMonth={uiMonth}
                      isWeekThere={dates[num]}
                      alignDays={index}
                      isWhere={isWhere}
                      setIsWhere={setIsWhere}
                      chosenDate={chosenDate}
                      setChosenDate={setChosenDate}
                    ></CalendarDay>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActualCalendar;
