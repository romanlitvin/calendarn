import React, { useCallback, useMemo, useRef } from "react";

import { Moment } from "moment";

import "./styles.scss";

import TimeUtils, { IOutcomeMonthDates } from "../../../../utils/TimeUtils";
import { TCalendarEvent } from "../../../../types";

interface IProps extends IOutcomeMonthDates {
  cellIndex: number;
  isToday: boolean;
  onClick: (onDateToCreate: Moment) => void;
  calendarEvent: TCalendarEvent | null;
  openTooltipModal: (cellId: string, calendarEvent: TCalendarEvent | null) => void;
}

const MonthSingleCell: React.FC<IProps> = ({
  cellIndex,
  isCurrent,
  isPrev,
  isNext,
  isWeekend,
  isToday,
  date,
  isFirstDayOfMonth,
  onClick,
  calendarEvent,
  openTooltipModal,
}) => {
  const cellId = useRef<string>(`${cellIndex}-month-cell-id`).current;
  const cellLabelClassName = useMemo(() => {
    if (isToday) {
      return "cellDateToday";
    }
    if (isPrev || isNext) {
      return "cellDateDisabled";
    }
    if (isWeekend && isCurrent) {
      return "cellDateWeekend";
    }
    return "cellDate";
  }, [isCurrent, isNext, isPrev, isToday, isWeekend]);

  const cellContainerClassName = useMemo(() => {
    if ((cellIndex + 2) % 7 === 0 || (cellIndex + 1) % 7 === 0) {
      return "cellWeekend";
    }
    return "cell";
  }, [cellIndex]);

  const outputDate = date.get("date");
  const outputMonth = date.get("month");

  const onClickWrapper = useCallback(() => onClick(date), [date, onClick]);

  const Label = (
    <p onClick={onClickWrapper} className={cellLabelClassName}>
      {isFirstDayOfMonth
        ? `${outputDate} ${TimeUtils.monthsShort()[outputMonth]}`
        : outputDate}
    </p>
  );

  const openTooltipModalWrapper = useCallback(
    () => openTooltipModal(cellId, calendarEvent),
    [openTooltipModal, cellId, calendarEvent],
  );

  return (
    <div id={cellId} className={cellContainerClassName}>
      {isToday ? <div className={"todayDateContainer"}>{Label}</div> : Label}
      {calendarEvent && (
        <p
          onDoubleClick={openTooltipModalWrapper}
          className={"calendarEventLabel"}>
          {calendarEvent.summary}
        </p>
      )}
    </div>
  );
};

export default React.memo(MonthSingleCell);
