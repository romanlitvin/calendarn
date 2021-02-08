import { Moment } from "moment";

import { TCalendarEvent } from "../types";
import TimeUtils from "../utils/TimeUtils";
import { GoogleApi } from "./GoogleApi";
import config from "./index";

export class GoogleCalendar extends GoogleApi {
  private static readonly calendarEventsListConfig = {
    calendarId: config.CALENDAR_ID,
    timeMin: TimeUtils.now().toISOString(),
    showDeleted: true,
    singleEvents: true,
    maxResults: 10,
  };

  public static getUpcomingEvents = async (
    currentMonthDate: Moment,
  ): Promise<TCalendarEvent[]> => {
    try {
      if (!GoogleApi.isGoogleAPIConfigured) {
        console.error(
          "Too early expressions call, google services are not configured yet",
        );
        return [];
      }

      const month = currentMonthDate.get("month");
      const year = currentMonthDate.get("year");

      const [{ date: firstDateOfMonth }, ...rest] = TimeUtils.getMonthDays(
        month,
        year,
      );
      const { date: lastDateOfMonth } = rest[rest.length - 1];
      const configWithStartEndDates = {
        ...GoogleCalendar.calendarEventsListConfig,
        timeMin: firstDateOfMonth.toISOString(),
        timeMax: lastDateOfMonth.toISOString(),
      };

      const response = await gapi.client.calendar.events.list(
        configWithStartEndDates,
      );

      return response.result.items || [];
    } catch (err) {
      console.error("get upcoming events executed with error", err);
      return [];
    }
  };
}
