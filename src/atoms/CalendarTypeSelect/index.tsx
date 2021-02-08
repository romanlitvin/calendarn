import React, { useCallback } from "react";

import { useHistory } from "react-router-dom";

import "./styles.scss";
import { useCalendar } from "../../context/Calendar/calendarContext";
import { TCalendarTypes } from "../../context/Calendar/CalendarProvider";

const selectTypes = ["Year", "Month", "Week", "Day"];

const CalendarTypeSelect: React.FC = () => {
  const { setCalendarType, activeCalendarType } = useCalendar();
  const { push } = useHistory();

  const getContainerClassName = useCallback(
    (calendarType: TCalendarTypes): string =>
      calendarType === activeCalendarType
        ? "activeButtonContainer"
        : "buttonContainer",
    [activeCalendarType],
  );

  const getLabelClassName = useCallback(
    (calendarType: TCalendarTypes): string =>
      calendarType === activeCalendarType ? "activeButtonLabel" : "buttonLabel",
    [activeCalendarType],
  );

  const setCalendarTypeWrapper = useCallback(
    (calendarType: TCalendarTypes) => () => {
      if (calendarType === 0) {
        push("/calnedarn/monthYear");
      }
      if (calendarType === 1) {
        push("/calnedarn/singleMonth");
      }
      setCalendarType(calendarType);
    },
    [push, setCalendarType],
  );

  return (
    <div className={"calendarTypeSelectContainer"}>
      {selectTypes.map((calendarTypeLabel, index) => (
        <div
          onClick={setCalendarTypeWrapper(index as TCalendarTypes)}
          key={calendarTypeLabel}
          className={getContainerClassName(index as TCalendarTypes)}>
          <p className={getLabelClassName(index as TCalendarTypes)}>
            {calendarTypeLabel}
          </p>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CalendarTypeSelect);
