import React, { useCallback, useMemo, useRef, useState } from "react";

import "./styles.scss";

import TimeUtils from "../../utils/TimeUtils";
import { useCalendar } from "../../context/Calendar/calendarContext";
import { useCreateEvent } from "../../context/CreateEvent/createEventContext";
import { useGoogleEvents } from "../../context/GoogleEvents/googleEventsContext";

import MonthSingleCell from "./atoms/MonthSingleCell";
import ModalBase from "../../atoms/Modals/ModalBase";
import CalendarEventTooltipModal from "../../atoms/Modals/CalendarEventTooltipModal";

import { TCalendarEvent } from "../../types";

const MonthSingle: React.FC = () => {
  const [calendarEventToolTipConfig, setCalendarEventToolTipConfig] = useState<{
    elementId: string;
    calendarEvent: TCalendarEvent | null;
  }>({ elementId: "", calendarEvent: null });
  const tooltipModalRef = useRef<ModalBase>(null);
  const { currentDate, isToday } = useCalendar();
  const { openCreateEventModal } = useCreateEvent();
  const { findGoogleEventByDate } = useGoogleEvents();

  const currentMonth = currentDate.get("month");
  const currentYear = currentDate.get("year");

  const monthDates = useMemo(
    () => TimeUtils.getMonthDays(currentMonth, currentYear),
    [currentMonth, currentYear],
  );

  const openTooltip = useCallback(
    (cellId: string, calendarEvent: TCalendarEvent | null) => {
      setCalendarEventToolTipConfig({
        elementId: cellId,
        calendarEvent,
      });
      tooltipModalRef.current?.openModalDialog();
    },
    [],
  );

  return (
    <div className={"tableContainer"}>
      <CalendarEventTooltipModal
        {...calendarEventToolTipConfig}
        ref={tooltipModalRef}
      />
      <div className={"weekDaysContainer"}>
        {TimeUtils.getDayWeeksShorten().map((weekDayName) => (
          <div key={`weekDayCell${weekDayName}`} className={"weekDayCell"}>
            <p className={"weekDayCellLabel"}>{weekDayName}</p>
          </div>
        ))}
      </div>
      {monthDates.map((monthDate, index) => {
        const checkTodayDate = monthDate.isCurrent && isToday(monthDate.date);
        const calendarEvent = findGoogleEventByDate(monthDate.date) || null;
        return (
          <MonthSingleCell
            {...monthDate}
            openTooltipModal={openTooltip}
            calendarEvent={calendarEvent}
            onClick={openCreateEventModal}
            cellIndex={index}
            isToday={checkTodayDate}
            key={`table-cell-${index}`}
          />
        );
      })}
    </div>
  );
};

export default React.memo(MonthSingle);
