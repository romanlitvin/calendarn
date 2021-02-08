import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import moment, { Moment } from "moment";
import { useRouteMatch } from "react-router-dom";

import CalendarContext from "./calendarContext";

import TimeUtils from "../../utils/TimeUtils";
type All = moment.unitOfTime.All;

interface IProps {
  children: React.ReactChild | React.ReactChild[];
}

/*
 * 0 - Year
 * 1 - Month
 * 2 - Week
 * 3 - Day
 * */
export type TCalendarTypes = 0 | 1 | 2 | 3;

const setType: Record<number, All> = {
  0: "year",
  1: "month",
};

const CalendarProvider: React.FC<IProps> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<Moment>(TimeUtils.now);
  const [activeCalendarType, setActiveCalendarType] = useState<TCalendarTypes>(
    0,
  );
  const today = useRef<Moment>(TimeUtils.now()).current;
  const monthYearMatch = useRouteMatch("/calnedarn/monthYear");
  const singleMonthMatch = useRouteMatch("/calnedarn/singleMonth");

  useEffect(() => {
    if (activeCalendarType === 2 || activeCalendarType === 3) {
      alert("it's not supported yet (");
      return;
    }
  }, [activeCalendarType]);

  useEffect(() => {
    setActiveCalendarType(0);
  }, [monthYearMatch]);

  useEffect(() => {
    setActiveCalendarType(1);
  }, [singleMonthMatch]);

  const isToday = useCallback(
    (incomeDate: Moment): boolean => today.isSame(incomeDate, "day"),
    [today],
  );

  const setNextDate = useCallback(() => {
    setCurrentDate((prev) => {
      const copy = TimeUtils.now(prev);
      copy.set(
        setType[activeCalendarType],
        copy.get(setType[activeCalendarType]) + 1,
      );
      return copy;
    });
  }, [activeCalendarType]);

  const setPrevDate = useCallback(() => {
    setCurrentDate((prev) => {
      const copy = TimeUtils.now(prev);
      copy.set(
        setType[activeCalendarType],
        copy.get(setType[activeCalendarType]) - 1,
      );
      return copy;
    });
  }, [activeCalendarType]);

  const resetCalendar = useCallback(() => setCurrentDate(today), [today]);

  const providerValue = useMemo(
    () => ({
      currentDate,
      setPrevDate,
      setNextDate,
      resetCalendar,
      today,
      activeCalendarType,
      setCalendarType: setActiveCalendarType,
      isToday,
    }),
    [
      activeCalendarType,
      currentDate,
      isToday,
      resetCalendar,
      setNextDate,
      setPrevDate,
      today,
    ],
  );

  return (
    <CalendarContext.Provider value={providerValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export default React.memo(CalendarProvider);
