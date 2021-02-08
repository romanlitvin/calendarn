import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Moment } from "moment";

import GoogleEventsContext from "./googleEventsContext";

import { GoogleCalendar } from "../../config/GoogleCalendar";
import { useCalendar } from "../Calendar/calendarContext";
import debounce from "../../utils/debounce";
import groupGAPIEvents from "../../utils/groupGAPIEvents";

import { TCalendarEvent } from "../../types";

interface IProps {
  children: React.ReactChild | React.ReactChild[];
}

const GoogleEventsProvider: React.FC<IProps> = ({ children }) => {
  const [events, setEvents] = useState<TCalendarEvent[]>([]);
  const { currentDate } = useCalendar();

  const getUpcomingEvents = async (incomeDate: Moment) => {
    const googleCalendarEvents = await GoogleCalendar.getUpcomingEvents(
      incomeDate,
    );
    setEvents(googleCalendarEvents);
  };

  const getUpcomingEventsDobounced = useRef(debounce(getUpcomingEvents, 200))
    .current;

  useEffect(() => {
    getUpcomingEventsDobounced(currentDate);
  }, [currentDate, getUpcomingEventsDobounced]);

  const parsedGoogleEvents = useMemo(() => groupGAPIEvents(events), [events]);

  const findGoogleEventByDate = useCallback(
    (inputDate: Moment) => {
      const dateAsKey = `${inputDate.get("month")}${inputDate.get(
        "date",
      )}${inputDate.get("year")}`;
      return parsedGoogleEvents[dateAsKey];
    },
    [parsedGoogleEvents],
  );

  const providerValue = useMemo(
    () => ({
      events,
      parsedEvents: parsedGoogleEvents,
      findGoogleEventByDate,
    }),
    [events, findGoogleEventByDate, parsedGoogleEvents],
  );

  return (
    <GoogleEventsContext.Provider value={providerValue}>
      {children}
    </GoogleEventsContext.Provider>
  );
};

export default React.memo(GoogleEventsProvider);
