import TimeUtils from "./TimeUtils";

import { TCalendarEvent, TStringMap } from "../types";

export default (events: TCalendarEvent[]): TStringMap<TCalendarEvent> =>
  events.reduce<TStringMap<TCalendarEvent>>((acc, curr) => {
    if (curr.start && curr.start.date) {
      const date = TimeUtils.now(curr.start.date);
      const dateAsKey = `${date.get("month")}${date.get("date")}${date.get(
        "year",
      )}`;
      acc[dateAsKey] = curr;
    }
    return acc;
  }, {});
