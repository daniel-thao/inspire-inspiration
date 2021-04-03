import { useState, useEffect } from "react";

import dayJS from "dayjs";
import CSS from "./calendar.module.css";

function Calendar() {
  const [dates, setDates] = useState([
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ]);

  useEffect(() => {
    console.log(dates);
  }, [dates]);

  return (
    <div>
      <div
        className={`${CSS.btn}`}
        onClick={() => {
          setDates([["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]]);
          const month = dayJS().month();
          const daysInMonth = dayJS().daysInMonth();
          const year = dayJS().year();

          // console.log(dayJS().year());
          // console.log(dayJS().daysInMonth());
          // console.log(dayJS().month());
          let wholeMonth = [];
          for (let i = 1; i <= daysInMonth; i++) {
            // const temp = dayJS(new Date(year, month, i));
            const temp = dayJS(`${year}-${month + 1}-${i}`);
            const dow = temp.day();
            console.log(temp.format("ddd"));
            // console.log(dow);

            wholeMonth.push(temp);
            console.log(wholeMonth);
          }

          let row = [];
        }}
      ></div>
    </div>
  );
}

export default Calendar;
