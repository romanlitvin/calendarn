import React from "react";

import "./styles.scss";
import TimeUtils from "../../../../utils/TimeUtils";

const MonthYearWeekDays: React.FC = () => (
  <div className={"dayWeekContainer"}>
    {TimeUtils.getDayWeeksShort().map((dayWeek, index) => (
      <p key={`weekday${index}`} className={"dayWeek"}>
        {dayWeek}
      </p>
    ))}
  </div>
);

export default React.memo(MonthYearWeekDays);
