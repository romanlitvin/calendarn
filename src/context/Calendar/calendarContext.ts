import { createContext, useContext } from "react";
import { Moment } from "moment";

import TimeUtils from "../../utils/TimeUtils";
import { TCalendarTypes } from "./CalendarProvider";

export interface ICalendarContextProps {
  resetCalendar: () => void;
  currentDate: Moment;
  setNextDate: () => void;
  setPrevDate: () => void;
  today: Moment;
  activeCalendarType: TCalendarTypes;
  setCalendarType: (calendarType: TCalendarTypes) => void;
  isToday: (incomeDate: Moment) => boolean;
}

const calendarContext = createContext<ICalendarContextProps>({
  resetCalendar: () => {},
  currentDate: TimeUtils.now(),
  setNextDate: () => {},
  setPrevDate: () => {},
  today: TimeUtils.now(),
  activeCalendarType: 0,
  setCalendarType: () => {},
  isToday: () => true,
});

export default calendarContext;

export const useCalendar = () =>
  useContext<ICalendarContextProps>(calendarContext);
