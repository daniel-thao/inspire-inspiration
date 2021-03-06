import PropTypes from "prop-types";
import dayjs from "dayjs";
import times from "lodash.times";

import "./styles.css";

const labels = ["Su", "Mo", "Tu", "Wd", "Th", "Fr", "Sa"];

const DayCell = ({
  date,
  current,
  selectedDate,
  disablePast,
  onClick,
  ...others
}) => {
  const d = date;
  const today = dayjs();
  const isCurrentMonth = d.month() === current.month();
  const isDisabled =
    (disablePast && date.isBefore(today) && !date.isSame(today, "day")) ||
    !isCurrentMonth;
  const { className, ...rest } = others;

  let klassName = "day";
  if (d.isSame(today, "day")) klassName += ` today`;
  if (d.isSame(selectedDate)) klassName += ` selected`;
  if (className) klassName += ` ${className}`;

  const props = {
    onClick: () => !isDisabled && onClick(d),
    disabled: isDisabled ? "disabled" : undefined,
    className: klassName,
    ...rest
  };
  return <td {...props}>{d.format("D")}</td>;
};

class DatePicker extends React.Component {
  static propTypes = {
    date: PropTypes.date
  };

  state = {
    date: (this.props.date && dayjs(this.props.date)) || dayjs(),
    selectedDate: null
  };

  render() {
    const { date, selectedDate } = this.state;
    const year = date.year();
    const rows = generateDateRows(date);

    return (
      <div>
        <div>
          <strong>Date: </strong> {date.format("MMM")} {year}
        </div>

        <button onClick={() => this.changeMonth(-1)}>Prev Month</button>
        <button onClick={() => this.changeMonth(1)}>Next Month</button>

        <table className="calendar" cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              {labels.map(label => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((d, i) => (
                  <DayCell
                    date={d}
                    current={date}
                    selectedDate={selectedDate}
                    key={i}
                    disablePast
                    onClick={this.clickedDate}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  clickedDate = date => {
    this.setState({ selectedDate: date.clone() });
  };

  changeMonth = by => {
    const { date } = this.state;

    let newDate;
    if (by > 0) {
      newDate = date.clone().add(1, "month");
    } else {
      newDate = date.clone().subtract(1, "month");
    }
    this.setState({ date: newDate });
  };
}

/**
 * This beast generates a multi-dimensional array of dates,
 * dayjs date objects to be exact.
 * It takes a date and generates
 *
 * @param [dayjs] date
 * @return Array<Array<dayjs>>
 */
const generateDateRows = date => {
  const year = date.year();
  const daysInMonth = date.daysInMonth();
  const rows = [[]];
  let rowIndex = 0;

  // fill in initial rows
  times(daysInMonth, num => {
    const temp = dayjs(new Date(year, date.month(), num + 1));
    const dow = temp.day();
    rows[rowIndex].push(temp);
    if (dow === 6 && num !== daysInMonth - 1) {
      rowIndex += 1;
      rows.push([]);
    }
  });

  const rowLen = rows.length;
  const firstRow = rows[0];

  // backfill days from prev month in first week of month
  if (firstRow.length !== 7) {
    const backfillBy = 7 - firstRow.length;
    const first = firstRow[0];

    times(backfillBy, num => {
      const d = first
        .clone()
        .startOf("week")
        .add(num, "day");
      firstRow.splice(num, 0, d);
    });
  }

  // frontfill days from next month in last week of month
  const lastRow = rows[rowLen - 1];
  if (lastRow.length !== 7) {
    const fillBy = 7 - lastRow.length;
    const lastLen = lastRow.length;
    const last = lastRow[lastLen - 1];

    times(fillBy, num => {
      const d = last.clone().add(num + 1, "day");
      lastRow.push(d);
    });
  }

  return rows;
};

// function App() {
//   return (
//     <div className="App">
//       <DatePicker />
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
