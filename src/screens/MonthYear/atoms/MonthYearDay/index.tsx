import React, { useCallback, useMemo } from "react";

import "./styles.scss";
import { Moment } from "moment";

interface IProps {
  date: Moment;
  isToday: boolean;
  isNext: boolean;
  isPrev: boolean;
  isWeekend: boolean;
  isCurrent: boolean;
  onClick: (onDateToCreate: Moment) => void;
}

const MonthYearDay: React.FC<IProps> = ({
  date,
  isToday,
  isNext,
  isPrev,
  isWeekend,
  isCurrent,
  onClick,
}) => {
  const day = date.get("date");
  const datClassName = useMemo(() => {
    if (isToday) {
      return "todayDay";
    }
    if (isWeekend && isCurrent) {
      return "weekend";
    }
    if (isNext || isPrev) {
      return "disabled";
    }
    return "day";
  }, [isToday, isNext, isPrev, isWeekend, isCurrent]);

  const onClickWrapper = useCallback(() => onClick(date), [date, onClick]);

  return (
    <div onClick={onClickWrapper} className={"monthYearDayWrapper"}>
      <p className={datClassName}>{day}</p>
      {isToday && <div className={"todayDayContainer"} />}
    </div>
  );
};

export default React.memo(MonthYearDay);
