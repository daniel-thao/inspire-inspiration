import dayJS from "dayjs";


export function calPop(uiMonth, uiYear, setDates) {
    const month = uiMonth;
    const daysInMonth = dayJS().month(uiMonth).daysInMonth();
    const year = uiYear;

    let wholeMonth = [];
    let row = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const DayOfMonth = dayJS(`${year}-${month + 1}-${i}`);
      const dow = DayOfMonth.day();
      // console.log(DayOfMonth.format("ddd"));
      // console.log(DayOfMonth.date(), DayOfMonth.daysInMonth());

      if (DayOfMonth.date() === DayOfMonth.daysInMonth() && dow === 0) {
        if (row.length === 7) {
          wholeMonth.push(row);
        }
        row = [];
        row.push(DayOfMonth);
        wholeMonth.push(row);
      } else if (DayOfMonth.date() === DayOfMonth.daysInMonth()) {
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

    // console.log(wholeMonth);
    if (wholeMonth[0].length < 8) {
      const iterations = 7 - wholeMonth[0].length;

      for (let i = 0; i < iterations; i++) {
        const DayOfPrevMonth = dayJS(
          `${year}-${month}-${
            dayJS()
              .month(month - 1)
              .daysInMonth() - i
          }`
        );
        // console.log(dayJS().month(month - 1), "month");
        // console.log(DayOfPrevMonth);
        // console.log(dayJS().month(month));
        // console.log(dayJS(`${year}-${month}-${i}`))
        wholeMonth[0].unshift(DayOfPrevMonth);
      }
    }

    if (wholeMonth[wholeMonth.length - 1].length < 8) {
      const iterations = 7 - wholeMonth[wholeMonth.length - 1].length;

      for (let i = 0; i < iterations; i++) {
        const DayOfNextMonth = dayJS(`${year}-${month + 2}-${i + 1}`);
        // console.log(dayJS(`${year}-${month + 2}`));
        // console.log(dayJS().month(month + 1), "month");
        // console.log(DayOfNextMonth);
        // console.log(dayJS(`${year}-${month}-${i}`))
        wholeMonth[wholeMonth.length - 1].push(DayOfNextMonth);
      }
    }

    wholeMonth.unshift(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    // console.log(wholeMonth);
    setDates(wholeMonth);
  }