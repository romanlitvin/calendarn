import { createContext, useContext } from "react";
import { Moment } from "moment";

import { TCalendarEvent, TStringMap } from "../../types";

export interface IGoogleEventsContextProps {
  events: TCalendarEvent[];
  parsedEvents: TStringMap<TCalendarEvent>;
  findGoogleEventByDate: (inputDate: Moment) => TCalendarEvent | null;
}

const googleEventsContext = createContext<IGoogleEventsContextProps>({
  events: [],
  parsedEvents: {},
  findGoogleEventByDate: () => null,
});

export default googleEventsContext;

export const useGoogleEvents = (): IGoogleEventsContextProps =>
  useContext<IGoogleEventsContextProps>(googleEventsContext);
