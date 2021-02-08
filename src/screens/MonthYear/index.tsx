import React, { useMemo } from "react";

import "./styles.scss";

import MonthYearTitle from "./atoms/MonthYearTitle";
import MonthYearDay from "./atoms/MonthYearDay";
import MonthYearWeekDays from "./atoms/MonthYearWeekDays";

import TimeUtils from "../../utils/TimeUtils";
import { useCalendar } from "../../context/Calendar/calendarContext";
import { useCreateEvent } from "../../context/CreateEvent/createEventContext";

const months = TimeUtils.months();
const emptyMonthsLengthArr = [...Array(12)];

const MonthYear: React.FC = () => {
  const { currentDate, isToday } = useCalendar();
  const { openCreateEventModal } = useCreateEvent();

  const currentYear = currentDate.get("year");

  const daysOfMonth = useMemo(
    () =>
      emptyMonthsLengthArr.map((_, index) =>
        TimeUtils.getMonthDays(index, currentYear),
      ),
    [currentYear],
  );

  return (
    <div className={"monthYearContainer"}>
      {daysOfMonth.map((el, index) => (
        <div className={"wrapper"} key={`fragment-key${index}`}>
          <MonthYearTitle monthTitle={months[index]} />
          <MonthYearWeekDays />
          <div className={"daysContainer"}>
            {el.map(({ date, ...rest }, dayIndex) => {
              const dayOfMonth = date.get("date");
              const isCurrent = rest.isCurrent;

              return (
                <MonthYearDay
                  key={`${dayOfMonth}${dayIndex}`}
                  onClick={openCreateEventModal}
                  {...rest}
                  isToday={isCurrent && isToday(date)}
                  date={date}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MonthYear);
