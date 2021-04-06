import CSS from "./calDay.module.css";

function CalendarDay(props) {
  return (
    <div
      className={`${CSS.days} ${
        props.isWeekThere
          ? props.isWeekThere[
              props.alignDays === "Sun"
                ? 0
                : props.alignDays === "Mon"
                ? 1
                : props.alignDays === "Tue"
                ? 2
                : props.alignDays === "Wed"
                ? 3
                : props.alignDays === "Thu"
                ? 4
                : props.alignDays === "Fri"
                ? 5
                : 6
            ].$M === props.uiMonth
            ? CSS.dateNum
            : CSS.notInMonth
          : ""
      }`}
      onClick={(e) => {
        // console.log(e.target.classList);
        if (e.target.classList[1] === CSS.notInMonth) {
          return;
        }
        // console.log(props.isWhere);
        const dateClicked = props.isWeekThere[
          props.alignDays === "Sun"
            ? 0
            : props.alignDays === "Mon"
            ? 1
            : props.alignDays === "Tue"
            ? 2
            : props.alignDays === "Wed"
            ? 3
            : props.alignDays === "Thu"
            ? 4
            : props.alignDays === "Fri"
            ? 5
            : 6
        ].$d
          .toString()
          .substr(4, 11)
          .split(" ")
          .join("/");

          props.setChosenDate(dateClicked)
          props.setIsWhere("Chosen Specific Date")

        // console.log(dateClicked);
      }}
    >
      {props.isWeekThere
        ? props.isWeekThere[
            props.alignDays === "Sun"
              ? 0
              : props.alignDays === "Mon"
              ? 1
              : props.alignDays === "Tue"
              ? 2
              : props.alignDays === "Wed"
              ? 3
              : props.alignDays === "Thu"
              ? 4
              : props.alignDays === "Fri"
              ? 5
              : 6
          ].$D
        : ""}
    </div>
  );
}

export default CalendarDay;
