import React, { useMemo } from "react";

import "./styles.scss";

import CalendarTypeSelect from "../CalendarTypeSelect";
import DateSelector from "../DateSelector";

import { useCalendar } from "../../context/Calendar/calendarContext";
import TimeUtils from "../../utils/TimeUtils";

const CalendarHeader: React.FC = () => {
  const { currentDate, activeCalendarType } = useCalendar();

  const headerTitle = useMemo(() => {
    if (activeCalendarType === 0) {
      return `${currentDate.get("year")}`;
    }
    if (activeCalendarType === 1) {
      return `${TimeUtils.months()[currentDate.get("month")]} ${currentDate.get(
        "year",
      )}`;
    }
    return "";
  }, [activeCalendarType, currentDate]);

  return (
    <div className={"headerContainer"}>
      <div className={"headerSubContainer"}>
        <p className={"headerTitle"}>{headerTitle}</p>
      </div>
      <div className={"headerSubContainer"}>
        <CalendarTypeSelect />
      </div>
      <div className={"headerSubContainer"}>
        <DateSelector />
      </div>
    </div>
  );
};

export default React.memo(CalendarHeader);
