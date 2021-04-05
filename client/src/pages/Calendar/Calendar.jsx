import { useState, useEffect } from "react";

import dayJS from "dayjs";
import CSS from "./calendar.module.css";

// import Fonts
import { faArrowAltCircleRight, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Calendar() {
  const [dates, setDates] = useState([["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]]);
  const [columns, setColumns] = useState([1, 2, 3, 4, 5]);
  const [uiMonth, setUIMonth] = useState(dayJS().month());
  const [uiYear, setUIYear] = useState(dayJS().year());

  useEffect(() => {
    const month = dayJS().month();
    const daysInMonth = dayJS().daysInMonth();
    const year = dayJS().year();

    let wholeMonth = [];
    let row = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const DayOfMonth = dayJS(`${year}-${month + 1}-${i}`);
      const dow = DayOfMonth.day();
      // console.log(DayOfMonth.format("ddd"));
      // console.log(DayOfMonth.date(), DayOfMonth.daysInMonth());

      if (DayOfMonth.date() === DayOfMonth.daysInMonth()) {
        row.push(DayOfMonth);
        wholeMonth.push(row);
      } else if (dow !== 0) {
        row.push(DayOfMonth);
      } else {
        wholeMonth.push(row);
        row = [];
        row.push(DayOfMonth);
      }
    }

    if (wholeMonth[0].length < 8) {
      // console.log("fill in the rest from the prev Month");
      const iterations = 7 - wholeMonth[0].length;
      console.log(iterations);
      for (let i = 0; i < iterations; i++) {
        const DayOfPrevMonth = dayJS(
          `${year}-${month}-${dayJS().month(month).daysInMonth() - i + 1}`
        );
        // console.log(dayJS(`${year}-${month}-${i}`))
        wholeMonth[0].unshift(DayOfPrevMonth);
      }
    }

    if (wholeMonth[wholeMonth.length - 1].length < 8) {
      console.log("fill in the rest from the next month");
      const iterations = 7 - wholeMonth[wholeMonth.length - 1].length;
      console.log(iterations);

      for (let i = 0; i < iterations; i++) {
        const DayOfNextMonth = dayJS(`${year}-${month + 2}-${i + 1}`);
        // console.log(dayJS(`${year}-${month}-${i}`))
        wholeMonth[wholeMonth.length - 1].push(DayOfNextMonth);
      }
    }

    wholeMonth.unshift(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    console.log(wholeMonth);
    setDates(wholeMonth);
  }, []);

  useEffect(() => {
    console.log(dates);
  }, []);

  return (
    <div>
      <div className={`${CSS.flex} ${CSS.monthDisplay}`}>
        <FontAwesomeIcon className={CSS.arrows} icon={faArrowAltCircleLeft}></FontAwesomeIcon>
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
        <FontAwesomeIcon className={CSS.arrows} icon={faArrowAltCircleRight}></FontAwesomeIcon>
      </div>
      <div className={` ${CSS.width80}`}>
        {/* <div className={`${CSS.btn}`}></div> */}

        {dates[0].map((index) => {
          return (
            <div className={CSS.widthFull}>
              <div className={CSS.days}>{index}</div>
              {dates[1] ? (
                columns.map((num) => {
                  return (
                    <div
                      className={`${CSS.days} ${
                        dates[num][
                          index === "Sun"
                            ? 0
                            : index === "Mon"
                            ? 1
                            : index === "Tue"
                            ? 2
                            : index === "Wed"
                            ? 3
                            : index === "Thu"
                            ? 4
                            : index === "Fri"
                            ? 5
                            : 6
                        ].$M === uiMonth
                          ? CSS.dateNum
                          : CSS.notInMonth
                      }`}
                    >
                      {
                        dates[num][
                          index === "Sun"
                            ? 0
                            : index === "Mon"
                            ? 1
                            : index === "Tue"
                            ? 2
                            : index === "Wed"
                            ? 3
                            : index === "Thu"
                            ? 4
                            : index === "Fri"
                            ? 5
                            : 6
                        ].$D
                      }
                    </div>
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

export default Calendar;
